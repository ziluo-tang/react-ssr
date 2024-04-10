import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "../pages";

const container = document.getElementById("root") as HTMLElement;

const root = hydrateRoot(container, <></>);

root.render(<App />);
