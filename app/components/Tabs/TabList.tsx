import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type TabListPropsNative = JSX.IntrinsicElements["ul"];
export type TabListProps = TabListPropsNative;

const ulStyles = css`
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  border-bottom: 1px solid #eaeaea;
  padding: 0 1rem;
  margin: 0;
`;

export const TabList = forwardRef<HTMLUListElement, TabListProps>(
  function TabList({ children, className, ...restProps }, ref) {
    return (
      <ul {...restProps} className={clsx(ulStyles, className)} ref={ref}>
        {children}
      </ul>
    );
  }
);
