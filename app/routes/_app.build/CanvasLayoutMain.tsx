import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type CanvasLayoutMainPropsNative = JSX.IntrinsicElements["div"];
export type CanvasLayoutMainProps = CanvasLayoutMainPropsNative;

const styles = css`
  grid-area: canvas-main;
  overflow: hidden;
  height: 100%;
  background: #fafafa;
`;

export const CanvasLayoutMain = forwardRef<
  HTMLDivElement,
  CanvasLayoutMainProps
>(function CanvasLayoutMain({ children, className, ...restProps }, ref) {
  return (
    <div {...restProps} className={clsx(styles, className)} ref={ref}>
      {children}
    </div>
  );
});
