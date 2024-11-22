import { PaneSection } from "~/components/PaneSection/PaneSection";
import { PaneSectionRow } from "~/components/PaneSection/PaneSectionRow";
import { InputSelect } from "~/components/inputs/InputSelect";
import { InputText } from "~/components/inputs/InputText";

export default function GlobalProperties() {
  return (
    <>
      <PaneSection dxTitle="Typography">
        <PaneSectionRow>
          <InputText dxSize="sm" />
        </PaneSectionRow>
        <PaneSectionRow>
          <InputSelect dxSize="sm" dxLabel="Font Family">
            <option>test</option>
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
