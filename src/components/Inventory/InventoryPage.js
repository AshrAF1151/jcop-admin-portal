import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
// import data from '../data/data';
import CustomModal from '../CustomModal/CustomModal';

const InventoryPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const data = [];

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  const renderTableRows = () => {
    return data.map((item) => (
      <tr key={item.id} className="hover:bg-gray-100">
        <td className="p-2">{item.name}</td>
        <td className="p-2">{item.description}</td>
        <td className="p-2">${item.price}</td>
        <td className="p-2">{item.category}</td>
        <td className="p-2">{item.brand}</td>
        <td className="p-2 text-center">
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => openModal(item)}
            className="cursor-pointer"
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Inventory</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Category</th>
              <th className="p-3 border-b">Brand</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
      {selectedItem && (
        <CustomModal
          item={selectedItem}
          showModal={showModal}
          closeModal={closeModal}
          modalTitle="Product Details"
          modalFields={[
            { label: 'Name', value: 'name' },
            { label: 'Description', value: 'description' },
            { label: 'Price', value: 'price' },
            { label: 'Category', value: 'category' },
            { label: 'Brand', value: 'brand' },
          ]}
        />
      )}
    </div>
  );
};

export default InventoryPage;