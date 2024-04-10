import { type Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import renderRoute from "../router";

export const render = (req: Request, res: Response) => {
  const html = renderToString(
    <StaticRouter location={req.url}>{renderRoute()}</StaticRouter>
  );
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate(html));
};

function htmlTemplate(reactDom: string) {
  return `<!DOCTYPE html>
          <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>React SSR</title>
            </head>
            <body>
                <div id="root">${reactDom}</div>
                <script src="/bundle.js"></script>
            </body>
          </html>
      `;
}
