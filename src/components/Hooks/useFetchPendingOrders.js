import { useState, useEffect } from 'react';

const useFetchPendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loadingPendingOrders, setLoadingPendingOrders] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPendingOrders = async () => {
        try {
          const response = await fetch("https://apis.joonbeauty.com:550/pendingorderslastmonth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          if (data.success) {
            setPendingOrders(data || []);
          }
        } catch (error) {
          console.error("Error fetching pending orders:", error);
          setError(error);
        } finally {
          setLoadingPendingOrders(false);
        }
      };
  
      fetchPendingOrders();
    }, []);
  
    return { pendingOrders, loadingPendingOrders, error };
  };
  
  export default useFetchPendingOrders;  