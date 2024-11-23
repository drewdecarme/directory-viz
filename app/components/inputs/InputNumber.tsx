import { forwardRef } from "react";
import { InputText, type InputTextProps } from "./InputText";

export type InputNumberProps = Omit<InputTextProps, "type">;

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumber(props, ref) {
    return <InputText {...props} type="number" ref={ref} />;
  }
);
