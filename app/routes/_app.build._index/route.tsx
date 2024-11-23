import { type ChangeEventHandler, useCallback } from "react";
import { PaneSection } from "~/components/PaneSection/PaneSection";
import { PaneSectionRow } from "~/components/PaneSection/PaneSectionRow";
import { InputSelect } from "~/components/inputs/InputSelect";
import { InputText } from "~/components/inputs/InputText";
import {
  type NodeFontFamilyNames,
  nodeFontFamilies,
  useDirectoryContext,
} from "~/features/Directory/Directory.context";

export default function GlobalProperties() {
  const { setGlobalOptions, globalOptions } = useDirectoryContext();

  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ currentTarget }) => {
      setGlobalOptions((draft) => {
        draft.NODE_FONT_FAMILY = currentTarget.value as NodeFontFamilyNames;
      });
    },
    [setGlobalOptions]
  );

  return (
    <>
      <PaneSection dxTitle="Typography">
        <PaneSectionRow>
          <InputText dxSize="sm" />
        </PaneSectionRow>
        <PaneSectionRow>
          <InputSelect
            dxSize="sm"
            dxLabel="Font Family"
            onChange={handleChange}
            defaultValue={globalOptions.NODE_FONT_FAMILY}
          >
            {Object.keys(nodeFontFamilies).map((fontFamily) => (
              <option key={fontFamily} value={fontFamily}>
                {fontFamily}
              </option>
            ))}
          </InputSelect>
        </PaneSectionRow>
      </PaneSection>
      <PaneSection dxTitle="Iconography">icons</PaneSection>
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
