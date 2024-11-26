import { css } from "@linaria/core";
import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const bgStyles = css`
  width: 100%;
  max-height: 80vh;
`;

const divStyles = css`
  background-image: linear-gradient(
    305deg,
    hsl(355deg 63% 70%) 1%,
    hsl(314deg 46% 60%) 27%,
    hsl(269deg 36% 56%) 43%,
    hsl(221deg 42% 64%) 58%,
    hsl(214deg 46% 63%) 74%,
    hsl(228deg 50% 56%) 100%
  );
  height: 80vh;

  display: flex;
  align-items: center;

  & > div {
    &:first-child {
      width: 40%;
      color: white;
      padding: 3rem;
      min-width: 40%;
      h1 {
        font-family: var(--font-family);
        font-size: 4.5rem;
        line-height: 1.1;
      }
      p {
        font-family: var(--font-family-body);
        font-size: 1.5rem;
      }
    }
    &:last-child {
      padding: 3rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
        object-fit: contain;
      }
    }
  }
`;

const headerStyles = css`
  display: flex;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;

  img {
    height: 60%;
    width: auto;
  }
`;

export default function Index() {
  const go = useNavigate();
  return (
    <>
      <header className={headerStyles}>
        <img src="/directory-viz-logo-5-transparent.png" alt="logo" />
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
      <div className={divStyles}>
        <div>
          <h1>Create stunning visualizations of your directories.</h1>
          <p>
            Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia
            bibendum nulla sed consectetur
          </p>
        </div>
        <div>
          {/* <img src="/hero.webp" alt="hero" className={bgStyles} /> */}
          <img src="/app-screenshot-3.png" alt="hero" className={bgStyles} />
        </div>
      </div>
    </>
  );
}
