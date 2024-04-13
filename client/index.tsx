import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { getClientStore } from "../store";
import App from "../pages";

const container = document.getElementById("root") as HTMLElement;

const { store, preloadedState } = getClientStore();

const Page = (
  <Provider store={store} serverState={preloadedState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

hydrateRoot(container, Page);
