import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type CanvasLayoutPaneLeftPropsNative = JSX.IntrinsicElements["article"];
export type CanvasLayoutPaneLeftProps = CanvasLayoutPaneLeftPropsNative;

const styles = css`
  grid-area: canvas-pane-left;
  width: 300px;
  display: grid;
  grid-template-rows: auto 1fr;
  border-right: 1px solid var(--border-color);
`;

export const CanvasLayoutPaneLeft = forwardRef<
  HTMLDivElement,
  CanvasLayoutPaneLeftProps
>(function CanvasLayoutPaneLeft({ children, className, ...restProps }, ref) {
  return (
    <article {...restProps} className={clsx(styles, className)} ref={ref}>
      {children}
    </article>
  );
});
