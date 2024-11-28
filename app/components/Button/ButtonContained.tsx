import { classes } from "@buttery/components";
import { css } from "@linaria/core";
import { forwardRef } from "react";
import { type ButtonSharedProps, buttonSharedClassName } from "./button.utils";

export type ButtonContainedPropsNative = JSX.IntrinsicElements["button"];
export type ButtonContainedPropsCustom = ButtonSharedProps & {
  dxVariant: "contained";
  dxColor: "primary" | "secondary";
};
export type ButtonContainedProps = ButtonContainedPropsNative &
  ButtonContainedPropsCustom;

const styles = css`
  display: grid;
  place-content: center;
  border-radius: 1rem;

  &.primary {
    color: white;
    background-color: var(--color-primary-dark);
    letter-spacing: 1.1;
    transition: all 0.15s ease-in-out;

    &:hover,
    &:active {
      background-color: var(--color-primary-very-dark);
    }
  }
`;

export const ButtonContained = forwardRef<
  HTMLButtonElement,
  ButtonContainedProps
>(function ButtonContained(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { children, className, dxSize, dxVariant: _, dxColor, ...restProps },
  ref
) {
  return (
    <button
      {...restProps}
      className={classes(
        styles,
        buttonSharedClassName({ dxSize }),
        dxColor,
        className
      )}
      ref={ref}
    >
      {children}
    </button>
  );
});
