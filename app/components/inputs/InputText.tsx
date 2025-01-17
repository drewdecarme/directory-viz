import { clsx } from "clsx";
import { forwardRef, useId } from "react";
import { InputContainer } from "./InputContainer";
import { InputLabel, type InputLabelPropsCustom } from "./InputLabel";
import { type InputBaseProps, createBaseInputStyles } from "./inputs.utils";

export type InputTextPropsNative = JSX.IntrinsicElements["input"];
export type InputTextPropsCustom = InputBaseProps & InputLabelPropsCustom;
export type InputTextProps = InputTextPropsNative & InputTextPropsCustom;

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText({ className, type = "text", dxLabel, ...props }, ref) {
    const id = useId();
    return (
      <InputContainer>
        {dxLabel && (
          <InputLabel dxSize={props.dxSize} htmlFor={id}>
            {dxLabel}
          </InputLabel>
        )}
        <input
          {...props}
          id={id}
          type={type}
          className={clsx(createBaseInputStyles(props), className)}
          ref={ref}
        />
      </InputContainer>
    );
  }
);
