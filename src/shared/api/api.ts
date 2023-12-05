import axios from "axios";
import firebase_app from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import useAutoRefreshToken from "@/hooks/useСheckToken/useCheckToken";

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use( async (config: any) => {
  const token = await useAutoRefreshToken()
  config.headers.Authorization = `Bearer ${ token }`
  config.headers['X-Request-ID'] = `${uuidv4()}`
  return config
})

export default axiosApiInstance;