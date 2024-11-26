import { css } from "@linaria/core";
import type { MetaFunction } from "@remix-run/node";

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
        border-radius: 1rem;
        object-fit: contain;
      }
    }
  }
`;

export default function Index() {
  return (
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
        <img src="/hero.webp" alt="hero" className={bgStyles} />
      </div>
    </div>
  );
}
