import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";
import { useDirectoryContext } from "~/features/Directory/Directory.context";

export type CanvasLayoutMainPropsNative = JSX.IntrinsicElements["div"];
export type CanvasLayoutMainProps = CanvasLayoutMainPropsNative;

const styles = css`
  grid-area: canvas-main;
  overflow: hidden;
  height: 100%;
`;

export const CanvasLayoutMain = forwardRef<
  HTMLDivElement,
  CanvasLayoutMainProps
>(function CanvasLayoutMain({ children, className, ...restProps }, ref) {
  const { globalOptions } = useDirectoryContext();
  return (
    <div
      {...restProps}
      className={clsx(styles, className)}
      ref={ref}
      style={{
        backgroundColor: globalOptions.CANVAS_BACKGROUND_COLOR,
      }}
    >
      {children}
    </div>
  );
});
