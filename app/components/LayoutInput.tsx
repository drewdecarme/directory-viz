import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutInputPropsNative = JSX.IntrinsicElements["div"];
export type LayoutInputProps = LayoutInputPropsNative;

const styles = css`
  grid-area: input;
`;

export const LayoutInput = forwardRef<HTMLDivElement, LayoutInputProps>(
  function LayoutInput({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={clsx(styles, className)} ref={ref}>
        {children}
      </div>
    );
  }
);
