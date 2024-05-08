import axios from "axios";
import { isClient } from "../util/isServer";
import { message } from "antd";
const request = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: isClient
    ? {
        Authorization: localStorage.getItem("token"),
      }
    : {},
});

request.interceptors.response.use(
  (response) => {
    if(response.data.code!==1) throw Error(response.data.message)
    return response.data.data;
  },
  (error) => {
    console.log(error)
    const { response } = error;
    if (response?.status === 401 && isClient) {
      history.pushState(null, "", "/login");
    }
    message.error(response.error_msg || response.data.message);
    return Promise.reject(error);
  }
);

export default request;
