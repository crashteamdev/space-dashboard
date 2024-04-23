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
                    // Форматирование сумм по оси Y для сокращения и добавления интервалов
                    callback: function(value: any, index: any, values: any) {
                      // Определите максимальное значение на оси Y
                      const maxVal = Math.max(...values.map((tick: any) => tick.value));
                      // Определяем порядок максимального значения (для миллионов, миллиардов и т.д.)
                      const order = Math.floor(Math.log(maxVal) / Math.log(1000));
              
                      // Форматируем значение в зависимости от его порядка
                      const unitNames = ["", "тыс", "млн", "млрд"]; // Список единиц измерения
                      const divisor = Math.pow(1000, order);
                      const unitName = unitNames[order];
              
                      // Форматирование значения с учётом порядка и соответствующей единицы измерения
                      return (value / divisor).toLocaleString(undefined, { maximumFractionDigits: 0 }) + " " + unitName;
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
        elements: {
            line: {
              tension: 0.5, // Сглаживание линии
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