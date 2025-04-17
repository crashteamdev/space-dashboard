import { axiosApi } from "../axios/axios";

export const getDemoAccess = async (token: string): Promise<boolean> => {
    try {
        const response = await axiosApi.get("/demo", {
            params: { id: token }
        });

        return response.status === 200;
    } catch (error) {
        console.error("Error getting demo access:", error);
        return false;
    }
};
