import express, { type Request, Response } from "express";
import { render } from "./render";

const app = express();

app.use(express.static("dist/client"));

app.get("/*", (req: Request, res: Response) => {
  if (req.url === "/favicon.ico") return res.end();
  render(req, res);
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
