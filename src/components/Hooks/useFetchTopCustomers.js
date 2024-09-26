import { useState, useEffect } from 'react';

const useFetchTopCustomers = () => {
  const [topCustomers, setTopCustomers] = useState([]);
  const [loadingTopCustomers, setLoadingTopCustomers] = useState(true);
  const [totalActiveCustomers, setTotalActiveCustomers] = useState(0);
  const [days30Customers, setDays30Customers] = useState(0);
  const [ytdInvoiceAmounts, setYtdInvoiceAmounts] = useState({});
  const [invoicesLastYearNoInvoicesThisYear, setInvoicesLastYearNoInvoicesThisYear] = useState(0);
  const [invoicesOver45DaysCount, setInvoicesOver45DaysCount] = useState(0);
  const [noInvoiceCustomersCount, setNoInvoiceCustomersCount] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        setLoadingTopCustomers(true);
        const response = await fetch("https://apis.joonbeauty.com:550/topcustomers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.success) {
          console.log("Fetched Data: ", data);
          setTopCustomers(data.customers);
          setTotalActiveCustomers(data.totalActiveCustomers);
          setYtdInvoiceAmounts(data.ytdInvoiceAmounts);
          setInvoicesLastYearNoInvoicesThisYear(data.invoicesLastYearNoInvoicesThisYear);
          setInvoicesOver45DaysCount(data.invoicesOver45DaysCount);
          setNoInvoiceCustomersCount(data.noInvoiceCustomersCount);
          setTotalCustomers(data.totalCustomers);
          setDays30Customers(data.customersLast30DaysCount);
        }
      } catch (error) {
        console.error("Error fetching top customers:", error);
        setError(error);
      } finally {
        setLoadingTopCustomers(false);
      }
    };

    fetchTopCustomers();
  }, []);

  return {
    topCustomers,
    loadingTopCustomers,
    totalActiveCustomers,
    ytdInvoiceAmounts,
    invoicesLastYearNoInvoicesThisYear,
    invoicesOver45DaysCount,
    noInvoiceCustomersCount,
    totalCustomers,
    days30Customers,
    error
  };
};

export default useFetchTopCustomers;