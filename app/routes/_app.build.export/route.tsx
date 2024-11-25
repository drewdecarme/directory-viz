import { css } from "@linaria/core";
import { useCallback, useRef, useState } from "react";
import { PaneSection } from "~/components/PaneSection";
import { PaneSectionRow } from "~/components/PaneSection/PaneSectionRow";
import { InputCheckbox } from "~/components/inputs/InputCheckbox";
import { InputNumber } from "~/components/inputs/InputNumber";
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
`;

export default function Export() {
  const {
    canvasRef,
    globalOptions: { CANVAS_BACKGROUND_COLOR },
  } = useDirectoryContext();
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showBackground, setShowBackground] = useState(false);
  const [padding, setPadding] = useState(0);

  const createPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!canvas || !previewCanvas) return;

    // get the context
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

    // Calculate offsets for centering
    const offsetX = (maxWidth - dWidth) / 2;
    const offsetY = (maxHeight - dHeight) / 2;

    // Clear the canvas before drawing
    previewCtx.clearRect(0, 0, maxWidth, maxHeight);

    // Draw the snippet on the preview canvas
    previewCanvas.width = maxWidth;
    previewCanvas.height = maxHeight;

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
  }, [canvasRef, padding]);

  return (
    <div>
      <PaneSection dxTitle="Configure">
        <PaneSectionRow style={{ fontSize: 10 }}>
          Use the controls below to configure the desired export for the
          directory diagram. Click the generate button to re-generate the image.
        </PaneSectionRow>
        <PaneSectionRow>
          <InputCheckbox
            dxLabel="Show background"
            dxSize="sm"
            onClick={({ currentTarget: { checked } }) =>
              setShowBackground(checked)
            }
          />
        </PaneSectionRow>
        {showBackground && (
          <PaneSectionRow>
            <InputNumber
              dxLabel="Padding"
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
        )}
        <PaneSectionRow>
          <button onClick={createPreview} type="button">
            Generate
          </button>
        </PaneSectionRow>
        <PaneSectionRow>
          <canvas
            ref={previewCanvasRef}
            className={previewCanvasStyles}
            style={
              showBackground
                ? { background: CANVAS_BACKGROUND_COLOR }
                : undefined
            }
          />
        </PaneSectionRow>
      </PaneSection>
    </div>
  );
}
