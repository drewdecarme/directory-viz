import type { MetaFunction } from "@remix-run/node";
import { LayoutContent } from "~/components/LayoutContent";
import { LayoutNav } from "~/components/LayoutNav";
import { CanvasLayout } from "~/features/Canvas/CanvasLayout";
import { CanvasLayoutMain } from "~/features/Canvas/CanvasLayoutMain";
import { CanvasLayoutPaneLeft } from "~/features/Canvas/CanvasLayoutPaneLeft";
import { CanvasLayoutPaneRight } from "~/features/Canvas/CanvasLayoutPaneRight";
import { CanvasMain } from "~/features/Canvas/CanvasMain";
import { CanvasPaneInput } from "~/features/Canvas/CanvasPaneInput";
import { CanvasPaneProperties } from "~/features/Canvas/CanvasPaneProperties";
import { DirectoryProvider } from "~/features/Canvas/Directory.context";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <DirectoryProvider>
      <LayoutNav />
      <LayoutContent>
        <CanvasLayout>
          <CanvasLayoutPaneLeft>
            <CanvasPaneInput />
          </CanvasLayoutPaneLeft>
          <CanvasLayoutMain>
            <CanvasMain />
          </CanvasLayoutMain>
          <CanvasLayoutPaneRight>
            <CanvasPaneProperties />
          </CanvasLayoutPaneRight>
        </CanvasLayout>
      </LayoutContent>
    </DirectoryProvider>
  );
}
