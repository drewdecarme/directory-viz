import { css } from "@linaria/core";
import { clsx } from "clsx";
import { forwardRef } from "react";

const layoutCss = css`
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  --font-family: Baloo, "sans-serif";
  --font-family-body: Inter, "sans-serif";
  --border-color: #eaeaea;
  --color-primary: #a955ff;

  box-sizing: border-box;
  * {
    box-sizing: border-box;
    &::after,
    &::before {
      box-sizing: border-box;
    }
  }

  display: grid;
  grid-template-columns: auto 1fr;
`;

export type LayoutPropsNative = JSX.IntrinsicElements["body"];
export type LayoutProps = LayoutPropsNative;

export const Layout = forwardRef<HTMLBodyElement, LayoutProps>(function Layout(
  { children, className, ...restProps },
  ref
) {
  return (
    <body {...restProps} className={clsx(layoutCss, className)} ref={ref}>
      {children}
    </body>
  );
});
