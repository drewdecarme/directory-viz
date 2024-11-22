import { clsx } from "clsx";
import { forwardRef } from "react";

export type TabListItemPropsNative = JSX.IntrinsicElements["li"];
export type TabListItemProps = TabListItemPropsNative;

export const TabListItem = forwardRef<HTMLLIElement, TabListItemProps>(
  function TabListItem({ children, className, ...restProps }, ref) {
    return (
      <li {...restProps} className={clsx(className)} ref={ref}>
        {children}
      </li>
    );
  }
);
