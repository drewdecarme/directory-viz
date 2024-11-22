import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type CanvasLayoutPaneRightPropsNative = JSX.IntrinsicElements["div"];
export type CanvasLayoutPaneRightProps = CanvasLayoutPaneRightPropsNative;

const styles = css`
  grid-area: canvas-pane-right;
  font-family: var(--font-family);
  width: 300px;
  border-left: 1px solid var(--border-color);
`;

export const CanvasLayoutPaneRight = forwardRef<
  HTMLDivElement,
  CanvasLayoutPaneRightProps
>(function CanvasLayoutPaneRight({ children, className, ...restProps }, ref) {
  return (
    <article {...restProps} className={clsx(styles, className)} ref={ref}>
      {children}
    </article>
  );
});
