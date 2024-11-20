import { css } from "@linaria/core";
import {
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { useDirectoryContext } from "./Directory.context";
import {
  INDENTATION,
  buildDirectoryGraphFromTextarea,
} from "./buildDirectoryGraphFromTextarea";

const styles = css`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  resize: none;
`;

export function DirectoryInput() {
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
      className={styles}
      ref={textareaRef}
      onChange={handleOnChange}
      onKeyDown={handleOnKeydown}
    />
  );
}
