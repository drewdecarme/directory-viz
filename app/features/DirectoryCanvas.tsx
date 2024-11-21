import { css } from "@linaria/core";
import {
  type RefCallback,
  type WheelEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type DirectoryGraph,
  type DirectoryGraphNode,
  useDirectoryContext,
} from "./Directory.context";

type SceneNode = {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children: SceneNode[];
};

type SceneGraph = SceneNode[];

// Constants for node dimensions
const NODE_WIDTH = 150;
const NODE_HEIGHT = 30;
const HORIZONTAL_INDENT = 20; // Indentation per depth
const VERTICAL_SPACING = 10; // Spacing between nodes

function translateToSceneGraph(
  graph: DirectoryGraph,
  canvasWidth: number,
  canvasHeight: number,
  depth = 0
): { sceneGraph: SceneGraph; totalWidth: number; totalHeight: number } {
  let currentY = 0;
  let maxDepth = 0;

  const traverse = (node: DirectoryGraphNode, depth: number): SceneNode => {
    maxDepth = Math.max(maxDepth, depth);

    const sceneNode: SceneNode = {
      id: node.id,
      text: node.text,
      x: depth * HORIZONTAL_INDENT,
      y: currentY,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      children: [],
    };

    currentY += NODE_HEIGHT + VERTICAL_SPACING;

    sceneNode.children = Object.values(node.childNodes).map((child) =>
      traverse(child, depth + 1)
    );

    return sceneNode;
  };

  const sceneGraph = Object.values(graph).map((node) => traverse(node, depth));
  const totalWidth = maxDepth * HORIZONTAL_INDENT + NODE_WIDTH;
  const totalHeight = currentY;

  // Calculate the offsets to center the graph
  const xOffset = (canvasWidth - totalWidth) / 2;
  const yOffset = (canvasHeight - totalHeight) / 2;

  // Apply offsets to all nodes
  const applyOffsets = (node: SceneNode) => {
    node.x += xOffset;
    node.y += yOffset;
    node.children.forEach(applyOffsets);
  };

  sceneGraph.forEach(applyOffsets);

  return { sceneGraph, totalWidth, totalHeight };
}

// Render the scene graph
function renderSceneGraph(
  ctx: CanvasRenderingContext2D,
  sceneGraph: SceneGraph
): void {
  const drawNode = (node: SceneNode): void => {
    // Draw the node box
    ctx.fillStyle = "#fff";
    ctx.fillRect(node.x, node.y, node.width, node.height);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(node.x, node.y, node.width, node.height);

    // Draw the node text
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(node.text, node.x + 10, node.y + 20);

    // Recursively draw child nodes
    node.children.forEach(drawNode);
  };

  sceneGraph.forEach(drawNode);
}

const canvasStyles = css`
  height: 100%;
  width: 100%;
`;

export function DirectoryCanvas() {
  const { graph } = useDirectoryContext();
  const [containerDim, setContainerDim] = useState<
    { height: number; width: number } | undefined
  >(undefined);
  const [scale, setScale] = useState(1); // Zoom scale
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const containerRefCallback = useCallback<RefCallback<HTMLDivElement>>(
    (node) => {
      if (!node) return;
      containerRef.current = node;
      setContainerDim({
        height: node.offsetHeight,
        width: node.offsetWidth,
      });
    },
    []
  );

  // handle the window resize
  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;
      console.log("resizing...");
      setContainerDim({
        height: containerRef.current.offsetHeight,
        width: containerRef.current.offsetWidth,
      });
    }

    console.log("Adding event listeners...");
    window.addEventListener("resize", handleResize);

    return () => {
      console.log("Removing event listeners...");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !containerDim) return;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get canvas dimensions
    const canvasWidth = containerRef.current.offsetWidth;
    const canvasHeight = containerRef.current.offsetHeight;

    // Translate the graph to a centered scene graph
    const { sceneGraph } = translateToSceneGraph(
      graph,
      containerDim.width,
      containerDim.height
    );

    // Clear the canvas and render the scene graph
    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.scale(scale, scale);

    renderSceneGraph(ctx, sceneGraph);

    ctx.restore();
  }, [containerDim, graph, scale]);

  const handleWheel = useCallback<WheelEventHandler<HTMLCanvasElement>>((e) => {
    // command on mac
    if (e.metaKey) {
      console.log("scrolling");
      const zoomFactor = 1.1;
      setScale((prevScale) =>
        e.deltaY > 0 ? prevScale / zoomFactor : prevScale * zoomFactor
      );
    }
  }, []);

  return (
    <div className={canvasStyles} ref={containerRefCallback}>
      {containerDim && (
        <canvas ref={canvasRef} {...containerDim} onWheel={handleWheel} />
      )}
    </div>
  );
}
