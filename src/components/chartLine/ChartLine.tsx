import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { externalTooltipHandler } from "./utils/externalTooltipHandler";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type IDatasets = {
    label: string,
    data: number[],
    backgroundColor: string
}

type IChartLine = {
    labels: string[],
    datasets: IDatasets[],
}

export const ChartLine = ({labels, datasets}: IChartLine) => {

    const options = {
        responsive: true,
        scales: {
            y: {
                grid: {
                    display: false, // Отключить горизонтальные линии сетки
                },
                ticks: {
                    tickFormat: {
                        prefix: "$",
                        notation: "compact",
                        useGrouping: true,
                    },
                },
            },
            x: {
                ticks: {
                    // callback: customXLabelCallback, // тут редактируется labels снизу
                    font: {
                        size: "10px",
                        weight: "bold",
                        style: "normal",
                    },
                },
            },
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        plugins: {
            tooltip: {
                enabled: false,
                position: "nearest",
                external: externalTooltipHandler,
            },
        },
    };

    const data = {
        labels,
        datasets
    };

    return (
        <Line options={options as any} data={data} />
    );
};