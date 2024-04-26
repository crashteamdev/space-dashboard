/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        // Форматирование сумм по оси Y для сокращения и добавления интервалов
        callback: function(value) {
          return value / 1e6 + "M"; // Преобразование в миллионы, например
        },
      },
    },
    x: {
    //   type: "time",
      time: {
        // Форматирование оси X для отображения дат
        tooltipFormat: "DD.MM",
        displayFormats: {
          day: "DD.MM",
          month: "MMMM",
        },
      },
      ticks: {
        // Обеспечивает отображение названия месяца при смене
        callback: function(value, index, values) {
          const firstMonth = values[0].parsed.x.getMonth();
          const month = values[index].parsed.x.getMonth();
          const prevMonth = values[index - 1] ? values[index - 1].parsed.x.getMonth() : firstMonth;
          if (month !== prevMonth) {
            return ChartJS.Ticks.formatters.month(new Date(0, month), 0);
          }
          return value;
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
  },
  elements: {
    line: {
      tension: 0.5, // Сглаживание линии
    },
  },
};

// Пример данных
const labels = ["22 Марта", "23 Марта", "24 Марта", /* ... все даты ... */ "21 Апреля"];

const data = {
  labels,
  datasets: [
    {
      label: "Выручка по заказам",
      data: labels.map(() => Math.random() * 1000000), // Здесь должны быть ваши данные
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
    // ... другие наборы данных
  ],
};

// Градиент можно добавить с помощью функции генерации градиента
const getGradient = (ctx: any, chartArea: any) => {
  const { top, bottom } = chartArea;
  const gradient = ctx.createLinearGradient(0, top, 0, bottom);
  gradient.addColorStop(0, "rgba(255, 0, 0, 0.5)");
  gradient.addColorStop(1, "rgba(0, 0, 255, 0.5)");
  return gradient;
};

// Обновление графика перед его отрисовкой для использования градиента
const beforeDraw = (chart: any) => {
  const { ctx, chartArea } = chart;
  if (!chartArea) {
    return;
  }
  chart.data.datasets.forEach((dataset: any) => {
    if (dataset.type === "line") {
      ctx.save();
      dataset.backgroundColor = getGradient(ctx, chartArea);
      ctx.restore();
    }
  });
};

const MyChart = () => {
  return <Line options={options} data={data} plugins={[{ beforeDraw: beforeDraw }]} />;
};

export default MyChart;
