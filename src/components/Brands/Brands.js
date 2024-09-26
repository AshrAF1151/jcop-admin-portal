import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
// import data from "../data/data";
import CustomModal from "../CustomModal/CustomModal";

const Brands = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (brand) => {
    setSelectedBrand(brand);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBrand(null);
    setShowModal(false);
  };

  const data = []; // Update with actual data

  const renderTableRows = () => {
    return data.map((brand) => (
      <tr key={brand.id} className="hover:bg-gray-100">
        <td className="p-2">{brand.id}</td>
        <td className="p-2">{brand.CategoryName}</td>
        <td className="p-2">{brand.Title}</td>
        <td className="p-2">{brand.Code}</td>
        <td className="p-2">${brand.Price}</td>
        <td className="p-2 text-center">
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => openModal(brand)}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Brands</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Category</th>
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Code</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
      {selectedBrand && (
        <CustomModal
          item={selectedBrand}
          showModal={showModal}
          closeModal={closeModal}
          modalTitle="Brand Details"
          modalFields={[
            { label: 'ID', value: 'id' },
            { label: 'Category', value: 'CategoryName' },
            { label: 'Title', value: 'Title' },
            { label: 'Code', value: 'Code' },
            { label: 'Price', value: 'Price' },
          ]}
        />
      )}
    </div>
  );
};

export default Brands;