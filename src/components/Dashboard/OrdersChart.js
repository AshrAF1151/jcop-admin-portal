import React from "react";
import { Bar } from "react-chartjs-2";
import useFetchOrderSummary from "../Hooks/useFetchOrderSummary";

const OrdersChart = ({ selectedFilter }) => {
  const { ordersData, loadingOrders } = useFetchOrderSummary();

  const chartData = () => {
    const data =
      selectedFilter === "month"
        ? ordersData.last7Months
        : selectedFilter === "week"
        ? ordersData.last7Weeks
        : ordersData.last7Days;

    return {
      labels: data.map((item) => {
        if (selectedFilter === "month") return item.Month;
        if (selectedFilter === "week")
          return `Week ${item.WeekNumber}, ${item.Year}`;
        return new Date(item.Day).toLocaleDateString();
      }),
      datasets: [
        {
          label: "Total Orders",
          data: data.map((item) => item.TotalOrders),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: () => {
            const data =
              selectedFilter === "month"
                ? ordersData.last7Months
                : selectedFilter === "week"
                ? ordersData.last7Weeks
                : ordersData.last7Days;

            const maxOrder = Math.max(...data.map((item) => item.TotalOrders));
            const minOrder = Math.min(...data.map((item) => item.TotalOrders));
            const range = maxOrder - minOrder;

            return range > 0 ? Math.ceil(range / 5) : 1;
          },
          font: {
            size: 9,
          },
        },
        suggestedMax: () => {
          const data =
            selectedFilter === "month"
              ? ordersData.last7Months
              : selectedFilter === "week"
              ? ordersData.last7Weeks
              : ordersData.last7Days;

          const maxOrder = Math.max(...data.map((item) => item.TotalOrders));
          return maxOrder + 1;
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return <Bar data={chartData()} options={chartOptions} />;
};

export default OrdersChart;