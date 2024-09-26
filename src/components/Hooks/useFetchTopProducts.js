import { useState, useEffect } from 'react';

const useFetchTopProducts = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [loadingTopProducts, setLoadingTopProducts] = useState(true);
    const [totalActiveItems, setTotalActiveItems] = useState(0);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchTopProducts = async () => {
        try {
          setLoadingTopProducts(true);
          const response = await fetch("https://apis.joonbeauty.com:550/topproducts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          if (data.success) {
            setTopProducts(data.products);
            setTotalActiveItems(data.totalActiveItems);
          }
        } catch (error) {
          console.error("Error fetching top products:", error);
          setError(error);
        } finally {
          setLoadingTopProducts(false);
        }
      };
  
      fetchTopProducts();
    }, []);
  
    return { topProducts, loadingTopProducts, totalActiveItems, error };
  };
  
  export default useFetchTopProducts;