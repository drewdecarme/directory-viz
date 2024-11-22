import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";
import { createBaseInputStyles } from "./inputs.utils";

export type InputTextPropsNative = JSX.IntrinsicElements["input"];
export type InputTextPropsCustom = {
  dxSize: "sm" | "md" | "lg";
};
export type InputTextProps = InputTextPropsNative & InputTextPropsCustom;

export const inputStyles = css`
  width: 100%;
  border-radius: 0.25rem;
  border: none;
  background: var(--color-neutral);
  font-family: var(--font-family-body);

  &:focus {
    outline: none;
    border: 1px solid var(--color-primary);
  }

  &.s {
    &-sm {
      height: 24px;
      font-size: 12px;
      padding: 0.25rem;
    }
  }
`;

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText({ className, ...restProps }, ref) {
    return (
      <input
        {...restProps}
        className={clsx(createBaseInputStyles(restProps), className)}
        ref={ref}
      />
    );
  }
);
