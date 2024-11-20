import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutSideNavPropsNative = JSX.IntrinsicElements["div"];
export type LayoutSideNavProps = LayoutSideNavPropsNative;

const styles = css`
  grid-area: side-nav;
  width: 300px;
`;

export const LayoutSideNav = forwardRef<HTMLDivElement, LayoutSideNavProps>(
  function LayoutSideNav({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={clsx(styles, className)} ref={ref}>
        {children}
      </div>
    );
  }
);
