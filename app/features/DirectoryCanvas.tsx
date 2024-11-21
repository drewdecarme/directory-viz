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
import { type IconMap, type IconNames, useIcons } from "./useIcons";

type SceneManifestEntryShared = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  meta: {
    isLastNode: boolean;
  };
};

export type SceneManifestEntryNode = SceneManifestEntryShared & {
  type: "node";
  text: string;
  xText: number;
  yText: number;
  xIcon: number;
  yIcon: number;
  children: SceneManifestEntryNode[];
  meta: SceneManifestEntryShared["meta"] & {
    iconType: IconNames;
  };
};
type SceneManifestEntryBoundary = SceneManifestEntryShared & {
  type: "boundary";
};

type SceneManifestEntry = SceneManifestEntryNode | SceneManifestEntryBoundary;

type SceneManifest = SceneManifestEntry[];

// Constants for node dimensions
const NODE_PADDING_TOP = 20;
const NODE_PADDING_BOTTOM = 20;
const NODE_PADDING_LEFT = 20;
const NODE_TEXT_PADDING_LEFT = 10;
const NODE_FONT_SIZE = 16;
const NODE_NESTED_INDENT = 30; // Indentation per depth
const NODE_FONT_FAMILY = "Inter, sans-serif";
const NODE_ICON_DIMENSION = 16;

const BOX_PADDING_TOP = 0;
const BOX_PADDING_RIGHT = 0;
const BOX_PADDING_BOTTOM = 0;
const BOX_PADDING_LEFT = 0;
const BOX_RADIUS = 10;
const BOX_WIDTH = 300;

function translateToSceneManifest(
  graph: DirectoryGraph,
  canvasWidth: number,
  canvasHeight: number,
  depth = 0
): { sceneManifest: SceneManifest; totalWidth: number; totalHeight: number } {
  let currentY = 0;
  let maxDepth = 0;
  const sceneManifest: SceneManifest = [];

  // get all of the nodes
  const traverseSceneManifestEntryNodes = (
    node: DirectoryGraphNode,
    depth: number
  ): SceneManifestEntryNode => {
    maxDepth = Math.max(maxDepth, depth);

    const nodeXIndent = depth * NODE_NESTED_INDENT;
    const nodeXIcon = NODE_PADDING_LEFT + nodeXIndent; // the indentation of the line it's on
    const nodeXText =
      nodeXIcon + // the amount of padding it should be away from that indent
      NODE_ICON_DIMENSION + // the width of the icon
      NODE_TEXT_PADDING_LEFT; // the amount of space between the icon and the text;

    console.log({ nodeXIndent, nodeXIcon, nodeXText });

    const nodeWith = BOX_WIDTH - nodeXIndent;

    const nodeHeight = NODE_PADDING_BOTTOM + NODE_FONT_SIZE + NODE_PADDING_TOP;
    const nodeYText = currentY + nodeHeight / 2;
    const nodeYIcon = nodeYText - NODE_ICON_DIMENSION / 2;
    const nodeChildrenValues = Object.values(node.childNodes);

    function getIconType(): IconNames {
      if (nodeChildrenValues.length === 0) {
        return "file";
      }
      return "folder";
    }

    const entry: SceneManifestEntryNode = {
      type: "node",
      id: node.id,
      text: node.text,
      x: nodeXIndent,
      y: currentY,
      xText: nodeXText,
      yText: nodeYText,
      xIcon: nodeXIcon,
      yIcon: nodeYIcon,
      width: nodeWith,
      height: nodeHeight,
      meta: {
        isLastNode: false,
        iconType: getIconType(),
      },
      children: [],
    };

    // Update where the next node should be located
    currentY += nodeHeight;

    // Add children to the entry. This should be done after the currentY
    // is set since the recursive function set's the variable that's hoisted
    // out of the scope of this fn.
    entry.children = nodeChildrenValues.map((child) =>
      traverseSceneManifestEntryNodes(child, depth + 1)
    );

    return entry;
  };

  for (const sceneEntryNode of Object.values(graph)) {
    sceneManifest.push(traverseSceneManifestEntryNodes(sceneEntryNode, depth));
  }

  const totalWidth = BOX_WIDTH;
  const totalHeight = currentY;

  // Calculate the offsets to center the graph

  // add the bounded box to the first part of the manifest to be drawn first
  const firstEntryNode = sceneManifest.find((entry) => entry.type === "node");
  if (!firstEntryNode) {
    throw "Cannot find the start manifest entry node.";
  }
  sceneManifest.unshift({
    type: "boundary",
    id: "bounded-box",
    x: firstEntryNode.x - BOX_PADDING_LEFT,
    width: totalWidth + BOX_PADDING_LEFT + BOX_PADDING_RIGHT,
    y: firstEntryNode.y - BOX_PADDING_TOP,
    height: totalHeight + BOX_PADDING_TOP * BOX_PADDING_BOTTOM,
    meta: {
      isLastNode: false,
    },
  });

  // Apply offsets to all nodes
  const xOffset = (canvasWidth - totalWidth) / 2;
  const yOffset = (canvasHeight - totalHeight) / 2;
  const applyOffsets = (node: SceneManifestEntry) => {
    node.x += xOffset;
    node.y += yOffset;
    if (node.type === "node") {
      node.xText += xOffset;
      node.yText += yOffset;
      node.xIcon += xOffset;
      node.yIcon += yOffset;
      node.children.forEach(applyOffsets);
    }
  };
  sceneManifest.forEach(applyOffsets);

  // Apply meta
  const applyMeta = (node: SceneManifestEntry, isParentLastEntry: boolean) => {
    if (node.type === "node" && node.children.length !== 0) {
      node.children.forEach((entry, i, origArr) => {
        const isLastEntry = i === origArr.length - 1;
        applyMeta(entry, isParentLastEntry && isLastEntry);
      });
    } else {
      node.meta.isLastNode = isParentLastEntry;
    }
  };

  sceneManifest.forEach((entry, i, origArr) => {
    const isLastEntry = i === origArr.length - 1;
    applyMeta(entry, isLastEntry);
  });

  return { sceneManifest, totalWidth, totalHeight };
}

// Render the scene graph
function renderSceneManifest(
  ctx: CanvasRenderingContext2D,
  sceneManifest: SceneManifest,
  options: {
    totalHeight: number;
    totalWidth: number;
    iconMap: IconMap;
  }
): void {
  let boundaryX = 0;

  // let largestX2 = 0;
  const drawNode = (node: SceneManifestEntry): void => {
    switch (node.type) {
      case "boundary":
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#919191";
        ctx.shadowBlur = 10;
        boundaryX = node.x;
        ctx.roundRect(node.x, node.y, node.width, node.height, BOX_RADIUS);
        ctx.fill();

        // Reset shadow properties to prevent them from affecting the stroke
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // Write the stroke of the path
        ctx.strokeStyle = "#c3c3c3";
        ctx.stroke();
        break;

      case "node": {
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.font = `${NODE_FONT_SIZE}px ${NODE_FONT_FAMILY}`;
        ctx.textBaseline = "middle";
        ctx.fillText(node.text, node.xText, node.yText);

        // Draw the SVG
        const icon = options.iconMap.get(node.meta.iconType);
        if (!icon) {
          console.log("no icon available.");
          return;
        }
        console.log(node.xIcon, node.yIcon);
        ctx.drawImage(
          icon?.img,
          node.xIcon,
          node.yIcon,
          NODE_ICON_DIMENSION,
          NODE_ICON_DIMENSION
        );

        // Create the horizontal lines
        if (!node.meta.isLastNode) {
          ctx.beginPath();
          ctx.moveTo(boundaryX, node.y + node.height); // Start at the bottom-left corner of the rectangle
          ctx.lineTo(boundaryX + options.totalWidth, node.y + node.height); // Draw a line to the bottom-right corner
          ctx.strokeStyle = "#cbcbcb40";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Recursively draw child nodes
        node.children.forEach(drawNode);
        break;
      }

      default:
        break;
    }
  };

  console.log({ sceneManifest });

  sceneManifest.forEach(drawNode);
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
  const { getIcons } = useIcons();

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
    if (
      !canvasRef.current ||
      !containerRef.current ||
      !containerDim ||
      Object.keys(graph).length === 0
    ) {
      return;
    }

    async function renderDirectory() {
      if (!canvasRef.current || !containerDim) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const iconMap = await getIcons();

      // Translate the graph to a centered scene graph
      const { sceneManifest, totalHeight, totalWidth } =
        translateToSceneManifest(
          graph,
          containerDim.width,
          containerDim.height
        );

      // Clear the canvas and render the scene graph
      ctx.save();
      ctx.clearRect(0, 0, totalWidth, totalHeight);

      ctx.scale(scale, scale);

      renderSceneManifest(ctx, sceneManifest, {
        totalHeight,
        totalWidth,
        iconMap,
      });

      ctx.restore();
    }

    renderDirectory();
  }, [containerDim, getIcons, graph, scale]);

  const handleWheel = useCallback<WheelEventHandler<HTMLCanvasElement>>((e) => {
    // command on mac
    if (e.metaKey) {
      console.log("scrolling");
      const zoomFactor = 1.05;
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
