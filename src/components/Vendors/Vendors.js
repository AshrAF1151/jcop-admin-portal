import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
// import VendorData from '../data/vendorData'; // Update with actual data import
import CustomModal from '../CustomModal/CustomModal';

const VendorsPage = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  const VendorData = []; // Update with actual vendor data

  const closeModal = () => {
    setSelectedVendor(null);
    setShowModal(false);
  };

  const renderTableRows = () => {
    return VendorData.map((vendor) => (
      <tr key={vendor.id} className="hover:bg-gray-100">
        <td className="p-2">{vendor.name}</td>
        <td className="p-2">{vendor.contact}</td>
        <td className="p-2">{vendor.email}</td>
        <td className="p-2">{vendor.phone}</td>
        <td className="p-2">{vendor.address}</td>
        <td className="p-2 text-center">
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => openModal(vendor)}
            className="cursor-pointer"
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Vendors</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Contact</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Phone</th>
              <th className="p-3 border-b">Address</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
      {selectedVendor && (
        <CustomModal
          item={selectedVendor}
          showModal={showModal}
          closeModal={closeModal}
          modalTitle="Vendor Details"
          modalFields={[
            { label: 'Name', value: 'name' },
            { label: 'Contact', value: 'contact' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Address', value: 'address' },
          ]}
        />
      )}
    </div>
  );
};

export default VendorsPage;