import moment from "moment";
import { useState, useEffect } from "react";

const useDateRange = (periodDay: string) => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    useEffect(() => {
        switch (periodDay) {
            case "WEEK":
                setStartDate(moment().subtract(7, "days").format("YYYY-MM-DD"));
                setEndDate(moment().format("YYYY-MM-DD"));
                break;
            case "TWO_WEEK":
                setStartDate(moment().subtract(14, "days").format("YYYY-MM-DD"));
                setEndDate(moment().format("YYYY-MM-DD"));
                break;
            case "MONTH":
                setStartDate(moment().subtract(30, "days").format("YYYY-MM-DD"));
                setEndDate(moment().format("YYYY-MM-DD"));
                break;
            case "TWO_MONTH":
                setStartDate(moment().subtract(60, "days").format("YYYY-MM-DD"));
                setEndDate(moment().format("YYYY-MM-DD"));
                break;
            default:
                break;
        }
    }, [periodDay]);

    return { startDate, endDate };
};

export default useDateRange;
