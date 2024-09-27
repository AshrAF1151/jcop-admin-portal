import React, { useEffect, useState } from "react";

const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("orders");

  useEffect(() => {
    const fetchRecentOrdersAndInvoices = async () => {
      try {
        const response = await fetch(
          "https://apis.joonbeauty.com:550/daily-orders-and-invoices",
          {
            method: "POST",
          }
        );
        const data = await response.json();

        if (data.success) {
          setRecentOrders(data.orders);
          setRecentInvoices(data.invoices);
        } else {
          setError("Failed to fetch orders and invoices");
        }
      } catch (err) {
        setError("An error occurred: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrdersAndInvoices();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentList =
    viewMode === "orders" ? recentOrders : recentInvoices;

  return (
    <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
      <div className="flex items-center justify-center space-x-2 p-4 bg-[#192841]">
        <button
          onClick={() => setViewMode("orders")}
          className={`p-2 w-full text-gray-700 font-semibold rounded-lg ${
            viewMode === "orders" ? "bg-gray-200" : "bg-gray-500 text-gray-700"
          }`}
        >
          Daily Orders
        </button>
        <button
          onClick={() => setViewMode("invoices")}
          className={`p-2 w-full text-gray-700 font-semibold rounded-lg ${
            viewMode === "invoices" ? "bg-gray-200 text-gray-700" : "bg-gray-500"
          }`}
        >
          Daily Invoices
        </button>
      </div>

      <div className="max-h-44 overflow-y-auto p-1 space-y-1">
        {currentList.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No daily {viewMode === "orders" ? "orders" : "invoices"} available.
          </div>
        ) : (
          currentList.map((item) => (
            <div
              key={item.custNum || item.invNum}
              className="bg-white lg:p-4 p-2 rounded-lg flex justify-between items-center border border-gray-200"
            >
              <div>
                <p className="text-teal-400 font-semibold text-sm">{item.custName}</p>
                <p className="text-gray-500 text-sm">{item.custNum}</p>
              </div>
              <div className="text-gray-500 text-xs">
                {viewMode === "orders"
                  ? new Date(item.orderDate).toLocaleDateString()
                  : new Date(item.invDate).toLocaleDateString()}
              </div>
              <div>
                {viewMode === "orders" ? (
                  <>
                    <div className="text-teal-400 mb-1 text-sm">
                      ${item.grandTotal.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.city}, {item.state}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-teal-400 mb-1">
                      ${item.grandTotal.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Invoice #{item.invNum}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentOrders;