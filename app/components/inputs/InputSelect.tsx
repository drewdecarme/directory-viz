import { clsx } from "clsx";
import { forwardRef } from "react";
import { InputMeta, type InputMetaProps } from "./InputMeta";
import { type InputBaseProps, createBaseInputStyles } from "./inputs.utils";

export type InputSelectPropsNative = JSX.IntrinsicElements["select"];
export type InputSelectPropsCustom = InputBaseProps & InputMetaProps;
export type InputSelectProps = InputSelectPropsNative & InputSelectPropsCustom;

export const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  function InputSelect({ children, className, ...restProps }, ref) {
    return (
      <InputMeta {...restProps}>
        <select
          {...restProps}
          className={clsx(createBaseInputStyles(restProps), className)}
          ref={ref}
        >
          {children}
        </select>
      </InputMeta>
    );
  }
);
