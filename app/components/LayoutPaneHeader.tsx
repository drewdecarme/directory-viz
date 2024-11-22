import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

const headerStyles = css`
  height: 4rem;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 1rem;
  font-family: var(--font-family);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export type LayoutPaneHeaderPropsNative = JSX.IntrinsicElements["header"];
export type LayoutPaneHeaderPropsCustom = {
  /**
   * The title of the pane
   */
  dxTitle: string;
};
export type LayoutPaneHeaderProps = LayoutPaneHeaderPropsNative &
  LayoutPaneHeaderPropsCustom;

export const LayoutPaneHeader = forwardRef<HTMLElement, LayoutPaneHeaderProps>(
  function LayoutPaneHeader(
    { children, className, dxTitle, ...restProps },
    ref
  ) {
    return (
      <header
        {...restProps}
        className={clsx(headerStyles, className)}
        ref={ref}
      >
        <div>{dxTitle}</div>
        {children}
      </header>
    );
  }
);
