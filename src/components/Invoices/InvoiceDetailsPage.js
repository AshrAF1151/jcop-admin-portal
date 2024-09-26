import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; // Import Heroicons

const InvoiceDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { invoice } = location.state || {};

  if (!invoice) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center text-red-600 text-xl font-semibold">
          No invoice data found
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    // Handle payment logic here
    console.log('Payment button clicked');
  };

  const handleShipment = () => {
    // Handle shipment logic here
    console.log('Shipment button clicked');
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-1 p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-300 pb-3">
          Customer Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-medium mb-2">
              <strong>First Name:</strong> {invoice.customer.firstName}
            </p>
            <p className="text-lg font-medium mb-2">
              <strong>Last Name:</strong> {invoice.customer.lastName}
            </p>
            <p className="text-lg font-medium mb-2">
              <strong>Company Name:</strong> {invoice.customer.companyName}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium mb-2">
              <strong>Email:</strong> {invoice.customer.email}
            </p>
            <p className="text-lg font-medium mb-2">
              <strong>Phone Number:</strong> {invoice.customer.phoneNumber}
            </p>
            <p className="text-lg font-medium mb-2">
              <strong>Address:</strong> {invoice.customer.streetAddress1}, {invoice.customer.streetAddress2}, {invoice.customer.city}, {invoice.customer.state}, {invoice.customer.zipCode}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-300 pb-3">
          Invoice Items
        </h2>
        <ul className="space-y-6">
          {invoice.items.map((item) => {
            const price = Number(item.price);
            const total = price * (item.quantity || 0);
            return (
              <li key={item.itemNum} className="border-b border-gray-200 pb-4">
                <p className="text-lg font-medium mb-1">
                  <strong>Item Number:</strong> {item.itemNum}
                </p>
                <p className="text-lg font-medium mb-1">
                  <strong>Description:</strong> {item.nonInventoryName || 'N/A'}
                </p>
                <p className="text-lg font-medium mb-1">
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p className="text-lg font-medium mb-1">
                  <strong>Price:</strong> ${isNaN(price) ? '0.00' : price.toFixed(2)}
                </p>
                <p className="text-lg font-medium mb-1">
                  <strong>Total:</strong> ${isNaN(total) ? '0.00' : total.toFixed(2)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 flex justify-center gap-6">
        <button
          onClick={handlePayment}
          className="px-8 py-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Payment
        </button>
        <button
          onClick={handleShipment}
          className="px-8 py-4 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition duration-300"
        >
          Shipment
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;