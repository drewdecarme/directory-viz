import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutNavListPropsNative = JSX.IntrinsicElements["ul"];
export type LayoutNavListProps = LayoutNavListPropsNative;

const ulStyles = css`
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    margin: 0;
    padding: 0;
  }
`;

export const LayoutNavList = forwardRef<HTMLUListElement, LayoutNavListProps>(
  function LayoutNavList({ children, className, ...restProps }, ref) {
    return (
      <ul {...restProps} className={clsx(ulStyles, className)} ref={ref}>
        {children}
      </ul>
    );
  }
);
