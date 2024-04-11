import express, { type Request, Response } from "express";
import React, { Component } from "react";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { matchRoutes } from "react-router-dom";
import renderRoute, { routerConfig } from "../router";

const router = express.Router();

router.get("*", (req: Request, res: Response) => {
  console.log(req.url, req.baseUrl);
  if (req.url === "/favicon.ico") return res.end();
  render(req, res);
});

const render = async (req: Request, res: Response) => {
  await loadComponentProps(req);
  const html = renderToString(
    <StaticRouter location={req.url}>{renderRoute()}</StaticRouter>
  );
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate(html));
};

const streamRender = (req: Request, res: Response) => {
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
      },
    }
  );
};

const loadComponentProps = (req: Request) => {
  const routes = matchRoutes(routerConfig, req.url);
  routes.forEach((route) => {
    route.route.component.getServerSideProps =
      route.route.component.getServerSideProps || (() => Promise.resolve({}));
  });
  return Promise.all(
    routes.map(({ route }) => route.component.getServerSideProps())
  );
};

function htmlTemplate(reactDom: string) {
  return `<!DOCTYPE html>
          <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>React SSR</title>
                <link href="index.css" rel="stylesheet">
            </head>
            <body>
                <div id="root">${reactDom}</div>
                <script src="bundle.js"></script>
            </body>
          </html>
      `;
}

export default router;
