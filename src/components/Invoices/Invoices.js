import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
// import CustomModal from "../CustomModal/CustomModal";
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import "../styles.css";

const InvoicePage = () => {
  const [invoice, setInvoice] = useState([]);
  // const [selectedInvoice, setSelectedInvoice] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching invoices...");
    fetchInvoice();
    // eslint-disable-next-line
  }, [filterStatus]);

  useEffect(() => {
    console.log("Component Rendered");
  });
  

  const fetchInvoice = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch("https://apis.joonbeauty.com:550/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: page,
          perPage: 15,
          odrStatus: filterStatus !== "" ? filterStatus : null,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.success && Array.isArray(result.invoices)) {
        setInvoice((prevInvoices) => [...prevInvoices, ...result.invoices]);
        setPage((prevPage) => prevPage + 1);

        if (result.invoices.length < 15) {
          setHasMore(false);
        }
      } else {
        console.error(
          "Failed to fetch invoices: Data is not an array or success is false."
        );
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  // const openModal = (invoice) => {
  //   setSelectedInvoice(invoice);
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setSelectedInvoice(null);
  //   setShowModal(false);
  // };

  const getOrderStatusText = (status) => {
    console.log("Received status:", status);
    const statusNumber = Number(status);

    switch (statusNumber) {
      case 4:
        return "Completed";
      case 1:
        return "Pending";
      case 0:
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const openDetailsPage = (invoice) => {
    navigate('/invoice-details', { state: { invoice } });
  };

  const handleFilterChange = (e) => {
    setInvoice([]);
    setPage(1);
    setHasMore(true);
    setFilterStatus(e.target.value);
  };

  return (
    <div className="content-container">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 mt-5 mb-3 lg:ml-3">
          Invoices
        </h1>
        <div className="filter-section bg-white shadow-sm rounded-lg px-3 flex items-center mt-3">
          <label
            htmlFor="statusFilter"
            className="lg:mr-3 text-sm font-medium text-gray-700"
          >
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">All</option>
            <option value="1">Pending</option>
            <option value="4">Completed</option>
            <option value="0">Cancelled</option>
          </select>
        </div>
      </header>
      <div className="table-container">
        {invoice.length === 0 && !loading && <p>No invoices available.</p>}
        <InfiniteScroll
          dataLength={invoice.length}
          next={fetchInvoice}
          hasMore={hasMore}
          loader={loading ? <Loader /> : null}
        >
          <div className="table-wrapper overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="sticky top-0 bg-gray-200 text-gray-700 z-10">
                <tr className="border-b border-gray-300">
                  <th className="p-4 text-center border-b border-gray-300">
                    Inv Number
                  </th>
                  <th className="p-4 text-center border-b border-gray-300">
                    Shop ID
                  </th>
                  <th className="p-4 text-center border-b border-gray-300">
                    Customer Number
                  </th>
                  <th className="p-4 text-center border-b border-gray-300">
                    Inv Date
                  </th>
                  <th className="p-4 text-center border-b border-gray-300">
                    Price
                  </th>
                  <th className="p-4 text-center border-b border-gray-300">
                    Order Status
                  </th>
                  <th className="p-4 text-center border-b border-gray-300">
                    Payment Method
                  </th>
                  <th className="p-4 text-center border-b border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.map((inv) => (
                  <tr key={inv.invNum} className="hover:bg-gray-100">
                    <td className="p-4 border-b border-gray-300 text-center">
                      {inv.invNum}
                    </td>
                    <td className="p-4 border-b border-gray-300 text-center">
                      {inv.shopID}
                    </td>
                    <td className="p-4 border-b border-gray-300 text-center">
                      {inv.custNum}
                    </td>
                    <td className="p-4 border-b border-gray-300 text-center">
                      {new Date(inv.invDate).toLocaleDateString() || "N/A"}
                    </td>
                    <td className="p-4 border-b border-gray-300 text-center">
                      ${inv.grandTotal}
                    </td>
                    <td className="p-4 border-b border-gray-300 text-center">
                      {getOrderStatusText(inv.odrStatus)}
                    </td>
                    <td className="p-4 border-b border-gray-300 text-center">
                      {inv.paymentMethod}
                    </td>
                    <td className="p-4 border-b border-gray-300 text-center">
                      <FontAwesomeIcon
                        icon={faEye}
                        onClick={() => openDetailsPage(inv)}
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      </div>
      {/* {selectedInvoice && (
        <CustomModal
          item={selectedInvoice}
          showModal={showModal}
          closeModal={closeModal}
          modalTitle="Invoice Details"
          modalFields={[
            { label: "Invoice Number", value: "invNum" },
            { label: "Customer Number", value: "custNum" },
            { label: "Invoice Date", value: "invDate" },
            { label: "Grand Total", value: "grandTotal" },
            { label: "Order Status", value: "odrStatus" },
            { label: "Payment Method", value: "paymentMethod" },
          ]}
        />
      )} */}
    </div>
  );
};

export default InvoicePage;
