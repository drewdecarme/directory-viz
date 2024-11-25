import { styled } from "@linaria/react";
import { useCallback, useRef, useState } from "react";
import { PaneSectionRow } from "~/components/PaneSection/PaneSectionRow";
import { InputNumber } from "~/components/inputs/InputNumber";
import { useDirectoryContext } from "~/features/Directory/Directory.context";

const NodeGrid = styled("div")`
  display: grid;
  grid-template-areas:
    "n-pad-top    n-pad-top  n-pad-top   n-pad-top"
    "n-pad-left   i-width    t-pad-left  t-width"
    "n-pad-bot    n-pad-bot  n-pad-bot   n-pad-bot";
  grid-template-columns: auto auto auto 1fr;

  & > * {
    font-size: 10px;
    padding: 0.5rem;
    border: 1px solid white;
  }

  & > button {
    margin: 0;
    background: var(--color-neutral);
    transition: all 0.1s ease-in-out;

    &:hover,
    &:focus,
    &.active {
      background-color: rgba(var(--color-primary-raw), 0.2);
      color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
      z-index: 10;
    }
    &:hover {
      &:not(.active) {
        border: 1px solid white;
        background-color: rgba(var(--color-primary-raw), 0.2);
      }
    }
  }
`;

const NodePaddingTop = styled("button")`
  grid-area: n-pad-top;
  text-align: center;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
`;
const NodePaddingLeft = styled("button")`
  grid-area: n-pad-left;
`;
const NodePaddingBottom = styled("button")`
  grid-area: n-pad-bot;
  text-align: center;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
`;
const IconWidth = styled("button")`
  grid-area: i-width;
  width: 1fr;
`;
const TextPaddingLeft = styled("button")`
  grid-area: t-pad-left;
`;
const TextWidth = styled("div")`
  grid-area: t-width;
  background: white !important;
`;

type ButtonProps = Pick<
  JSX.IntrinsicElements["button"],
  "onClick" | "onMouseOver" | "onFocus" | "className"
>;

export function NodeDiagram() {
  const { globalOptions, setGlobalOptions } = useDirectoryContext();
  const [hoveredValue, setHoveredValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<
    { label: string; value: keyof typeof globalOptions } | undefined
  >(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const createButtonProps = useCallback<
    (value: keyof typeof globalOptions, label: string) => ButtonProps
  >(
    (value, label) => {
      return {
        onMouseOver: () => setHoveredValue(label),
        onClick: () => {
          setSelectedOption({ value, label });
          inputRef.current?.focus();
        },
        onFocus: () => setSelectedOption({ value, label }),
        className: selectedOption?.value === value ? "active" : undefined,
      };
    },
    [selectedOption?.value]
  );

  return (
    <>
      <PaneSectionRow
        style={{
          fontSize: 10,
        }}
      >
        Use the mouse or keyboard to hover over the grid to select and / or edit
        the value.
      </PaneSectionRow>
      <PaneSectionRow
        style={{
          fontSize: 10,
        }}
      >
        <b>Node Value:&nbsp;</b>
        <span>{(hoveredValue || selectedOption?.label) ?? undefined}</span>
      </PaneSectionRow>
      <PaneSectionRow>
        <NodeGrid onMouseLeave={() => setHoveredValue("")}>
          <NodePaddingTop
            {...createButtonProps("NODE_PADDING_VERTICAL", "Padding Vertical")}
          >
            {globalOptions.NODE_PADDING_VERTICAL}
          </NodePaddingTop>
          <NodePaddingLeft
            {...createButtonProps("NODE_PADDING_LEFT", "Padding Left")}
          >
            {globalOptions.NODE_PADDING_LEFT}
          </NodePaddingLeft>
          <IconWidth
            {...createButtonProps("NODE_ICON_DIMENSION", "Icon Width")}
          >
            {globalOptions.NODE_ICON_DIMENSION}
          </IconWidth>
          <TextPaddingLeft
            {...createButtonProps(
              "NODE_TEXT_PADDING_LEFT",
              "Text Padding Left"
            )}
          >
            {globalOptions.NODE_TEXT_PADDING_LEFT}
          </TextPaddingLeft>
          <TextWidth className="ignore">File / Folder Text</TextWidth>
          <NodePaddingBottom
            {...createButtonProps("NODE_PADDING_VERTICAL", "Padding Vertical")}
          >
            {globalOptions.NODE_PADDING_VERTICAL}
          </NodePaddingBottom>
        </NodeGrid>
      </PaneSectionRow>
      <PaneSectionRow>
        <InputNumber
          ref={inputRef}
          dxLabel={selectedOption?.label ?? "Nothing Selected"}
          disabled={!selectedOption?.value}
          value={
            selectedOption?.value
              ? globalOptions[selectedOption.value]
              : undefined
          }
          onChange={({ currentTarget: { value } }) => {
            if (!selectedOption?.value) return;
            setGlobalOptions((draft) => {
              // @ts-expect-error immer doesn't like dynamic values
              draft[selectedOption.value] = value !== "" ? Number(value) : 0;
            });
          }}
          dxSize="sm"
        />
      </PaneSectionRow>
    </>
  );
}
