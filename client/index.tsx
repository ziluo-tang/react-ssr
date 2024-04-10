import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "../pages";

const container = document.getElementById("root") as HTMLElement;

const root = hydrateRoot(container, <App />);
