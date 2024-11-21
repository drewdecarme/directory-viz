import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutOutputPropsNative = JSX.IntrinsicElements["div"];
export type LayoutOutputProps = LayoutOutputPropsNative;

const styles = css`
  grid-area: output;
  overflow: hidden;
  height: 100%;
  background: #fafafa;
`;

export const LayoutOutput = forwardRef<HTMLDivElement, LayoutOutputProps>(
  function LayoutOutput({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={clsx(styles, className)} ref={ref}>
        {children}
      </div>
    );
  }
);
