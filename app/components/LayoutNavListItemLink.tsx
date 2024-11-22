import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutNavListItemLinkPropsNative = JSX.IntrinsicElements["a"];
export type LayoutNavListItemLinkProps = LayoutNavListItemLinkPropsNative;

export const LayoutNavListItemLink = forwardRef<
  HTMLAnchorElement,
  LayoutNavListItemLinkProps
>(function LayoutNavListItemLink({ children, className, ...restProps }, ref) {
  return (
    <a {...restProps} className={clsx(className)} ref={ref}>
      {children}
    </a>
  );
});
