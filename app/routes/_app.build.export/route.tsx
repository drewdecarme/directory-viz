import { css } from "@linaria/core";
import { useCallback, useRef, useState } from "react";
import { PaneSection } from "~/components/PaneSection";
import { PaneSectionRow } from "~/components/PaneSection/PaneSectionRow";
import { InputCheckbox } from "~/components/inputs/InputCheckbox";
import { InputNumber } from "~/components/inputs/InputNumber";
import { InputSelect } from "~/components/inputs/InputSelect";
import { useDirectoryContext } from "../../features/Directory/Directory.context";

function getCanvasContentArea(
  context: CanvasRenderingContext2D,
  {
    height,
    width,
    padding = 0,
  }: { height: number; width: number; padding: number }
) {
  // Ensure padding is applied only within valid canvas bounds
  const startX = Math.max(0, padding);
  const startY = Math.max(0, padding);
  const adjustedWidth = Math.min(width - padding * 2, width);
  const adjustedHeight = Math.min(height - padding * 2, height);

  // Get image data within the padded area
  const imageData = context.getImageData(
    startX,
    startY,
    adjustedWidth,
    adjustedHeight
  );
  const pixels = imageData.data;

  let minX = adjustedWidth;
  let minY = adjustedHeight;
  let maxX = 0;
  let maxY = 0;

  // Loop through pixel data to find the non-transparent area
  for (let y = 0; y < adjustedHeight; y++) {
    for (let x = 0; x < adjustedWidth; x++) {
      const index = (y * adjustedWidth + x) * 4; // Index for the current pixel
      const alpha = pixels[index + 3]; // Alpha channel value

      if (alpha > 0) {
        // Non-transparent pixel found
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  // If no content is found, return an empty area
  if (minX > maxX || minY > maxY) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  // Expand the bounding box by the padding
  return {
    x: Math.max(0, minX + startX - padding),
    y: Math.max(0, minY + startY - padding),
    width: Math.min(adjustedWidth, maxX - minX + 1 + 2 * padding),
    height: Math.min(adjustedHeight, maxY - minY + 1 + 2 * padding),
  };
}

const previewCanvasStyles = css`
  width: 100%;
  height: 400px;
  border: 1px solid var(--color-neutral);
`;

export default function Export() {
  const {
    canvasRef,
    globalOptions: { CANVAS_BACKGROUND_COLOR },
  } = useDirectoryContext();
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const [showBackground, setShowBackground] = useState(false);
  const [padding, setPadding] = useState(50);
  const [exportScale, setExportScale] = useState(1);

  const createPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!canvas || !previewCanvas) return;

    // Get the contexts
    const ctx = canvas.getContext("2d");
    const previewCtx = previewCanvas.getContext("2d");
    if (!ctx || !previewCtx) return;

    const { width, height } = canvas;
    const contentArea = getCanvasContentArea(ctx, { height, width, padding });

    const cWidth = contentArea.width;
    const cHeight = contentArea.height;

    const maxWidth = previewCanvas.clientWidth;
    const maxHeight = previewCanvas.clientHeight;

    // Calculate aspect ratio
    const aspectRatio = cWidth / cHeight;

    // Determine the scaled dimensions while preserving the aspect ratio
    let dWidth = maxWidth;
    let dHeight = maxWidth / aspectRatio;

    // Adjust if the height exceeds the maxHeight
    if (dHeight > maxHeight) {
      dHeight = maxHeight;
      dWidth = maxHeight * aspectRatio;
    }

    // Handle device pixel ratio for sharp rendering
    const dpr = 3;

    // Set the internal resolution of the preview canvas
    previewCanvas.width = maxWidth * dpr;
    previewCanvas.height = maxHeight * dpr;

    // Scale the context for high DPI
    previewCtx.scale(dpr, dpr);

    // Calculate offsets for centering
    const offsetX = (maxWidth - dWidth) / 2;
    const offsetY = (maxHeight - dHeight) / 2;

    // Clear the canvas before drawing
    previewCtx.clearRect(0, 0, maxWidth, maxHeight);

    // Draw the background if enabled
    if (showBackground) {
      previewCtx.fillStyle = CANVAS_BACKGROUND_COLOR;
      previewCtx.fillRect(0, 0, maxWidth, maxHeight);
    }

    // Draw the content area of the main canvas onto the preview canvas
    previewCtx.drawImage(
      canvas,
      contentArea.x,
      contentArea.y,
      contentArea.width,
      contentArea.height,
      offsetX,
      offsetY,
      dWidth,
      dHeight
    );
  }, [CANVAS_BACKGROUND_COLOR, canvasRef, padding, showBackground]);

  const download = useCallback(() => {
    if (!previewCanvasRef.current || !anchorRef.current) return;

    // Create an offscreen canvas
    const exportCanvas = document.createElement("canvas");
    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return;

    const scale = exportScale * window.devicePixelRatio || 1;

    // Set the scaled canvas size
    exportCanvas.width = previewCanvasRef.current.width * scale;
    exportCanvas.height = previewCanvasRef.current.height * scale;

    // Scale the context and draw the original canvas onto it
    exportCtx.scale(scale, scale);
    exportCtx.drawImage(previewCanvasRef.current, 0, 0);

    console.log(exportCtx);

    const dataURL = exportCanvas.toDataURL("image/png");
    anchorRef.current.href = dataURL;
    anchorRef.current.download = `directory-viz-export-${exportScale}x.png`;
    anchorRef.current.click();
  }, [exportScale]);

  return (
    <div>
      <PaneSection dxTitle="Configure">
        <PaneSectionRow style={{ fontSize: 10 }}>
          Use the controls below to configure the desired export for the
          directory diagram. Click the generate button to re-generate the image.
        </PaneSectionRow>
        <PaneSectionRow>
          <InputCheckbox
            dxLabel="Include background"
            dxSize="sm"
            onClick={({ currentTarget: { checked } }) =>
              setShowBackground(checked)
            }
          />
        </PaneSectionRow>
        <PaneSectionRow>
          <InputSelect
            dxLabel="Resolution Scale"
            dxHelp="Choose export resolution: Standard (1x), Retina (2x), Ultra HD (3x)"
            dxSize="sm"
            value={exportScale}
            onChange={({ currentTarget: { value } }) =>
              setExportScale(Number(value))
            }
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </InputSelect>
        </PaneSectionRow>
        <PaneSectionRow>
          <InputNumber
            dxLabel="Background Padding"
            dxHelp="Add uniform space around the preview that includes the background."
            value={padding}
            min={0}
            max={100}
            onChange={({ currentTarget: { value } }) =>
              setPadding(Number(value))
            }
            dxSize="sm"
          />
        </PaneSectionRow>
        <PaneSectionRow>
          <button onClick={createPreview} type="button">
            Generate Preview
          </button>
          <button onClick={download} type="button">
            Export
          </button>
          <a ref={anchorRef} style={{ display: "none" }} href="/">
            Download Image
          </a>
        </PaneSectionRow>
      </PaneSection>

      <PaneSection dxTitle="Preview">
        <PaneSectionRow>
          <canvas ref={previewCanvasRef} className={previewCanvasStyles} />
        </PaneSectionRow>
      </PaneSection>
    </div>
  );
}
