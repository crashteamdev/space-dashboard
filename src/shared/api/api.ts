import axios from "axios";
import firebase_app from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use((config: any) => {

  const url = config.url;
  // console.log(token, url)
  // config.headers.Authorization = `Bearer ${token}`;
  config.headers["X-Request-ID"] = `${uuidv4()}`;

  return config;
})

export default axiosApiInstance;