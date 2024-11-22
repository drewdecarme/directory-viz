import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

const contentStyles = css`
  height: 100%;
  width: 100%;
`;

export type LayoutContentPropsNative = JSX.IntrinsicElements["main"];
export type LayoutContentProps = LayoutContentPropsNative;

export const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(
  function LayoutContent({ children, className, ...restProps }, ref) {
    return (
      <main {...restProps} className={clsx(contentStyles, className)} ref={ref}>
        {children}
      </main>
    );
  }
);
