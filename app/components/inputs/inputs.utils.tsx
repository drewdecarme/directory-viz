import { css } from "@linaria/core";
import clsx from "clsx";

export type InputBaseProps = {
  /**
   * The size of the input
   */
  dxSize: "sm" | "md" | "lg";
  dxLabel?: string;
  dxHelp?: string;
};

export const inputStylesBase = css`
  width: 100%;
  border-radius: 0.25rem;
  border: none;
  background: var(--color-neutral);
  font-family: var(--font-family-body);
  border: 1px solid var(--color-neutral);
  transition: all 0.1s ease-in-out;
  padding: 0;

  &:focus,
  &:focus-within {
    outline: none;
    border: 1px solid var(--color-primary-dark);
  }

  &.s {
    &-sm {
      height: 24px;
      font-size: 12px;
      padding: 0 0.25rem;
    }
  }
`;

export function createBaseInputStyles<T extends InputBaseProps>(props: T) {
  return clsx(inputStylesBase, {
    "s-sm": props.dxSize,
  });
}
