import express, { type Request, Response } from "express";
import React, { createElement } from "react";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { matchRoutes } from "react-router-dom";
import { readdirSync } from "fs";
import { join } from "path";
import App from "../pages";
import { routerConfig } from "../router";
import { Provider } from "react-redux";
import { getServerStore } from "../store";
// import StyleContext from 'isomorphic-style-loader/StyleContext'

const router = express.Router();

router.get("*", (req: Request, res: Response) => {
  streamRender(req, res);
});

const render = async (req: Request, res: Response) => {
  const { store } = getServerStore();
  const { js, css } = getBundleFromStatic();
  await loadComponentProps(req, store);
  const html = renderToString(
    <Html
      state={store.getState()}
      assets={{ js: ["vendor.js", "main.js"], css: ["index.css"] }}
    >
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    </Html>
  );
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
};

const streamRender = async (req: Request, res: Response) => {
  const { store } = getServerStore();
  const { js, css } = getBundleFromStatic();
  await loadComponentProps(req, store);
  const stream = renderToPipeableStream(
    <Html
      state={store.getState()}
      assets={{ js: ["vendor.js", "main.js"], css }}
    >
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    </Html>,
    {
      // bootstrapScripts: ["bundle.js"],
      onShellReady() {
        res.writeHead(200, { "Content-Type": "text/html" });
        stream.pipe(res);
      },
      onShellError(error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.send("<h1>ssr went wrong</h1>");
      },
    }
  );
};

const getBundleFromStatic = () => {
  const files = readdirSync(join(__dirname, "../client"));
  const js = files.filter((file) => file.endsWith(".js"));
  const css = files.filter((file) => file.endsWith(".css"));
  return { js, css };
};

const loadComponentProps = (req: Request, store) => {
  const routes = matchRoutes(routerConfig, req.url);
  const initFns =
    routes?.map(({ route }) => {
      return (
        route.element?.type?.getServerSideProps ??
        route.component?.getServerSideProps ??
        (() => Promise.resolve())
      );
    }) ?? [];
  return Promise.all(initFns.map((fn) => fn(store)));
};

const Html = ({
  title = "React SSR",
  assets = {},
  state,
  children,
}: Partial<{
  title: string;
  state: any;
  assets: Partial<{ js: string[]; css: string[] }>;
  children: React.ReactElement;
}>) => {
  const { js, css } = assets;
  const script = js?.map((src) => (
    <script src={src} key={src} defer={true}></script>
  ));
  const link = css?.map((href) => (
    <link href={href} rel="stylesheet" key={href}></link>
  ));
  state = `window._store_=${JSON.stringify(state)}`;
  script.unshift(
    createElement("script", {
      dangerouslySetInnerHTML: {
        __html: state,
      },
    })
  );
  return (
    <html lang="en">
      <head>
        <meta name="description" content="ssr" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="favicon.svg"></link>
        {link}
      </head>
      <body>
        <div id="root">{children}</div>
        {script}
      </body>
    </html>
  );
};

export default router;
