import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutTopNavPropsNative = JSX.IntrinsicElements["nav"];
export type LayoutTopNavProps = LayoutTopNavPropsNative;

const styles = css`
  grid-area: top-nav;
`;

const imgStyles = css`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 1rem;

  img {
    height: 80%;
    width: auto;
  }

  div {
    font-size: 24px;
    font-weight: 700;
  }
`;

export const LayoutTopNav = forwardRef<HTMLElement, LayoutTopNavProps>(
  function LayoutTopNav({ children, className, ...restProps }, ref) {
    return (
      <nav {...restProps} className={clsx(styles, className)} ref={ref}>
        <div className={imgStyles}>
          <img src="/directory-viz-logo-2-transparent.png" alt="logo" />
          <div>Directory Viz</div>
        </div>
        {children}
      </nav>
    );
  }
);
