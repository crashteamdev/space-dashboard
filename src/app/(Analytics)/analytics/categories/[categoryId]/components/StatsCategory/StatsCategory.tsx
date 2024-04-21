import React, { useEffect, useState } from "react";
import moment from "moment";
import { getAuth } from "@firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { StatsCategories } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { ChartLine } from "@/components/chartLine";
import { useLocalStorage } from "@uidotdev/usehooks";
import { marketplace } from "../../../statics";
import useDateRange from "@/hooks/useDateRange";

export const StatsCategory = (category: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<StatsCategories[]>([]);
    const auth = getAuth(firebase_app) as any;

    const [market] = useLocalStorage("market", marketplace[1]);
    const [periodDay] = useLocalStorage("period", "WEEK");

    const {startDate, endDate} = useDateRange(periodDay);

    useEffect(() => {
        const url = `https://api.marketdb.pro/gateway/external-analytics/categories/${category.category}/stats`;
        const fetchData = async () => {
            console.log(`?mp=${market}&startDate=${startDate}&endDate=${endDate}`);
            const response = await fetch(url + "?mp=KE&startDate=2024-04-14&endDate=2024-04-21", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${auth.currentUser.accessToken}`,
                    "X-Request-ID": uuidv4()
                }
            });
            const data = await response.json();
            setData(data);
            setLoading(false);
        };
        fetchData();
    }, [startDate, endDate]);

    if(loading) (
        <div>Загрузка...</div>
    );

    return (
        <div className="w-full max-w-[450px]">
            <ChartLine
                labels={data.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Выручка",
                        data: data.map((item: any) => item.revenue),
                        backgroundColor: "black"
                    }
                ]}
            />
            <ChartLine 
                labels={data.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Остатки",
                        data: data.map((item: any) => item.remainings),
                        backgroundColor: "black"
                    }
                ]}
            />
            <ChartLine 
                labels={data.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Средний чек",
                        data: data.map((item: any) => item.average_bill),
                        backgroundColor: "black"
                    }
                ]}
            />
            <ChartLine 
                labels={data.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Продажи, шт",
                        data: data.map((item: any) => item.sales),
                        backgroundColor: "black"
                    }
                ]}
            />
        </div>
    );
};