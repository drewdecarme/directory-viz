import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutNavPropsNative = JSX.IntrinsicElements["nav"];
export type LayoutNavProps = LayoutNavPropsNative;

const styles = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem 0;
  width: 80px;
  border-right: 1px solid var(--border-color);
`;

export const LayoutNav = forwardRef<HTMLElement, LayoutNavProps>(
  function LayoutNav({ children, className, ...restProps }, ref) {
    return (
      <nav {...restProps} className={clsx(styles, className)} ref={ref}>
        {children}
      </nav>
    );
  }
);
