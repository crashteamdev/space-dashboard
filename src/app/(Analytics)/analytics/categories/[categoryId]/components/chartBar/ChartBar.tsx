import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type IDatasets = {
    label: string,
    data: number[],
    backgroundColor: string
}

type IChartBar = {
    title: string;
    labels: string[],
    datasets: IDatasets[],
}

export const ChartBar = ({title, labels, datasets}: IChartBar) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: title ,
            },
        },
    };

    const data = {
        labels,
        datasets
    };
    return (
        <Bar options={options} data={data} />
    );
};