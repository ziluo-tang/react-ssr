import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";

const reducer = { user: userReducer };

const getClientStore = () => {
  const preloadedState = window._store_ ?? {};
  return {
    preloadedState,
    store: configureStore({
      preloadedState,
      //@ts-ignore
      reducer,
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
