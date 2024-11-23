import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type PaneSectionRowPropsNative = JSX.IntrinsicElements["div"];
export type PaneSectionRowPropsCustom = {
  /**
   * Puts the contents in line with each other
   */
  dxInline?: "fill-row";
};
export type PaneSectionRowProps = PaneSectionRowPropsNative &
  PaneSectionRowPropsCustom;

const divStyles = css`
  &.fill-row {
    display: flex;
    justify-content: space-evenly;
    gap: 0.5rem;
    & > * {
      flex: 1;
    }
  }

  & + & {
    margin-top: 0.75rem;
  }
`;

export const PaneSectionRow = forwardRef<HTMLDivElement, PaneSectionRowProps>(
  function PaneSectionRow(
    { children, className, dxInline, ...restProps },
    ref
  ) {
    return (
      <div
        {...restProps}
        className={clsx(divStyles, className, dxInline)}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
