import { clsx } from "clsx";
import { forwardRef } from "react";
import { InputContainer } from "./InputContainer";
import { InputLabel, type InputLabelPropsCustom } from "./InputLabel";
import { type InputBaseProps, createBaseInputStyles } from "./inputs.utils";

export type InputTextPropsNative = JSX.IntrinsicElements["input"];
export type InputTextPropsCustom = InputBaseProps & InputLabelPropsCustom;
export type InputTextProps = InputTextPropsNative & InputTextPropsCustom;

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText({ className, type = "text", dxLabel, ...props }, ref) {
    return (
      <InputContainer>
        {dxLabel && <InputLabel dxSize={props.dxSize}>{dxLabel}</InputLabel>}
        <input
          {...props}
          type={type}
          className={clsx(createBaseInputStyles(props), className)}
          ref={ref}
        />
      </InputContainer>
    );
  }
);
