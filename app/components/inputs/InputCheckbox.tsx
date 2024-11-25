import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef, useId } from "react";
import { InputContainer } from "./InputContainer";
import { InputLabel, type InputLabelPropsCustom } from "./InputLabel";
import { type InputBaseProps, createBaseInputSizes } from "./inputs.utils";

export type InputCheckboxPropsNative = Omit<
  JSX.IntrinsicElements["input"],
  "type"
>;
export type InputCheckboxPropsCustom = InputBaseProps & InputLabelPropsCustom;
export type InputCheckboxProps = InputCheckboxPropsNative &
  InputCheckboxPropsCustom;

const Tick03Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={8}
    height={8}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <title>checkmark</title>
    <path
      d="M11.4743 17.3058C14.4874 14.0819 17.3962 11.8949 21.0501 8.79776C22.1437 7.87072 22.3126 6.24578 21.4547 5.09453C20.5429 3.87098 18.8103 3.62642 17.6376 4.59913C14.2907 7.37521 11.6868 10.0482 9.21679 12.9051C9.08718 13.055 9.02237 13.13 8.95511 13.1722C8.78453 13.2792 8.57138 13.2803 8.3997 13.1751C8.33199 13.1336 8.26707 13.0601 8.13722 12.9131L6.82103 11.4229C5.6201 10.0631 3.46608 10.2137 2.46339 11.7274C1.76171 12.7867 1.86569 14.1905 2.71567 15.1334L4.7796 17.4229C6.32334 19.1353 7.09521 19.9916 8.02185 19.9999C8.94849 20.0083 9.79043 19.1075 11.4743 17.3058Z"
      fill="currentColor"
    />
  </svg>
);

const styles = css`
  && {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    overflow: hidden;
    margin-bottom: 0;
  }

  input {
    margin: 0;
    position: absolute;
    left: -100px;
  }

  .label {
    margin-bottom: 0 !important;
    transition: all 0.1s ease-in-out;
  }

  .checkbox {
    height: 12px;
    width: 12px;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 2px;
    display: grid;
    place-content: center;
    transition: all 0.1s ease-in-out;
  }

  .icon {
    visibility: 0;
    color: white;
    transition: all 0.1s ease-in-out;
  }

  &:hover {
    .checkbox {
      border-color: var(--color-primary-dark);
    }
    .label {
      color: var(--color-primary);
    }
  }

  &:has(input:active) {
    .checkbox {
      transform: scale(0.8);
    }
  }

  &:has(input:checked) {
    .checkbox {
      border-color: var(--color-primary-dark);
      background: var(--color-primary-dark);
    }

    .icon {
      visibility: 1;
    }
  }

  &:has(input:focus) {
    .checkbox {
      border-color: var(--color-text-primary);
    }

    .label {
      color: var(--color-text-primary);
    }
  }
`;

export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  function InputCheckbox({ className, dxLabel, ...props }, ref) {
    const id = useId();
    return (
      <InputContainer className={clsx(props.dxSize, className)}>
        <InputLabel dxSize={props.dxSize} htmlFor={id} className={styles}>
          <input
            {...props}
            id={id}
            type="checkbox"
            className={clsx(createBaseInputSizes(props), className)}
            ref={ref}
          />
          <div className="checkbox">
            <Tick03Icon className="icon" />
          </div>
          {dxLabel && (
            <InputLabel dxAs="div" dxSize="sm" className="label">
              {dxLabel}
            </InputLabel>
          )}
        </InputLabel>
      </InputContainer>
    );
  }
);
