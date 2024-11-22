import { css } from "@linaria/core";
import { LayoutPaneHeader } from "~/components/LayoutPaneHeader";

const tabStyles = css`
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  border-bottom: 1px solid #eaeaea;
  padding: 0 1rem;

  ul {
    margin: 0;
  }

  li {
    button {
      margin: 0;
      background: 0;
      border: none;
      padding: 0.25rem 1.5rem;
      font-size: 14px;
      height: 3rem;
      font-weight: 500;
      font-family: var(--font-family-body);
      border-bottom: 4px solid transparent;
      transition: all 0.15s ease-in-out;
      cursor: pointer;

      &.active {
        border-bottom: 4px solid var(--color-primary);
        font-weight: 600;
        color: var(--color-primary);
      }
      &:hover {
        color: var(--color-primary);
      }
    }
  }
`;

export function CanvasPaneProperties() {
  return (
    <>
      <LayoutPaneHeader dxTitle="Properties" />
      <ul className={tabStyles}>
        <li>
          <button type="button" className="active">
            Global
          </button>
        </li>
        <li>
          <button type="button">Node</button>
        </li>
        <li>
          <button type="button">Export</button>
        </li>
      </ul>
    </>
  );
}
