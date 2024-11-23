import { clsx } from "clsx";
import { forwardRef } from "react";
import { InputLabel, type InputLabelPropsCustom } from "./InputLabel";
import { type InputBaseProps, createBaseInputStyles } from "./inputs.utils";

export type InputSelectPropsNative = JSX.IntrinsicElements["select"];
export type InputSelectPropsCustom = InputBaseProps & InputLabelPropsCustom;
export type InputSelectProps = InputSelectPropsNative & InputSelectPropsCustom;

export const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  function InputSelect({ children, className, dxLabel, ...props }, ref) {
    return (
      <>
        {dxLabel && <InputLabel dxSize={props.dxSize}>{dxLabel}</InputLabel>}
        <select
          {...props}
          className={clsx(createBaseInputStyles(props), className)}
          ref={ref}
        >
          {children}
        </select>
      </>
    );
  }
);
