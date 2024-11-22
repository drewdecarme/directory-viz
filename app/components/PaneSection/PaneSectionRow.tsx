import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type PaneSectionRowPropsNative = JSX.IntrinsicElements["div"];
export type PaneSectionRowProps = PaneSectionRowPropsNative;

const divStyles = css`
  & + & {
    margin-top: 0.75rem;
  }
`;

export const PaneSectionRow = forwardRef<HTMLDivElement, PaneSectionRowProps>(
  function PaneSectionRow({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={clsx(divStyles, className)} ref={ref}>
        {children}
      </div>
    );
  }
);
