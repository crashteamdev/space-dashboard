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
        queryKey: ["statsCat", periodDay, startDate, endDate], 
        queryFn: getStatsCategory,
        // enabled: !!startDate && !!endDate,
        staleTime: 1000 * 60 * 10
    });

    const revenue = data?.map((item: any) => item.revenue);
    const remainings = data?.map((item: any) => item.remainings);
    const average_bill = data?.map((item: any) => item.average_bill);
    const sales = data?.map((item: any) => item.sales);

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
            <div className="flex gap-5 mt-[20px]">
                {isLoading && (
                    [1,2,3,4].map((item, index) => (
                        <Skeleton key={index} variant="rectangular" height={181} width={350} />
                    ))
                )}
                {isError && (
                    [1,2,3,4].map((item, index) => (
                        <div key={index}>Не удалось загрузить данные.</div>
                    ))
                )}
                {isSuccess && 
                    <>
                        <ChartCard
                            data={revenue || []}
                            title="Выручка"
                            tooltipValue={market.value === "KE" ? "₽" : "Сум"}
                        />
                        <ChartCard
                            data={remainings || []}
                            title="Остатки, шт"
                            tooltipValue="шт"
                        />
                        <ChartCard
                            data={average_bill || []}
                            title="Средний чек"
                            tooltipValue={market.value === "KE" ? "₽" : "Сум"}
                        />
                        <ChartCard
                            data={sales || []}
                            title="Продаж, шт"
                            tooltipValue="шт"
                        />
                    </>
                }
            </div>
        </>
    );
};