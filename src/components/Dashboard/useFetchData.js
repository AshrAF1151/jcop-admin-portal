import { useState } from "react";

export const useFetchData = () => {
  const [topCustomers, setTopCustomers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [lastMonthSale, setLastMonthSale] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedSalesman, setSelectedSalesman] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("month");
  const [selectedArea, setSelectedArea] = useState("");
  const [totalActiveItems, setTotalActiveItems] = useState(true);
  const [totalActiveCustomers, setTotalActiveCustomers] = useState(true);
  const [loadingTopCustomers, setLoadingTopCustomers] = useState(true);
  const [loadingTopProducts, setLoadingTopProducts] = useState(true);
  const [loadingTopCategories, setLoadingTopCategories] = useState(true);
  const [salesmen, setSalesmen] = useState([]);
  const [salesArea, setSalesArea] = useState([]);
  const [topSalesman, setTopSalesman] = useState([]);
  const [ordersData, setOrdersData] = useState({
    last7Months: [],
    last7Weeks: [],
    last7Days: [],
  });

  const fetchOrdersData = async (selectedSalesman = "", selectedArea = "") => {
    try {
      setLoadingOrders(true);
      const response = await fetch("https://apis.joonbeauty.com:550/ordersummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salesmanName: selectedSalesman,
          areaName: selectedArea,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.success) {
        setSalesmen(data.distinctSalesmen);
        setSalesArea(data.saleArea);
        setTopSalesman(data.topSalesman);
        setOrdersData({
          last7Months: data.last7Months,
          last7Weeks: data.last7Weeks,
          last7Days: data.last7Days,
        });
      }
      setLoadingOrders(false);
    } catch (error) {
      console.error("Error fetching orders data:", error);
      setLoadingOrders(false);
    }
  };

  const fetchTopCustomers = async () => {
    try {
      const response = await fetch("https://apis.joonbeauty.com:550/topcustomers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.success) {
        setTopCustomers(data.customers);
      }
    } catch (error) {
      console.error("Error fetching top customers:", error);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const response = await fetch("https://apis.joonbeauty.com:550/topproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.success) {
        setTopProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching top products:", error);
    }
  };

  const fetchTopCategories = async () => {
    try {
      const response = await fetch("https://apis.joonbeauty.com:550/topcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.success) {
        setTopCategories(data.categories || []);
      }
    } catch (error) {
      console.error("Error fetching top categories:", error);
    }
  };

  const fetchLastMonthSale = async () => {
    try {
      const response = await fetch("https://apis.joonbeauty.com:550/lastmonthsales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.success) {
        setLastMonthSale(data.sales || []);
      }
    } catch (error) {
      console.error("Error fetching last month sales:", error);
    }
  };

  const fetchPendingOrders = async () => {
    try {
      const response = await fetch("https://apis.joonbeauty.com:550/pendingorderslastmonth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.success) {
        setPendingOrders(data || []);
      }
    } catch (error) {
      console.error("Error fetching pending orders:", error);
    }
  };

  return {
    topCustomers,
    topProducts,
    topCategories,
    lastMonthSale,
    pendingOrders,
    loadingOrders,
    salesmen,
    salesArea,
    topSalesman,
    ordersData,
    fetchOrdersData,
    fetchTopCustomers,
    fetchTopProducts,
    fetchTopCategories,
    fetchLastMonthSale,
    fetchPendingOrders,
    selectedSalesman,
    setSelectedSalesman,
    selectedArea,
    setSelectedArea,
    totalActiveItems,
    setTotalActiveItems,
    totalActiveCustomers,
    setTotalActiveCustomers,
    loadingTopCustomers,
    setLoadingTopCustomers,
    loadingTopProducts,
    setLoadingTopProducts,
    loadingTopCategories,
    setLoadingTopCategories,
    selectedFilter,
    setSelectedFilter
  };
};