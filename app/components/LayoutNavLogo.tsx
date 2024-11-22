import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

export type LayoutNavLogoPropsNative = Omit<
  JSX.IntrinsicElements["div"],
  "children"
>;
export type LayoutNavLogoPropsCustom = {
  dxLogoUrl: string;
  dxLogoAlt: string;
};
export type LayoutNavLogoProps = LayoutNavLogoPropsNative &
  LayoutNavLogoPropsCustom;

const divStyles = css`
  padding: 0.25rem;
  display: flex;
  justify-content: center;

  img {
    width: 50%;
  }
`;

export const LayoutNavLogo = forwardRef<HTMLDivElement, LayoutNavLogoProps>(
  function LayoutNavLogo({ className, ...restProps }, ref) {
    return (
      <div {...restProps} className={clsx(divStyles, className)} ref={ref}>
        <img src="/directory-viz-logo-5-transparent.png" alt="logo" />
      </div>
    );
  }
);
