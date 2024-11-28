import { exhaustiveMatchGuard } from "@buttery/components";
import { forwardRef } from "react";
import { ButtonContained, type ButtonContainedProps } from "./ButtonContained";
import { ButtonIcon, type ButtonIconProps } from "./ButtonIcon";
import { ButtonOutlined, type ButtonOutlinedProps } from "./ButtonOutlined";

export type ButtonProps =
  | ButtonContainedProps
  | ButtonOutlinedProps
  | ButtonIconProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    switch (props.dxVariant) {
      case "contained":
        return <ButtonContained {...props} ref={ref} />;

      case "outlined":
        return <ButtonOutlined {...props} ref={ref} />;

      case "icon":
        return <ButtonIcon {...props} ref={ref} />;

      default:
        exhaustiveMatchGuard(props);
    }
  }
);
