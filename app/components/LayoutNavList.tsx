import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutNavListPropsNative = JSX.IntrinsicElements["ul"];
// export type LayoutNavListPropsCustom = {};
export type LayoutNavListProps = LayoutNavListPropsNative;

export const LayoutNavList = forwardRef<HTMLUListElement, LayoutNavListProps>(
  function LayoutNavList({ children, className, ...restProps }, ref) {
    return (
      <ul {...restProps} className={clsx(className)} ref={ref}>
        {children}
      </ul>
    );
  }
);
