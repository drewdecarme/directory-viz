import { Outlet } from "@remix-run/react";
import {
  DashboardSquare01Icon,
  NodeEditIcon,
  UserCircleIcon,
} from "~/icons/icons";
import { LayoutContent } from "~/routes/_app/LayoutContent";
import { LayoutNav } from "~/routes/_app/LayoutNav";
import { LayoutNavList } from "~/routes/_app/LayoutNavList";
import { LayoutNavListItem } from "~/routes/_app/LayoutNavListItem";
import { LayoutNavListItemNavLink } from "~/routes/_app/LayoutNavListItemNavLink";
import { LayoutNavLogo } from "~/routes/_app/LayoutNavLogo";
import { LayoutNavSection } from "~/routes/_app/LayoutNavSection";
import { Layout } from "./Layout";

export default function App() {
  return (
    <Layout>
      <LayoutNav>
        {/* Top Section */}
        <LayoutNavSection>
          <LayoutNavLogo
            dxLogoUrl="/directory-viz-logo-5-transparent.png"
            dxLogoAlt="logo"
          />
          <LayoutNavList>
            <LayoutNavListItem>
              <LayoutNavListItemNavLink dxRoute="/build">
                <NodeEditIcon />
              </LayoutNavListItemNavLink>
            </LayoutNavListItem>
            <LayoutNavListItem>
              <LayoutNavListItemNavLink dxRoute="/projects">
                <DashboardSquare01Icon />
              </LayoutNavListItemNavLink>
            </LayoutNavListItem>
          </LayoutNavList>
        </LayoutNavSection>

        {/* Bottom Section */}
        <LayoutNavSection>
          <LayoutNavList>
            <LayoutNavListItem>
              <LayoutNavListItemNavLink dxRoute="/profile">
                <UserCircleIcon />
              </LayoutNavListItemNavLink>
            </LayoutNavListItem>
          </LayoutNavList>
        </LayoutNavSection>
      </LayoutNav>
      <LayoutContent>
        <Outlet />
      </LayoutContent>
    </Layout>
  );
}
