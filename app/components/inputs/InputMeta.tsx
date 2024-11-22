import { css } from "@linaria/core";
import { clsx } from "clsx";
import { type ReactElement, forwardRef } from "react";
import type { InputBaseProps } from "./inputs.utils";

export type InputMetaPropsNative = Omit<
  JSX.IntrinsicElements["label"],
  "children"
>;
export type InputMetaPropsCustom = InputBaseProps & {
  dxLabel?: string;
  dxHelp?: string;
  dxError?: string | boolean;
  children: ReactElement<HTMLInputElement | HTMLSelectElement>;
};
export type InputMetaProps = InputMetaPropsNative & InputMetaPropsCustom;

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

export const InputMeta = forwardRef<HTMLLabelElement, InputMetaProps>(
  function InputMeta(
    { children, className, dxLabel, dxSize, ...restProps },
    ref
  ) {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: Control is the child
      <label {...restProps} className={clsx(className)} ref={ref}>
        {dxLabel && (
          <div
            className={clsx(labelStyles, {
              "s-sm": dxSize === "sm",
            })}
          >
            {dxLabel}
          </div>
        )}
        {children}
      </label>
    );
  }
);
