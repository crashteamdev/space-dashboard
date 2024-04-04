import React, { useEffect, useState } from "react";
import { ChartBar } from "../chartBar";
import moment from "moment";
import { getAuth } from "@firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { StatsCategories } from "../../types";
import { v4 as uuidv4 } from "uuid";

export const StatsCategory = (category: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<StatsCategories[]>([]);
    const auth = getAuth(firebase_app) as any;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.marketdb.pro/gateway/external-analytics/categories/${category.category}/stats?mp=KE&startDate=2024-03-20&endDate=2024-03-31`, {
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
    }, []);

    if(loading) (
        <div>Загрузка...</div>
    );

    return (
        <div className="w-full max-w-[450px]">
            <ChartBar 
                title="Выручка"
                labels={data.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Выручка",
                        data: data.map((item: any) => item.revenue),
                        backgroundColor: "black"
                    }
                ]}
            />
            <ChartBar 
                title="Остатки"
                labels={data.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Остатки",
                        data: data.map((item: any) => item.remainings),
                        backgroundColor: "black"
                    }
                ]}
            />
            <ChartBar 
                title="Средний чек"
                labels={data.map((item: any) => moment(item.date).format("YYYY-MM-DD"))}
                datasets={[
                    {
                        label: "Средний чек",
                        data: data.map((item: any) => item.average_bill),
                        backgroundColor: "black"
                    }
                ]}
            />
            <ChartBar 
                title="Средний чек"
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