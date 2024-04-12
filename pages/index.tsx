import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderRoute from "../router";
import { Provider } from "react-redux";
import { getClientStore } from "../store";
import "./index.less";
const App = () => {
  const { store, preloadedState } = getClientStore();
  return (
    <Provider store={store} serverState={preloadedState}>
      <BrowserRouter>{renderRoute()}</BrowserRouter>
    </Provider>
  );
};

export default App;
