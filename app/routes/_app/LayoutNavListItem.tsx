import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutNavListItemPropsNative = JSX.IntrinsicElements["li"];
export type LayoutNavListItemProps = LayoutNavListItemPropsNative;

export const LayoutNavListItem = forwardRef<
  HTMLLIElement,
  LayoutNavListItemProps
>(function LayoutNavListItem({ children, className, ...restProps }, ref) {
  return (
    <li {...restProps} className={clsx(className)} ref={ref}>
      {children}
    </li>
  );
});
