import React from "react";
import renderRoute from "../router";
import withStyles from "isomorphic-style-loader/withStyles";
import css from "./index.less";

const App = () => {
  return renderRoute();
};

export default withStyles(css)(App);
