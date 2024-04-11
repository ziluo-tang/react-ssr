import express, { type Request, Response } from "express";
import React from "react";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { matchRoutes } from "react-router-dom";
import renderRoute, { routerConfig } from "../router";
// import StyleContext from 'isomorphic-style-loader/StyleContext'

const router = express.Router();

router.get("*", (req: Request, res: Response) => {
  render(req, res);
});

const render = async (req: Request, res: Response) => {
  await loadComponentProps(req);
  const html = renderToString(
    <Html assets={{ js: ["bundle.js"], css: ["index.css"] }}>
      <StaticRouter location={req.url}>{renderRoute()}</StaticRouter>
    </Html>
  );
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
};

const streamRender = async (req: Request, res: Response) => {
  await loadComponentProps(req);
  const stream = renderToPipeableStream(
    <div id="root">
      <StaticRouter location={req.url}>{renderRoute()}</StaticRouter>
    </div>,
    {
      bootstrapScripts: ["bundle.js"],
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

const loadComponentProps = (req: Request) => {
  const routes = matchRoutes(routerConfig, req.url);
  const initFns = routes?.map(({ route }) => {
    return (
      route.element?.type?.getServerSideProps ??
      route.component?.getServerSideProps ??
      (() => Promise.resolve({}))
    );
  });
  return Promise.all((initFns ?? []).map((fn) => fn()));
};

const Html = ({
  title = "React SSR",
  assets = {},
  children,
}: Partial<{
  title: string;
  assets: Partial<{ js: string[]; css: string[] }>;
  children: React.ReactElement;
}>) => {
  const { js, css } = assets;
  const script = js?.map((src) => <script src={src} key={src}></script>);
  const link = css?.map((href) => (
    <link href={href} rel="stylesheet" key={href}></link>
  ));
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="icon.png"></link>
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
