import express from "express";
import render from "./render";
import compression from "compression";

const app = express();

// app.use(compression());
app.use(express.static("dist/client"));

app.use(render);

app.listen(8000, () => {
  console.log("server is running, visit: http://localhost:8000");
});
