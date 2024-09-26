import { useState, useEffect } from 'react';

const useFetchLastMonthSales = () => {
    const [lastMonthSale, setLastMonthSale] = useState([]);
    const [loadingLastMonthSale, setLoadingLastMonthSale] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchLastMonthSale = async () => {
        try {
          const response = await fetch("https://apis.joonbeauty.com:550/lastmonthsales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          if (data.success) {
            setLastMonthSale(data.sales || []);
          }
        } catch (error) {
          console.error("Error fetching last month sales:", error);
          setError(error);
        } finally {
          setLoadingLastMonthSale(false);
        }
      };
  
      fetchLastMonthSale();
    }, []);
  
    return { lastMonthSale, loadingLastMonthSale, error };
  };
  
  export default useFetchLastMonthSales;  