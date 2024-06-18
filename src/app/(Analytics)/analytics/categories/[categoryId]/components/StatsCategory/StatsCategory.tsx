import React, { useEffect } from "react";
import { getAuth } from "@firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { ChartCard } from "@/components/chartLine";
import { useLocalStorage } from "@uidotdev/usehooks";
import { marketplace, period } from "../../../statics";
import useDateRange from "@/hooks/useDateRange";
import axios from "axios";
import {Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AppButton } from "@/shared/components/AppButton";
import clsx from "clsx";

export const StatsCategory = (category: any) => {
    const auth = getAuth(firebase_app) as any;

    const [market] = useLocalStorage("market", marketplace[1]);
    const [periodDay, setPeriodDay] = useLocalStorage("period", "WEEK");

    const {startDate, endDate} = useDateRange(periodDay);
    useEffect(() => {
        console.log(periodDay);
    }, [periodDay]);
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

    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ["statsCat", periodDay, startDate, endDate, category.category], 
        queryFn: getStatsCategory,
        // enabled: !!startDate && !!endDate,
        staleTime: 1000 * 60 * 10
    });

    const revenue = data?.map((item: any) => item.revenue);
    const remainings = data?.map((item: any) => item.remainings);
    const average_bill = data?.map((item: any) => item.average_bill);
    const sales = data?.map((item: any) => item.sales);
    const date = data?.map((item: any) => item.date);

    return (
        <>
            <div className="heading-layout">
                <div className="flex gap-3 justify-between">
                    <div className="flex gap-2 w-full">
                    {period.map((item, key) => (
                        <AppButton themeType="sorting" tag="button" key={key} onClick={() => setPeriodDay(item.period)} className={clsx("mdb-button-1", {
                            "mdb-button-1-active": periodDay === item.period
                        })}>
                            {item.text}
                        </AppButton>
                    ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-[20px] gap-5">
                {isLoading && (
                    [1,2,3,4].map((item, index) => (
                        <Skeleton key={index} variant="rectangular" height={181} />
                    ))
                )}
                {isError && (
                    <div>Ошибка загрузки данных!</div>
                )}
                {isSuccess && 
                    <>
                        <ChartCard
                            data={revenue || []}
                            title="Выручка"
                            tooltipValue={market.value === "KE" ? "₽" : "Сум"}
                            formattedDates={date}
                        />
                        <ChartCard
                            data={remainings || []}
                            title="Остатки, шт"
                            tooltipValue="шт"
                            formattedDates={date}
                        />
                        <ChartCard
                            data={average_bill || []}
                            title="Средний чек"
                            tooltipValue={market.value === "KE" ? "₽" : "Сум"}
                            formattedDates={date}
                        />
                        <ChartCard
                            data={sales || []}
                            title="Продаж, шт"
                            tooltipValue="шт"
                            formattedDates={date}
                        />
                    </>
                }
            </div>
        </>
    );
};