import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import useFetchTopCustomers from '../Hooks/useFetchTopCustomers';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InvoiceChart = () => {
  const { ytdInvoiceAmounts } = useFetchTopCustomers();

  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const currentYearData = ytdInvoiceAmounts[currentYear] || {};
  const previousYearData = ytdInvoiceAmounts[previousYear] || {};

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const currentYearInvoices = months.map((_, index) => currentYearData[index + 1] || 0);
  const previousYearInvoices = months.map((_, index) => previousYearData[index + 1] || 0);

  const data = {
    labels: months,
    datasets: [
      {
        label: previousYear,
        data: previousYearInvoices,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: currentYear,
        data: currentYearInvoices,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 9,
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
        position: 'top',
      },
    },
  };

  return (
    <div style={{ height: '200px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default InvoiceChart;