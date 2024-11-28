import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

const layoutCss = css`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export type LayoutPropsNative = JSX.IntrinsicElements["section"];
export type LayoutProps = LayoutPropsNative;

export const Layout = forwardRef<HTMLBodyElement, LayoutProps>(function Layout(
  { children, className, ...restProps },
  ref
) {
  return (
    <section {...restProps} className={clsx(layoutCss, className)} ref={ref}>
      {children}
    </section>
  );
});
