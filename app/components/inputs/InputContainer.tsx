import { clsx } from "clsx";
import { forwardRef } from "react";

export type InputContainerPropsNative = JSX.IntrinsicElements["div"];
export type InputContainerProps = InputContainerPropsNative;

export const InputContainer = forwardRef<HTMLDivElement, InputContainerProps>(
  function InputContainer({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={clsx(className)} ref={ref}>
        {children}
      </div>
    );
  }
);
