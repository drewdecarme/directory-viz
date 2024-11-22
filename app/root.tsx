import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Layout as LayoutBody } from "~/components/Layout";
import { LayoutContent } from "./components/LayoutContent";
import { LayoutNav } from "./components/LayoutNav";
import { LayoutNavList } from "./components/LayoutNavList";
import { LayoutNavListItem } from "./components/LayoutNavListItem";
import { LayoutNavListItemNavLink } from "./components/LayoutNavListItemNavLink";
import { LayoutNavLogo } from "./components/LayoutNavLogo";
import { LayoutNavSection } from "./components/LayoutNavSection";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "/font/excalifont/stylesheet.css",
  },
  {
    rel: "stylesheet",
    href: "/font/baloo/stylesheet.css",
  },
];

const NodeEditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <title>node edit</title>
    <path
      d="M13 19.5H12C9.17157 19.5 7.75736 19.5 6.87868 18.6213C6 17.7426 6 16.3284 6 13.5V11.5M6 11.5V8M6 11.5H11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 19.5C13 18.3215 13 17.7322 13.3515 17.3661C13.7029 17 14.2686 17 15.4 17H16.6C17.7314 17 18.2971 17 18.6485 17.3661C19 17.7322 19 18.3215 19 19.5C19 20.6785 19 21.2678 18.6485 21.6339C18.2971 22 17.7314 22 16.6 22H15.4C14.2686 22 13.7029 22 13.3515 21.6339C13 21.2678 13 20.6785 13 19.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M4.28571 2H7.71429C9.7888 2 10 3.10993 10 5C10 6.89007 9.7888 8 7.71429 8H4.28571C2.2112 8 2 6.89007 2 5C2 3.10993 2.2112 2 4.28571 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M21.0058 5.38441L21.614 5.99021C22.1286 6.50276 22.1286 7.33376 21.6141 7.84631L18.4275 11.0799C18.1768 11.3296 17.8561 11.4979 17.5077 11.5627L15.5327 11.9898C15.2209 12.0572 14.9432 11.7814 15.01 11.4706L15.4304 9.5148C15.4955 9.1677 15.6645 8.84834 15.9151 8.59867L19.1423 5.38441C19.6569 4.87186 20.4912 4.87186 21.0058 5.38441Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DashboardSquare01Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <title>dashboard square</title>
    <path
      d="M2 18C2 16.4596 2 15.6893 2.34673 15.1235C2.54074 14.8069 2.80693 14.5407 3.12353 14.3467C3.68934 14 4.45956 14 6 14C7.54044 14 8.31066 14 8.87647 14.3467C9.19307 14.5407 9.45926 14.8069 9.65327 15.1235C10 15.6893 10 16.4596 10 18C10 19.5404 10 20.3107 9.65327 20.8765C9.45926 21.1931 9.19307 21.4593 8.87647 21.6533C8.31066 22 7.54044 22 6 22C4.45956 22 3.68934 22 3.12353 21.6533C2.80693 21.4593 2.54074 21.1931 2.34673 20.8765C2 20.3107 2 19.5404 2 18Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M14 18C14 16.4596 14 15.6893 14.3467 15.1235C14.5407 14.8069 14.8069 14.5407 15.1235 14.3467C15.6893 14 16.4596 14 18 14C19.5404 14 20.3107 14 20.8765 14.3467C21.1931 14.5407 21.4593 14.8069 21.6533 15.1235C22 15.6893 22 16.4596 22 18C22 19.5404 22 20.3107 21.6533 20.8765C21.4593 21.1931 21.1931 21.4593 20.8765 21.6533C20.3107 22 19.5404 22 18 22C16.4596 22 15.6893 22 15.1235 21.6533C14.8069 21.4593 14.5407 21.1931 14.3467 20.8765C14 20.3107 14 19.5404 14 18Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M2 6C2 4.45956 2 3.68934 2.34673 3.12353C2.54074 2.80693 2.80693 2.54074 3.12353 2.34673C3.68934 2 4.45956 2 6 2C7.54044 2 8.31066 2 8.87647 2.34673C9.19307 2.54074 9.45926 2.80693 9.65327 3.12353C10 3.68934 10 4.45956 10 6C10 7.54044 10 8.31066 9.65327 8.87647C9.45926 9.19307 9.19307 9.45926 8.87647 9.65327C8.31066 10 7.54044 10 6 10C4.45956 10 3.68934 10 3.12353 9.65327C2.80693 9.45926 2.54074 9.19307 2.34673 8.87647C2 8.31066 2 7.54044 2 6Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M14 6C14 4.45956 14 3.68934 14.3467 3.12353C14.5407 2.80693 14.8069 2.54074 15.1235 2.34673C15.6893 2 16.4596 2 18 2C19.5404 2 20.3107 2 20.8765 2.34673C21.1931 2.54074 21.4593 2.80693 21.6533 3.12353C22 3.68934 22 4.45956 22 6C22 7.54044 22 8.31066 21.6533 8.87647C21.4593 9.19307 21.1931 9.45926 20.8765 9.65327C20.3107 10 19.5404 10 18 10C16.4596 10 15.6893 10 15.1235 9.65327C14.8069 9.45926 14.5407 9.19307 14.3467 8.87647C14 8.31066 14 7.54044 14 6Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const UserCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <title>user circle</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM11.9916 6.25C10.1958 6.25 8.73808 7.70407 8.73808 9.5C8.73808 11.2959 10.1958 12.75 11.9916 12.75C13.7875 12.75 15.2452 11.2959 15.2452 9.5C15.2452 7.70407 13.7875 6.25 11.9916 6.25ZM17.0409 16.4802C14.3735 13.6002 9.57472 13.7487 6.96382 16.4756L6.77631 16.6631C6.63104 16.8084 6.55172 17.0069 6.55688 17.2123C6.56204 17.4177 6.65122 17.612 6.8036 17.7498C8.17769 18.9923 10.0013 19.75 12.0001 19.75C13.9989 19.75 15.8225 18.9923 17.1966 17.7498C17.349 17.612 17.4382 17.4177 17.4433 17.2123C17.4485 17.0069 17.3692 16.8084 17.2239 16.6631L17.0409 16.4802Z"
      fill="currentColor"
    />
  </svg>
);

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <LayoutBody>
        <LayoutNav>
          {/* Top Section */}
          <LayoutNavSection>
            <LayoutNavLogo
              dxLogoUrl="/directory-viz-logo-5-transparent.png"
              dxLogoAlt="logo"
            />
            <LayoutNavList>
              <LayoutNavListItem>
                <LayoutNavListItemNavLink dxRoute="/">
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
                <LayoutNavListItem>
                  <LayoutNavListItemNavLink dxRoute="/profile">
                    <UserCircleIcon />
                  </LayoutNavListItemNavLink>
                </LayoutNavListItem>
              </LayoutNavListItem>
            </LayoutNavList>
          </LayoutNavSection>
        </LayoutNav>
        <LayoutContent>{children}</LayoutContent>
        <ScrollRestoration />
        <Scripts />
      </LayoutBody>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
