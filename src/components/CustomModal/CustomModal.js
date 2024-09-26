import React from "react";
import noimage from "../../Assets/no-image-FD.png";

const CustomModal = ({
  item,
  showModal,
  closeModal,
  modalTitle,
  modalFields,
  imageURI,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        showModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b p-4 bg-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">{modalTitle}</h2>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          {modalFields.map((field, index) => (
            <div className="flex items-center mb-2" key={index}>
              <span className="font-semibold w-1/3">{field.label}:</span>
              <span className="w-2/3">
                {field.isImage ? (
                  <img
                    src={`${imageURI}${item.imageFilename}?${Date.now()}`}
                    alt={item.itemName}
                    className="w-24 h-24 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = noimage;
                    }}
                  />
                ) : (
                  item[field.value] || "N/A"
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;