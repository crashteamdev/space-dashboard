import React from "react";
import dynamic from "next/dynamic";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { formatNumber } from "@/hooks/useFormatNumber";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const ChartCard = ({data, title, tooltipValue, formattedDates, subtitle, lastIndex}: any) => {
    const optionscolumnchart: any = {
        chart: {
            type: "area",
            foreColor: "#adb0bb",
            toolbar: {
                show: false,
            },
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: "sparklines",
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        fill: {
            colors: ["#E8F7FF"],
            type: "solid",
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        xaxis: {
            categories: formattedDates,
            tooltip: {
                enabled: false,
            }
        },
        enabled: true,
        tooltip: {
            enabled: true,
            custom: function({series, seriesIndex, dataPointIndex}: any) {
                const value = series[seriesIndex][dataPointIndex];
                return `
                    <div class="p-3 rounded-md flex flex-col gap-1 !z-[9999px]">
                        <span class="font-bold">${moment(formattedDates[dataPointIndex]).format("DD MMMM")}</span>
                        <span>${title}: ${formatNumber(value)} ${tooltipValue}</span>
                    </div>
                `;
            }
        }
    };
    const seriescolumnchart = [
        {
            name: "",
            color: "#3E4784",
            data: data,
        },
    ];
    return (
        <Card
            sx={{ 
                padding: 0, 
                boxShadow: "rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;",

            }}
            className="w-full"
        >
            <CardContent sx={{p: "15px"}}>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={"center"}
                    mb={3}
                >
                    <Box>
                        <Typography variant="h5">{title}</Typography>
                    </Box>
                </Stack>
                {subtitle &&
                    <Typography variant="subtitle2" fontWeight="500" mt="-20px">
                        {formatNumber(data.reduce((accumulator: number, current: number) => accumulator + current, 0))} {tooltipValue}
                    </Typography>
                }
                {lastIndex && 
                    <Typography variant="subtitle2" fontWeight="500" mt="-20px">
                        {data[data.length - 1]} {tooltipValue}
                    </Typography>
                }
            </CardContent>
            <Chart
                options={optionscolumnchart} 
                series={seriescolumnchart} 
                type="area" 
                height={100} 
                width={"100%"} 
            />
        </Card>
    );
};