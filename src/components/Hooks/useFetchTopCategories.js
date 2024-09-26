import { useState, useEffect } from 'react';

const useFetchTopCategories = () => {
    const [topCategories, setTopCategories] = useState([]);
    const [loadingTopCategories, setLoadingTopCategories] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchTopCategories = async () => {
        try {
          setLoadingTopCategories(true);
          const response = await fetch("https://apis.joonbeauty.com:550/topcategories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          if (data.success) {
            setTopCategories(data.categories || []);
          }
        } catch (error) {
          console.error("Error fetching top categories:", error);
          setError(error);
        } finally {
          setLoadingTopCategories(false);
        }
      };
  
      fetchTopCategories();
    }, []);
  
    return { topCategories, loadingTopCategories, error };
  };
  
  export default useFetchTopCategories;  