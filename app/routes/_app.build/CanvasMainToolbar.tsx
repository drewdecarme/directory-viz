import { css } from "@linaria/core";
import { Button } from "~/components/Button";

const ulStyles = css`
  display: flex;
  position: absolute;
  top: 20px;
  width: auto;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background: white;
  box-shadow: var(--box-shadow-2);
  border-radius: 0.5rem;
  transform: translateX(50%);
  padding: 0.25rem;
`;

export function CanvasMainToolbar() {
  return (
    <ul className={ulStyles}>
      <li>
        <Button dxVariant="icon" dxSize="sm">
          i
        </Button>
      </li>
      <li>
        <Button dxVariant="icon" dxSize="sm">
          i
        </Button>
      </li>
    </ul>
  );
}
