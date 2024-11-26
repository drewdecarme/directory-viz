import { classes } from "@buttery/components";
import { css } from "@linaria/core";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonSharedProps = {
  dxSize: ButtonSize;
};

export const buttonClasses: {
  size: Record<ButtonSize, string>;
} = {
  size: {
    sm: "s-sm",
    md: "s-md",
    lg: "s-lg",
  },
};

function makeClass(name: string) {
  return `.${name}`;
}

const styles = css`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  font-family: var(--font-family);
  cursor: pointer;
  transition: scale 0.1s ease-in-out;

  &:active {
    scale: 0.88;
  }

  &${makeClass(buttonClasses.size.sm)} {
    height: 1.5rem;
    padding: 0 0.75rem;
    font-size: 10px;
  }

  &${makeClass(buttonClasses.size.md)} {
    height: 2rem;
    padding: 0 1rem;
    font-size: 14px;
  }

  &${makeClass(buttonClasses.size.lg)} {
    height: 2.5rem;
    padding: 0 1.5rem;
    font-size: 16px;
  }
`;

export function buttonSharedClassName<T extends ButtonSharedProps>(props: T) {
  return classes(styles, buttonClasses.size[props.dxSize]);
}
