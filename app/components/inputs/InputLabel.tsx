import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";
import type { InputBaseProps } from "./inputs.utils";

export type InputLabelPropsNative = Omit<
  JSX.IntrinsicElements["label"],
  "children"
>;
export type InputLabelPropsCustom = Pick<InputBaseProps, "dxSize">;
export type InputLabelProps = InputLabelPropsNative & InputLabelPropsCustom;

const labelStyles = css`
  font-family: var(--font-family-body);

  &.s {
    &-sm {
      font-size: 10px;
      margin-bottom: 4px;
      color: var(--color-text-secondary);
    }
  }
`;

export const InputLabel = forwardRef<
  HTMLLabelElement,
  Omit<InputLabelProps, "children"> & { children?: string }
>(function InputLabel({ children, className, dxSize, ...restProps }, ref) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
    <label
      {...restProps}
      className={clsx(labelStyles, className, {
        "s-sm": dxSize === "sm",
      })}
      ref={ref}
    >
      {children}
    </label>
  );
});
