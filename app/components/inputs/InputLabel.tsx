import { styled } from "@linaria/react";
import { clsx } from "clsx";
import { forwardRef } from "react";
import type { InputBaseProps } from "./inputs.utils";

export type InputLabelPropsNative = JSX.IntrinsicElements["label"];
export type InputLabelPropsCustom = Pick<InputBaseProps, "dxSize"> & {
  dxAs?: "label" | "div";
};
export type InputLabelProps = InputLabelPropsNative & InputLabelPropsCustom;

const SLabel = styled("label")`
  font-family: var(--font-family-body);
  display: inline-block;

  &.s {
    &-sm {
      font-size: 10px;
      margin-bottom: 4px;
      color: var(--color-text-secondary);
    }
  }
`;

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  function InputLabel(
    { children, className, dxSize, dxAs = "label", ...restProps },
    ref
  ) {
    return (
      <SLabel
        as={dxAs}
        {...restProps}
        className={clsx(className, {
          "s-sm": dxSize === "sm",
        })}
        ref={ref}
      >
        {children}
      </SLabel>
    );
  }
);
