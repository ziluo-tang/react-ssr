import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderRoute from "../router";
import './index.less'
const App = () => {
  return <BrowserRouter>{renderRoute()}</BrowserRouter>;
};

export default App;
