import { useState, useEffect } from 'react';

const useFetchOrderSummary = () => {
  const [ordersData, setOrdersData] = useState({
    last7Months: [],
    last7Weeks: [],
    last7Days: [],
  });
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [salesmen, setSalesmen] = useState([]);
  const [salesArea, setSalesArea] = useState([]);
  const [topSalesman, setTopSalesman] = useState([]);
  const [selectedSalesman, setSelectedSalesman] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    const fetchOrdersData = async () => {
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
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
          console.log("Salesmen Data: ", salesmen);
          setLoadingOrders(false);
        }
      } catch (error) {
        console.error("Error fetching orders data:", error);
        setLoadingOrders(false);
      }
    };

    fetchOrdersData();
    // eslint-disable-next-line
  }, [selectedSalesman, selectedArea]);

  return { ordersData, loadingOrders, salesmen, salesArea, topSalesman, setSelectedSalesman, setSelectedArea, selectedArea, selectedSalesman };
};

export default useFetchOrderSummary;