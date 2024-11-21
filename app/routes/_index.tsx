import type { MetaFunction } from "@remix-run/node";
import { LayoutInput } from "~/components/LayoutInput";
import { LayoutOutput } from "~/components/LayoutOutput";
import { LayoutSideNav } from "~/components/LayoutSidenav";
import { LayoutTopNav } from "~/components/LayoutTopNav";
import { DirectoryProvider } from "~/features/Directory.context";
import { DirectoryCanvas } from "~/features/DirectoryCanvas";
import { DirectoryInput } from "~/features/DirectoryInput";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <DirectoryProvider>
      <LayoutTopNav>Directory Vis</LayoutTopNav>
      <LayoutSideNav>
        <DirectoryInput />
      </LayoutSideNav>
      <LayoutInput>input</LayoutInput>
      <LayoutOutput>
        <DirectoryCanvas />
      </LayoutOutput>
    </DirectoryProvider>
  );
}
