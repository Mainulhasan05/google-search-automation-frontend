import axios from "axios";
import Cookies from "js-cookie";
// create a common axios instance
const instance = axios.create({
  baseURL: process.env.API,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default instance;
