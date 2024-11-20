import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutTopNavPropsNative = JSX.IntrinsicElements["nav"];
export type LayoutTopNavProps = LayoutTopNavPropsNative;

const styles = css`
  grid-area: top-nav;
`;

export const LayoutTopNav = forwardRef<HTMLElement, LayoutTopNavProps>(
  function LayoutTopNav({ children, className, ...restProps }, ref) {
    return (
      <nav {...restProps} className={clsx(styles, className)} ref={ref}>
        {children}
      </nav>
    );
  }
);
