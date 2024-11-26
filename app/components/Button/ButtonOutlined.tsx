import { classes } from "@buttery/components";
import { css } from "@linaria/core";
import { forwardRef } from "react";
import { type ButtonSharedProps, buttonSharedClassName } from "./button.utils";

export type ButtonOutlinedPropsNative = JSX.IntrinsicElements["button"];
export type ButtonOutlinedPropsCustom = ButtonSharedProps & {
  dxVariant: "outlined";
  dxColor: "primary";
};
export type ButtonOutlinedProps = ButtonOutlinedPropsNative &
  ButtonOutlinedPropsCustom;

const styles = css`
  display: grid;
  place-content: center;
  border-radius: 1rem;

  &.primary {
    border: 1px solid var(--color-primary-dark);
    color: var(--color-primary-dark);
  }
`;

export const ButtonOutlined = forwardRef<
  HTMLButtonElement,
  ButtonOutlinedProps
>(function ButtonOutlined(
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
