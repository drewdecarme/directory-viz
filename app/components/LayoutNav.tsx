import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutNavPropsNative = JSX.IntrinsicElements["nav"];
export type LayoutNavProps = LayoutNavPropsNative;

const styles = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  width: 80px;
  border-right: 1px solid var(--border-color);
`;

const imgStyles = css`
  padding: 0.25rem;
  display: flex;
  justify-content: center;

  img {
    width: 50%;
  }

  div {
    font-size: 28px;
    font-weight: 200;
  }
`;

export const LayoutNav = forwardRef<HTMLElement, LayoutNavProps>(
  function LayoutNav({ children, className, ...restProps }, ref) {
    return (
      <nav {...restProps} className={clsx(styles, className)} ref={ref}>
        <div className={imgStyles}>
          <img src="/directory-viz-logo-5-transparent.png" alt="logo" />
        </div>
        {children}
      </nav>
    );
  }
);
