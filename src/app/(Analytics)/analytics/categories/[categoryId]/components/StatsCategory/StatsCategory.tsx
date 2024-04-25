import React from "react";
import moment from "moment";
import { getAuth } from "@firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { ChartLine } from "@/components/chartLine";
import { useLocalStorage } from "@uidotdev/usehooks";
import { marketplace } from "../../../statics";
import useDateRange from "@/hooks/useDateRange";
import axios from "axios";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export const StatsCategory = (category: any) => {
    const auth = getAuth(firebase_app) as any;

    const [market] = useLocalStorage("market", marketplace[1]);
    const [periodDay] = useLocalStorage("period", "WEEK");

    const {startDate, endDate} = useDateRange(periodDay);

    const headers = {
        "Authorization": `Bearer ${auth.currentUser.accessToken}`,
        "X-Request-ID": uuidv4()
    };

    const getStatsCategory = async () => {
        if (!startDate || !endDate) {
            return;
        }
        const url = `https://api.marketdb.pro/gateway/external-analytics/categories/${category.category}/stats?mp=${market.value}&startDate=${startDate}&endDate=${endDate}`;

        try {
            const response = await axios.get<any>(url, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch product stats");
        }
    };

    const { isLoading, isError, data } = useQuery({
        queryKey: ["statsCat"], 
        queryFn: getStatsCategory,
        enabled: !!startDate && !!endDate,
        staleTime: 1000 * 60 * 10
    });
    
    if(isError) {
        return (
            <Box sx={{ width: "100%", typography: "body1" }}>Не удалось загрузить данные</Box>
        );
    }

    if(isLoading) (
        <div>Загрузка...</div>
    );

    return (
        <div className="w-full max-w-[450px]">
            <ChartLine
                labels={data?.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Выручка",
                        data: data?.map((item: any) => item.revenue),
                        backgroundColor: "black"
                    }
                ]}
            />
            <ChartLine 
                labels={data?.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Остатки",
                        data: data?.map((item: any) => item.remainings),
                        backgroundColor: "black"
                    }
                ]}
            />
            <ChartLine 
                labels={data?.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Средний чек",
                        data: data?.map((item: any) => item.average_bill),
                        backgroundColor: "black"
                    }
                ]}
            />
            <ChartLine 
                labels={data?.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Продажи, шт",
                        data: data?.map((item: any) => item.sales),
                        backgroundColor: "black"
                    }
                ]}
            />
        </div>
    );
};