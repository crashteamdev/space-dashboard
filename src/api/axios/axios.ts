import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useAutoRefreshToken from "@/hooks/useСheckToken/useCheckToken";

export const axiosApi = axios.create({
    baseURL: process.env.API_ANALYTICS_URL || "https://api.marketdb.pro/"
});

axiosApi.interceptors.request.use(
    async (config) => {
        const token = await useAutoRefreshToken();
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["X-Request-ID"] = `${uuidv4()}`;
        return config;
    }
);

