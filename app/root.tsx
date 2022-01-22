import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

import { createGlobalStyle } from "styled-components";
import { ColorProvider } from "./contexts/color";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0px;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans', sans-serif;
  }
`;

export const meta: MetaFunction = () => {
  return { title: "Orbidity" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" /> 
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <GlobalStyle />
        {typeof document === "undefined"
          ? "__STYLES__"
          : null}
      </head>
      <body>
        <ColorProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </ColorProvider>
      </body>
    </html>
  );
}
