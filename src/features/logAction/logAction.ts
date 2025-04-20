import axios from "axios";

export const LogAction = async (
    text: string
) => {
    await axios.post("/api/sendMessage", {
        text 
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    });
};