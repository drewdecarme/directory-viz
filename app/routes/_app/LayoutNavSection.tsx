import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutNavSectionPropsNative = JSX.IntrinsicElements["section"];

export type LayoutNavSectionProps = LayoutNavSectionPropsNative;

const sectionStyles = css`
  display: flex;
  flex-direction: column;
`;

export const LayoutNavSection = forwardRef<HTMLElement, LayoutNavSectionProps>(
  function LayoutNavSection({ children, className, ...restProps }, ref) {
    return (
      <section
        {...restProps}
        className={clsx(sectionStyles, className)}
        ref={ref}
      >
        {children}
      </section>
    );
  }
);
