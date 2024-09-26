import React, { useState } from "react";
import Spinner from "../spinner";
import InvoiceChart from "./InvoiceChart";
import { Bar } from "react-chartjs-2";
import RecentOrders from "./RecentOrders";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import useFetchTopCustomers from "../Hooks/useFetchTopCustomers";
import useFetchTopProducts from "../Hooks/useFetchTopProducts";
import useFetchOrderSummary from "../Hooks/useFetchOrderSummary";
import useFetchTopCategories from "../Hooks/useFetchTopCategories";
//import OrdersChart from "./OrdersChart";
import CategoryChart from "./CategoryChart";
import CardsSection from "./CardsSection";
import "./Dashboard.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const { topCustomers, loadingTopCustomers } = useFetchTopCustomers();
  const { topProducts, loadingTopProducts } = useFetchTopProducts();
  const { loadingTopCategories } = useFetchTopCategories();
  const [selectedFilter, setSelectedFilter] = useState("month");
  const {
    loadingOrders,
    salesmen,
    salesArea,
    setSelectedSalesman,
    setSelectedArea,
    selectedArea,
    selectedSalesman,
    ordersData,
  } = useFetchOrderSummary();

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

            return range > 0 ? range / 5 : 1;
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

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleChange = (event) => {
    setSelectedSalesman(event.target.value);
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  return (
    <div className="container mx-auto mt-6 lg:px-4 px-1 justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Dashboard</h1>

      <div className="lg:flex">
        <div className="flex-1" style={{ flex: "0 0 70%" }}>
          <CardsSection />
        </div>
        <div className="flex-1 lg:ml-2 mb-2" style={{ flex: "0 0 30%" }}>
          <RecentOrders />
        </div>
      </div>

      {/* Dropdown Filter */}
      <div className="flex items-center ml-1">
        <select
          className="border border-gray-200 rounded py-1 mr-2"
          value={selectedFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>
        <select
          id="salesmenSelect"
          className="border border-gray-200 rounded py-1 mr-2"
          value={selectedSalesman}
          onChange={handleChange}
        >
          <option value="">All Salesmen</option>
          {salesmen.map((salesman, index) => {
            const Name = salesman.Name;
            const displayValue =
              typeof Name === "string" || typeof Name === "number"
                ? Name
                : "Unknown";

            return (
              <option key={index} value={displayValue}>
                {displayValue}
              </option>
            );
          })}
        </select>
        <select
          id="salesmenSelect"
          className="border border-gray-200 rounded py-1"
          value={selectedArea}
          onChange={handleAreaChange}
        >
          <option value="">All Areas</option>
          {salesArea.map((salesArea, index) => {
            const Name = salesArea.Name;
            const displayValue =
              typeof Name === "string" || typeof Name === "number"
                ? Name
                : "Unknown";

            return (
              <option key={index} value={displayValue}>
                {displayValue}
              </option>
            );
          })}
        </select>
        <hr className="flex-grow border-gray-200 border-t-1 ml-2 rounded-lg"/>
      </div>

      {/* Charts Section */}
      <div className="lg:flex mb-5">
        {/* Orders Overview Chart */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-2 border border-gray-200 mt-1">
          <h2 className="text-xl font-semibold text-white mb-1 bg-[#192841] py-1 px-1">
            Orders Overview (
            {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)})
          </h2>
          <div className="">
            {loadingOrders ? (
              <Spinner />
            ) : (
              <Bar data={chartData()} options={chartOptions} />
            )}
          </div>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-lg p-2 ml-2 border border-gray-200 mt-1">
          <h2 className="text-xl font-semibold text-white mb-1 bg-[#192841] py-1 px-1">
            Top Categories / Year
          </h2>
          <div className="">
            {loadingTopCategories ? <Spinner /> : <CategoryChart />}
          </div>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-lg p-2 ml-2 border border-gray-200 mt-1">
          <h2 className="text-xl font-semibold text-white mb-1 bg-[#192841] py-1 px-1">
            Invoices Comparison Chart
          </h2>
          <div className="">
            <InvoiceChart />
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="lg:flex mb-6">
        {/* Top Customer Table */}
        <div className="flex-1 bg-white shadow-md lg:mr-2 border border-gray-200">
          <h2 className="text-xl font-semibold text-white bg-[#192841] py-1 px-1">
            Top Customers / Year
          </h2>
          {loadingTopCustomers ? (
            <Spinner />
          ) : (
            <div className="min-w-full overflow-x-auto">
              <table className="min-w-full divide-gray-200 table-container">
                <thead className="table-header">
                  <tr>
                    <th className="text-left text-xs font-medium">CustNum</th>
                    <th className="text-left text-xs font-medium">
                      Customer Name
                    </th>
                    <th className="text-left text-xs font-medium">
                      Phone Number
                    </th>
                    <th className="text-left text-xs font-medium">Address</th>
                    <th className="text-left text-xs font-medium">
                      Total Amount Purchased
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body text-xs">
                  {(topCustomers || []).map((customer) => (
                    <tr key={customer.custNum}>
                      <td>{customer.custNum}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.phoneNumber}</td>
                      <td className="relative">
                        <div className="truncate text-ellipsis overflow-hidden w-32 hover:w-auto">
                          {customer.address}
                        </div>
                        <div className="absolute inset-0 bg-gray-200 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs p-2">
                            {customer.address}
                          </span>
                        </div>
                      </td>
                      <td>${customer.totalAmountPurchased.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Selling Products Table */}
        <div className="flex-1 bg-white shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-white bg-[#192841] py-1 px-1">
            Top Selling Products / Year
          </h2>
          {loadingTopProducts ? (
            <Spinner />
          ) : (
            <div className="min-w-full overflow-x-auto">
              <table className="min-w-full divide-gray-200 table-container">
                <thead className="table-header">
                  <tr>
                    <th className="text-left text-xs font-medium">
                      Product ID
                    </th>
                    <th className="text-left text-xs font-medium">
                      Product Name
                    </th>
                    <th className="text-left text-xs font-medium">Price</th>
                    <th className="text-left text-xs font-medium">Brand</th>
                    <th className="text-left text-xs overflow-hidden">
                      Total Quantity Sold
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body text-xs">
                  {(topProducts || []).map((product) => (
                    <tr key={product.itemNum}>
                      <td>{product.itemNum}</td>
                      <td>{product.itemName}</td>
                      <td>${product.price}</td>
                      <td className="relative">
                        <div className="truncate text-ellipsis overflow-hidden w-24 hover:w-auto">
                          {product.itemBrand}
                        </div>
                        <div className="absolute inset-0 bg-gray-200 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs p-2">
                            {product.itemBrand}
                          </span>
                        </div>
                      </td>
                      <td>${product.totalQuantitySold.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
