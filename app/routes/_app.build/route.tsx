import { Outlet } from "@remix-run/react";
import { TabList } from "~/components/Tabs/TabList";
import { TabListItem } from "~/components/Tabs/TabListItem";
import { TabListItemNavLink } from "~/components/Tabs/TabListItemNavLink";
import { CanvasLayout } from "~/routes/_app.build/CanvasLayout";
import { CanvasLayoutMain } from "~/routes/_app.build/CanvasLayoutMain";
import { CanvasLayoutPaneLeft } from "~/routes/_app.build/CanvasLayoutPaneLeft";
import { CanvasLayoutPaneRight } from "~/routes/_app.build/CanvasLayoutPaneRight";
import { CanvasMain } from "~/routes/_app.build/CanvasMain";
import { CanvasPaneInput } from "~/routes/_app.build/CanvasPaneInput";
import { LayoutPaneHeader } from "~/routes/_app/LayoutPaneHeader";
import { DirectoryProvider } from "../../features/Directory/Directory.context";

export default function Build() {
  return (
    <DirectoryProvider>
      <CanvasLayout>
        <CanvasLayoutPaneLeft>
          <CanvasPaneInput />
        </CanvasLayoutPaneLeft>
        <CanvasLayoutMain>
          <CanvasMain />
        </CanvasLayoutMain>
        <CanvasLayoutPaneRight>
          <LayoutPaneHeader dxTitle="Properties" />
          <TabList>
            <TabListItem>
              <TabListItemNavLink to="/build" end>
                Global
              </TabListItemNavLink>
            </TabListItem>
            <TabListItem>
              <TabListItemNavLink to="/build/node">Node</TabListItemNavLink>
            </TabListItem>
            <TabListItem>
              <TabListItemNavLink to="/build/export">Export</TabListItemNavLink>
            </TabListItem>
          </TabList>
          <div>
            <Outlet />
          </div>
        </CanvasLayoutPaneRight>
      </CanvasLayout>
    </DirectoryProvider>
  );
}
