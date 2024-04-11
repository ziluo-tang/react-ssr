import express from "express";
import render from "./render";

const app = express();

app.use(express.static("dist/client"));

app.get("/favicon.ico", (req, res) => res.status(200).end());

app.use(render);

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
