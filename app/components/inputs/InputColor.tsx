import { css } from "@linaria/core";
import clsx from "clsx";
import {
  type ChangeEventHandler,
  type RefCallback,
  forwardRef,
  useCallback,
  useRef,
} from "react";
import { InputContainer } from "./InputContainer";
import { InputLabel } from "./InputLabel";
import type { InputTextProps } from "./InputText";
import { createBaseInputStyles } from "./inputs.utils";

export type InputColorProps = Omit<InputTextProps, "type">;

const divStyles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.25rem;

  &.s {
    &-sm {
      input[type="color"] {
        block-size: 16px;

        &::-webkit-color-swatch {
          border: none;
          border-radius: 0.25rem;
          padding: 0;
        }
        &::-webkit-color-swatch-wrapper {
          border: none;
          border-radius: 0.25rem;
          padding: 0;
        }
      }
    }
  }

  & > input {
    &[type="color"] {
      block-size: 0.8em;
      aspect-ratio: 1/1;
      padding: 0;
      border: 0;
      background: 0;
      block-size: 0.8em;
      display: block;
      inline-size: unset;
      block-size: unset;
      border-radius: inherit;
      padding-block: unset;
      padding-inline: unset;

      &::-webkit-color-swatch {
        border: none;
        padding: 0;
      }
      &::-webkit-color-swatch-wrapper {
        border: none;
        padding: 0;
      }
    }

    &[type="text"] {
      border: 0;
      padding: 0;
      background: transparent;
      width: 100%;
      height: inherit;
      font-size: inherit;
      height: 100%;
      margin: 0;
      font-size: inherit;
      font-family: inherit;

      &:focus {
        outline: none;
      }
    }
  }
`;

export const InputColor = forwardRef<HTMLInputElement, InputColorProps>(
  function InputColor({ dxLabel, className, onChange, ...props }, ref) {
    const textRef = useRef<HTMLInputElement | null>(null);
    const colorRef = useRef<HTMLInputElement | null>(null);

    const setColorRef = useCallback<RefCallback<HTMLInputElement>>(
      (node) => {
        colorRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const handleTextChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      ({ currentTarget: { value } }) => {
        if (!colorRef.current) return;
        colorRef.current.value = value;
      },
      []
    );

    const handleColorChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => {
        if (onChange) onChange(e);
        if (!textRef.current) return;
        textRef.current.value = e.currentTarget.value;
      },
      [onChange]
    );

    return (
      <InputContainer>
        {dxLabel && <InputLabel dxSize={props.dxSize}>{dxLabel}</InputLabel>}
        <div
          className={clsx(createBaseInputStyles(props), className, divStyles)}
        >
          <input
            type="color"
            {...props}
            ref={setColorRef}
            onChange={handleColorChange}
          />
          <input
            type="text"
            ref={textRef}
            defaultValue={props.defaultValue}
            onChange={handleTextChange}
          />
        </div>
      </InputContainer>
    );
  }
);
