import { useCallback, useRef } from "react";
import { useDirectoryContext } from "../_app.build/Directory.context";

function getCanvasContentArea(
  context: CanvasRenderingContext2D,
  { height, width }: { height: number; width: number }
) {
  const imageData = context.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  // Loop through pixel data
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4; // Index for the current pixel
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

  // Return the bounding box
  if (minX > maxX || minY > maxY) {
    // No content found
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

export default function Export() {
  const { canvasRef } = useDirectoryContext();
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const createPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!canvas || !previewCanvas) return;

    // get the context
    const ctx = canvas.getContext("2d");
    const previewCtx = previewCanvas.getContext("2d");
    if (!ctx || !previewCtx) return;

    const { width, height } = canvas;
    const contentArea = getCanvasContentArea(ctx, { height, width });
    console.log({ contentArea });

    // Draw the snippet on the preview canvas
    previewCanvas.width = width;
    previewCanvas.height = height;
    previewCtx.drawImage(
      canvas,
      contentArea.x,
      contentArea.y,
      contentArea.width,
      contentArea.height,
      0,
      0,
      contentArea.width,
      contentArea.height
    );
  }, [canvasRef]);

  return (
    <div>
      <div>export</div>
      <button onClick={createPreview} type="button">
        View Preview
      </button>
      <canvas ref={previewCanvasRef} />
    </div>
  );
}
