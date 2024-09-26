import React, { useState } from "react";
import noimage from "../../Assets/no-image-FD.png";

const ImageModal = ({ imageUrl, showModal, closeModal, itemNum, onImageUploaded }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(imageUrl || noimage);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const uploadImage = async () => {
    if (!file || !itemNum) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('itemNum', itemNum);

    try {
      const response = await fetch('https://apis.joonbeauty.com:550/UploadImage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPreview(data.path);
        onImageUploaded(data.path);
        closeModal();
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-w-lg max-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b p-4 bg-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">Image Preview</h2>
          <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>
        <div className="p-4 flex flex-col items-center">
          <div className="relative w-full h-64 overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noimage;
              }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-4"
          />
          {file && (
            <button
              onClick={uploadImage}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            >
              Upload Image
            </button>
          )}
        </div>
        <div className="border-t p-4 flex justify-end">
          <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;