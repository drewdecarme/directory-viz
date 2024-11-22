import { css } from "@linaria/core";
import { NavLink } from "@remix-run/react";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutNavListItemNavLinkPropsNative = JSX.IntrinsicElements["div"];
export type LayoutNavListItemNavLinkPropsCustom = {
  dxRoute: string;
};
export type LayoutNavListItemNavLinkProps =
  LayoutNavListItemNavLinkPropsNative & LayoutNavListItemNavLinkPropsCustom;

const aStyles = css`
  &:focus {
    outline: none;
  }
`;

const divStyles = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: grid;
  place-content: center;
  border-radius: 0.25rem;
  background: transparent;
  transition: all 0.15s ease-in-out;
  border: 1px solid transparent;
  cursor: pointer;

  svg {
    transition: all 0.15s ease-in-out;
  }

  &:hover,
  &:focus {
    border-color: var(--color-primary-dark);

    svg {
      color: var(--color-primary-dark);
    }
  }

  &.active {
    background-color: rgba(var(--color-primary-raw), 0.2);

    svg {
      color: var(--color-primary-dark);
    }
  }
`;

export const LayoutNavListItemNavLink = forwardRef<
  HTMLDivElement,
  LayoutNavListItemNavLinkProps
>(function LayoutNavListItemNavLink(
  { children, className, dxRoute, ...restProps },
  ref
) {
  return (
    <NavLink to={dxRoute} className={aStyles}>
      {({ isActive }) => (
        <div
          {...restProps}
          className={clsx(divStyles, className, {
            active: isActive,
          })}
          ref={ref}
        >
          {children}
        </div>
      )}
    </NavLink>
  );
});
