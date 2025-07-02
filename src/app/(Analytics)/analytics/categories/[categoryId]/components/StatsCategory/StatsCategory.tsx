import React from "react";
import { ChartCard } from "@/components/chartLine";
import { useLocalStorage } from "@uidotdev/usehooks";
import { marketplace, period } from "../../../statics";
import useDateRange from "@/hooks/useDateRange";
import {Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AppButton } from "@/shared/components/AppButton";
import clsx from "clsx";
import { axiosApi } from "@/api/axios/axios";

export const StatsCategory = (category: any) => {

    const [market] = useLocalStorage("market", marketplace[0]);
    const [periodDay, setPeriodDay] = useLocalStorage("period", "WEEK");

    const {startDate, endDate} = useDateRange(periodDay);

    const getStatsCategory = async () => {
        if (!startDate || !endDate) {
            return;
        }
        const url = `gateway/external-analytics/categories/${category.category}/stats?mp=${market.value}&startDate=${startDate}&endDate=${endDate}`;

        try {
            const response = await axiosApi.get<any>(url);
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