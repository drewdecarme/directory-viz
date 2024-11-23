import { type ChangeEventHandler, useCallback } from "react";
import { PaneSection } from "~/components/PaneSection/PaneSection";
import { PaneSectionRow } from "~/components/PaneSection/PaneSectionRow";
import { InputColor } from "~/components/inputs/InputColor";
import { InputNumber } from "~/components/inputs/InputNumber";
import { InputSelect } from "~/components/inputs/InputSelect";
import {
  nodeFontFamilies,
  nodeFontWeights,
  useDirectoryContext,
} from "~/features/Directory/Directory.context";

export default function GlobalProperties() {
  const { setGlobalOptions, globalOptions } = useDirectoryContext();

  const handleChange = useCallback<
    (
      value: keyof typeof globalOptions,
      type?: "string" | "number"
    ) => ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
  >(
    (key, type = "string") =>
      ({ currentTarget }) => {
        let value: number | string;
        switch (type) {
          case "number":
            value = Number(currentTarget.value);
            break;

          case "string":
            value = String(currentTarget.value);
            break;

          default:
            break;
        }
        setGlobalOptions((draft) => {
          // @ts-expect-error immer doesn't like dynamic keys
          draft[key as keyof typeof globalOptions] = value;
        });
      },
    [setGlobalOptions]
  );

  return (
    <>
      <PaneSection dxTitle="Typography">
        {/* Font Family */}
        <PaneSectionRow>
          <InputSelect
            dxSize="sm"
            dxLabel="Font Family"
            onChange={handleChange("NODE_FONT_FAMILY")}
            defaultValue={globalOptions.NODE_FONT_FAMILY}
          >
            {Object.keys(nodeFontFamilies).map((fontFamily) => (
              <option key={fontFamily} value={fontFamily}>
                {fontFamily}
              </option>
            ))}
          </InputSelect>
        </PaneSectionRow>
        <PaneSectionRow dxInline="fill-row">
          {/* Font Weight */}
          <InputSelect
            dxSize="sm"
            dxLabel="Font Weight"
            onChange={handleChange("NODE_FONT_WEIGHT")}
            defaultValue={globalOptions.NODE_FONT_WEIGHT}
          >
            {Object.keys(nodeFontWeights).map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </InputSelect>
          {/* Font Size */}
          <InputNumber
            dxSize="sm"
            dxLabel="Font Size"
            onChange={handleChange("NODE_FONT_SIZE", "number")}
            defaultValue={globalOptions.NODE_FONT_SIZE}
          />
        </PaneSectionRow>
        {/* Font Color */}
        <PaneSectionRow>
          <InputColor
            dxSize="sm"
            dxLabel="Font Color"
            onChange={handleChange("NODE_FONT_COLOR", "string")}
            defaultValue={globalOptions.NODE_FONT_COLOR}
          />
        </PaneSectionRow>
      </PaneSection>
      <PaneSection dxTitle="Iconography">
        {/* Icon Size */}
        <InputNumber
          dxSize="sm"
          dxLabel="Icon Size"
          onChange={handleChange("NODE_ICON_DIMENSION", "number")}
          defaultValue={globalOptions.NODE_ICON_DIMENSION}
        />
      </PaneSection>
      <PaneSection dxTitle="Styles">
        <PaneSectionRow>
          <InputSelect dxSize="sm">
            <option>test</option>
          </InputSelect>
        </PaneSectionRow>
      </PaneSection>
    </>
  );
}
