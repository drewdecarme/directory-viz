import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutTopNavPropsNative = JSX.IntrinsicElements["nav"];
export type LayoutTopNavProps = LayoutTopNavPropsNative;

const styles = css`
  grid-area: top-nav;
  padding: 0 2rem;
`;

const imgStyles = css`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 1rem;

  img {
    height: 50%;
    width: auto;
  }

  div {
    font-size: 28px;
    font-weight: 200;
  }
`;

export const LayoutTopNav = forwardRef<HTMLElement, LayoutTopNavProps>(
  function LayoutTopNav({ children, className, ...restProps }, ref) {
    return (
      <nav {...restProps} className={clsx(styles, className)} ref={ref}>
        <div className={imgStyles}>
          <img src="/directory-viz-logo-5-transparent.png" alt="logo" />
          <div>Directory Viz</div>
        </div>
        {children}
      </nav>
    );
  }
);
