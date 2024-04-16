import express from "express";
import compression from "compression";
import dashboard from "./dashboard";
import user from "./user";
import render from "./render";

const app = express();

app.use(compression());
app.use(express.static("dist/client"));

app.use("/api/dashboard", dashboard);
app.use("/api/user", user);
app.use(render);

app.listen(8000, () => {
  console.log("server is running, visit: http://localhost:8000");
});
