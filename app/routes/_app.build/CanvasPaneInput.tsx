import { css } from "@linaria/core";
import {
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { LayoutPaneHeader } from "~/routes/_app/LayoutPaneHeader";
import { useDirectoryContext } from "../../features/Directory/Directory.context";
import {
  INDENTATION,
  buildDirectoryGraphFromTextarea,
} from "./buildDirectoryGraphFromTextarea";

const inputStyles = css`
  width: 100%;
  height: 100%;
  padding: 1rem;
  resize: none;
  border: 1px solid var(--border-color);
  transition: all 0.15s ease-in-out;
  border-radius: 0.25rem;

  &:focus {
    border-color: var(--color-primary);
    outline: unset;
  }
`;

const contentStyles = css`
  padding: 1rem;
  height: 100%;
`;

export function CanvasPaneInput() {
  const { setGraph } = useDirectoryContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!textareaRef.current || !firstRender.current) return;
    const graph = buildDirectoryGraphFromTextarea(textareaRef.current);
    setGraph(graph);
    firstRender.current = false;
  }, [setGraph]);

  const handleOnChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      const graph = buildDirectoryGraphFromTextarea(e.currentTarget);
      setGraph(graph);
    },
    [setGraph]
  );

  const handleOnKeydown = useCallback<
    KeyboardEventHandler<HTMLTextAreaElement>
  >(
    (e) => {
      const input = e.currentTarget;

      if (e.shiftKey && e.key === "Tab") {
        e.preventDefault();
        const start = input.selectionStart;
        const end = input.selectionEnd;
        // Insert indentation character at cursor position
        input.value = `${input.value.substring(
          0,
          start - INDENTATION.length
        )}${input.value.substring(end)}`;

        // Move the cursor to the right of the tab character
        input.selectionStart = input.selectionEnd = start - INDENTATION.length;
        const graph = buildDirectoryGraphFromTextarea(input);
        setGraph(graph);
        return;
      }

      // Intercept the Tab key
      if (e.key === "Tab") {
        e.preventDefault();

        const start = input.selectionStart;
        const end = input.selectionEnd;

        // Insert indentation character at cursor position
        input.value = `${input.value.substring(
          0,
          start
        )}${INDENTATION}${input.value.substring(end)}`;

        // Move the cursor to the right of the tab character
        input.selectionStart = input.selectionEnd = start + INDENTATION.length;
        const graph = buildDirectoryGraphFromTextarea(input);
        setGraph(graph);
        return;
      }
    },
    [setGraph]
  );

  return (
    <>
      <LayoutPaneHeader dxTitle="Directory Outline" />
      <div className={contentStyles}>
        <textarea
          defaultValue={`folder 1
    folder 1.1
        file 1.1.1
        file 1.1.2
    folder 1.2
        file 1.2.1
        file 1.2.2
folder 2
    folder 2.1
        file 2.1.1
    file 2.2`}
          className={inputStyles}
          ref={textareaRef}
          onChange={handleOnChange}
          onKeyDown={handleOnKeydown}
        />
      </div>
    </>
  );
}
