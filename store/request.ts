import axios from "axios";
import { isClient } from "../util/isServer";

const request = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: isClient
    ? {
        Authorization: localStorage.getItem("token"),
      }
    : {},
});
request.interceptors.response.use((response) => {
  return response.data;
});

export default request;
