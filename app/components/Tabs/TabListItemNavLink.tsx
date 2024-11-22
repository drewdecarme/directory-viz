import { css } from "@linaria/core";
import { NavLink, type NavLinkProps } from "@remix-run/react";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type TabListItemNavLinkPropsNative = Omit<
  JSX.IntrinsicElements["a"],
  "children"
>;
export type TabListItemNavLinkPropsCustom = {
  children: string;
};
export type TabListItemNavLinkProps = TabListItemNavLinkPropsNative &
  TabListItemNavLinkPropsCustom;

const spanStyles = css`
  padding: 0.25rem 1.5rem;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-family-body);
`;

const aStyles = css`
  margin: 0;
  background: 0;
  border: none;
  text-decoration: none;
  color: unset;
  height: 3rem;
  display: grid;
  align-content: center;
  border-bottom: 4px solid transparent;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:has(.active) {
    border-bottom: 4px solid var(--color-primary);
    font-weight: 600;
    color: var(--color-primary);
  }

  &:hover {
    color: var(--color-primary);
  }
`;

export const TabListItemNavLink = forwardRef<
  HTMLAnchorElement,
  TabListItemNavLinkProps & NavLinkProps
>(function TabListItemNavLink({ children, className, ...restProps }, ref) {
  return (
    <NavLink {...restProps} className={clsx(aStyles, className)} ref={ref}>
      {({ isActive }) => (
        <span
          className={clsx(spanStyles, {
            active: isActive,
          })}
        >
          {children}
        </span>
      )}
    </NavLink>
  );
});
