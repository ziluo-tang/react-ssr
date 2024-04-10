import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import renderRoute from "../router";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>{renderRoute()}</Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
