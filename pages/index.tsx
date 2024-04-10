import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderRoute from "../router";
const App = () => {
  return <BrowserRouter>{renderRoute()}</BrowserRouter>;
};

export default App;
