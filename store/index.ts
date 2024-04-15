import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import dashboardReducer from "./dashboard";
import userReducer from "./user";

const reducer = { dashboard: dashboardReducer, user: userReducer };

const getClientStore = () => {
  const preloadedState = window._store_ ?? {};
  return {
    preloadedState,
    store: configureStore({
      preloadedState,
      //@ts-ignore
      reducer,
      middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(logger);
      },
    }),
  };
};

const getServerStore = () => {
  return {
    store: configureStore({
      reducer,
    }),
  };
};

export { getClientStore, getServerStore };
