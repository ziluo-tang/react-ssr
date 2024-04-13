import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getClientStore } from "../store";
import StyleContext from "isomorphic-style-loader/StyleContext";
import App from "../pages";

const container = document.getElementById("root") as HTMLElement;

const { store, preloadedState } = getClientStore();

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

const Client = (
  <Provider store={store} serverState={preloadedState}>
    <StyleContext.Provider value={{ insertCss }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyleContext.Provider>
  </Provider>
);

hydrateRoot(container, Client);
