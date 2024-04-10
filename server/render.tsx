import express, { type Request, Response } from "express";
import React from "react";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import renderRoute from "../router";

const router = express.Router();

router.get("*", (req: Request, res: Response) => {
  if (req.url === "/favicon.ico") return res.end();
  render(req, res);
});

const render = (req: Request, res: Response) => {
  const html = renderToString(
    <StaticRouter location={req.url}>{renderRoute()}</StaticRouter>
  );
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate(html));
};

const renderStream = (req: Request, res: Response) => {
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
