import React from "react";
import { Bar } from "react-chartjs-2";
import useFetchTopCategories from "../Hooks/useFetchTopCategories";

const CategoryChart = () => {

    const { topCategories } =
    useFetchTopCategories();

    const categoryLabels = topCategories.map((category) => category.category);
  const categoryData = topCategories.map(
    (category) => category.totalQuantitySold
  );

  const data = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Total Quantity Sold",
        data: categoryData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 7,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 9,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        display: true,
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

  return <Bar data={data} options={options} />;
};

export default CategoryChart;