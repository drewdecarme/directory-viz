import { classes } from "@buttery/components";
import { css } from "@linaria/core";
import { forwardRef } from "react";
import { type ButtonSharedProps, buttonClasses } from "./button.utils";

export type ButtonIconPropsNative = JSX.IntrinsicElements["button"];
export type ButtonIconPropsCustom = ButtonSharedProps & {
  dxVariant: "icon";
};
export type ButtonIconProps = ButtonIconPropsNative & ButtonIconPropsCustom;

const styles = css`
  display: grid;
  place-content: center;
  border-radius: 0.25rem;
  aspect-ratio: 1 / 1;
  border: 0;
  background: 0;
  padding: 0;
  transition: all 0.1s ease-in-out;
  border: 1px solid transparent;

  &:hover,
  &:focus {
    outline: none;
    border: 1px solid var(--color-primary-dark);
    background: rgba(var(--color-primary-raw), 0.2);
  }

  &.${buttonClasses.size.sm} {
    height: 2rem;
  }

  &.${buttonClasses.size.md} {
    height: 2.5rem;
  }

  &.${buttonClasses.size.lg} {
    height: 3rem;
  }
`;

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  function ButtonIcon(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { children, className, dxSize, ...restProps },
    ref
  ) {
    return (
      <button
        {...restProps}
        className={classes(styles, buttonClasses.size[dxSize], className)}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);
