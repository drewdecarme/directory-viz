import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

const sectionStyles = css`
  padding: 1rem;
  font-family: var(--font-family-body);

  & + & {
    border-top: 1px solid var(--border-color);
  }

  header {
    font-size: 0.75rem;
    font-weight: 600;

    h1 {
      margin-top: 0;
      color: var(--color-text-primary-dark);
    }
  }
`;

export type PaneSectionPropsNative = JSX.IntrinsicElements["section"];
export type PaneSectionPropsCustom = {
  dxTitle: string;
};
export type PaneSectionProps = PaneSectionPropsNative & PaneSectionPropsCustom;

export const PaneSection = forwardRef<HTMLDivElement, PaneSectionProps>(
  function PaneSection({ children, className, dxTitle, ...restProps }, ref) {
    return (
      <section
        {...restProps}
        className={clsx(sectionStyles, className)}
        ref={ref}
      >
        <header>
          <h1>{dxTitle}</h1>
        </header>
        {children}
      </section>
    );
  }
);
