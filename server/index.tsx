import express, { type Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import renderRoute from "../router";
import { Routes } from "react-router-dom";

const app = express();

app.use(express.static("dist/client"));

app.get("*", (req: Request, res: Response) => {
  if (req.url === "/favicon.ico") return res.end();
  const html = renderToString(
    <StaticRouter location={req.url}>
      <Routes>{renderRoute()}</Routes>
    </StaticRouter>
  );
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate(html));
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});

function htmlTemplate(reactDom: string) {
  return `<!DOCTYPE html>
      <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React SSR</title>
        </head>
        <body>
            <div id="app">${reactDom}</div>
            <script src="/bundle.js"></script>
        </body>
      </html>
  `;
}
