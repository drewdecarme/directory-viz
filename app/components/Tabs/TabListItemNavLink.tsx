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

const divStyles = css`
  padding: 0.25rem 1.5rem;
  display: grid;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-family-body);
  color: var(--color-text-primary-dark);
  transition: all 0.15s ease-in-out;

  &:after {
    content: "";
    position: absolute;
    height: 0;
    transition: height 0.15s ease-in-out;
  }

  &.active {
    font-weight: 600;
    color: var(--color-primary-dark);

    &::after {
      content: "";
      position: absolute;
      height: 2px;
      width: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--color-primary-dark);
    }
  }
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
  transition: all 0.15s ease-in-out;
  position: relative;
  cursor: pointer;
  display: block;

  &:hover {
  }
`;

export const TabListItemNavLink = forwardRef<
  HTMLAnchorElement,
  TabListItemNavLinkProps & NavLinkProps
>(function TabListItemNavLink({ children, className, ...restProps }, ref) {
  return (
    <NavLink {...restProps} className={clsx(aStyles, className)} ref={ref}>
      {({ isActive }) => (
        <div
          className={clsx(divStyles, {
            active: isActive,
          })}
        >
          {children}
        </div>
      )}
    </NavLink>
  );
});
