import { css } from "@linaria/core";
import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "DirectoryViz" },
    {
      name: "description",
      content:
        "Convert simple indented text into beautiful & customizable images of your directory structures & hierarchies",
    },
  ];
};

const headerStyles = css`
  display: flex;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  position: fixed;
  top: 0;
  backdrop-filter: blur(8px);
  width: 100%;
  z-index: 10;

  img {
    height: 60%;
    width: auto;
  }
`;

const titleStyles = css`
  max-width: 1024px;
  margin: 0 auto;
  padding: 6rem 3rem;
  text-align: center;

  h1 {
    font-family: var(--font-family);
    font-size: 4rem;
    line-height: 1.2;
    margin-bottom: 0;

    span {
      background: var(--color-gradient);
      background-clip: text;
      -webkit-background-clip: text; /* Clip the background to the text */
      -webkit-text-fill-color: transparent; /* Make the text color transparent */
    }
  }

  p {
    font-family: var(--font-family-body);
    font-size: 1.25rem;
    margin: 1rem auto 1rem auto;
    color: var(--color-text-primary);
    max-width: 50ch;
    line-height: 1.5;
  }

  div {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;
  }
`;

const mainStyle = css`
  width: 100%;
  background-image: var(--color-gradient);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%; /* Adjust the height of the fade */
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.9) 30%,
      rgba(255, 255, 255, 0.7) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
  }

  & > div {
    height: 100vh;
    width: 100%;

    &:first-child {
      max-width: 1400px;
      position: relative;
      margin: 0 auto;

      & > div {
        display: flex;
        justify-content: center;
      }

      img {
        height: auto;
        width: 90%;
        object-fit: contain;
        border-radius: 0.5rem;
        box-shadow: var(--box-shadow-1);
      }
    }
  }
`;

export default function Index() {
  const go = useNavigate();

  return (
    <>
      <header className={headerStyles}>
        <img src="/images/directory-viz-logo-5-transparent.png" alt="logo" />
        <div>
          <Button
            dxSize="sm"
            dxColor="primary"
            dxVariant="contained"
            onClick={() => go("/build")}
          >
            Start Building
          </Button>
        </div>
      </header>
      <main>
        <div className={titleStyles}>
          <h1>
            Create stunning <span>visualizations</span> of your directories
          </h1>
          <p>
            <strong>DirectoryViz</strong> enables you to quickly convert simple
            indented text into beautiful, completely customizable images of your
            directory structures & hierarchy to include in your documentation,
            apps, and marketing material
          </p>
          <div>
            <Button
              dxVariant="contained"
              dxSize="lg"
              dxColor="primary"
              onClick={() => go("/build")}
            >
              Get started for free
            </Button>
            <Button dxVariant="outlined" dxSize="lg" dxColor="primary">
              Learn more
            </Button>
          </div>
        </div>
        <div className={mainStyle}>
          <div>
            <div>
              <img src="/images/app-screenshot-empty.png" alt="home" />
            </div>
          </div>
          <div>next contnet</div>
        </div>
      </main>
      <footer>footer</footer>
    </>
  );
}
