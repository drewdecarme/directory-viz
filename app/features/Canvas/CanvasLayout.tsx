import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type CanvasLayoutPropsNative = JSX.IntrinsicElements["div"];
export type CanvasLayoutProps = CanvasLayoutPropsNative;

const styles = css`
  display: grid;
  grid-template-areas: "canvas-pane-left canvas-main canvas-pane-right";
  grid-template-columns: 300px auto 300px;
  height: 100%;
`;

export const CanvasLayout = forwardRef<HTMLDivElement, CanvasLayoutProps>(
  function CanvasLayout({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={clsx(styles, className)} ref={ref}>
        {children}
      </div>
    );
  }
);
