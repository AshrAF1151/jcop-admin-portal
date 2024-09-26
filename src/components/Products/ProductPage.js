import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../CustomModal/CustomModal";
import noimage from "../../Assets/no-image-FD.png";
import ImageModal from "../ImageModal/ImageModal";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import "../styles.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [currentItemNum, setCurrentItemNum] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const BASE_IMAGE_URL = "https://apis.joonbeauty.com:550";

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://apis.joonbeauty.com:550/getAllBrands",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: page,
            perPage: 15,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setProducts((prevProducts) => [...prevProducts, ...result.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.error("Failed to fetch products:", result.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const openImageModal = (imageFilename, itemNum) => {
    setCurrentImageUrl(`${BASE_IMAGE_URL}${imageFilename}`);
    setCurrentItemNum(itemNum);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setCurrentImageUrl("");
    setCurrentItemNum("");
    setShowImageModal(false);
  };

  const handleImageUploaded = (newImagePath) => {
    // Update the products state or any other logic if needed
  };

  return (
    <div className="content-container">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 lg:mt-5">
        Products
      </h1>
      <div className="table-container">
        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
          hasMore={true}
          loader={loading ? <Loader /> : null}
        >
          <div className="table-wrapper p-1">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-800">
                <tr className="text-white">
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase">
                    Item Number
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase">
                    Brand
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase">
                    Barcode
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase">
                    Image
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr
                    key={`${product.itemNum}-${index}`}
                    className="hover:bg-gray-200 transition-all duration-150"
                  >
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.itemNum}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                      {product.itemName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                        {product.itemBrand}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        {product.itemCat || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-green-700 font-semibold">
                        ${product.price}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                      <span className="bg-gray-100 py-1 rounded-lg px-2 font-mono">
                        {product.barcode}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-center">
                      <img
                        alt=""
                        height="50"
                        src={`${BASE_IMAGE_URL}${
                          product.imageFilename
                        }?${Date.now()}`}
                        width="50"
                        onClick={() =>
                          openImageModal(product.imageFilename, product.itemNum)
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = noimage;
                        }}
                        className="cursor-pointer w-16 h-16 object-contain rounded-lg mx-auto"
                      />
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-center">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="mx-2 cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-150"
                        onClick={() => openModal(product)}
                        title="View Details"
                      />
                      {/* <FontAwesomeIcon icon={faEdit} className="mx-2 cursor-pointer" />
                    <FontAwesomeIcon icon={faTrash} className="mx-2 cursor-pointer" /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      </div>
      {selectedProduct && (
        <CustomModal
          item={selectedProduct}
          products={products}
          showModal={showModal}
          imageURI={BASE_IMAGE_URL}
          closeModal={closeModal}
          modalTitle="Product Details"
          modalFields={[
            { label: "Item Number", value: "itemNum" },
            { label: "Name", value: "itemName" },
            { label: "Brand", value: "itemBrand" },
            { label: "Category", value: "itemCat" },
            { label: "Price", value: "price" },
            { label: "Barcode", value: "barcode" },
            { label: "Update Date", value: "updateDate" },
            { label: "Image", value: "imageFilename", isImage: true },
          ]}
        />
      )}
      {currentImageUrl && (
        <ImageModal
          imageUrl={currentImageUrl}
          showModal={showImageModal}
          closeModal={closeImageModal}
          itemNum={currentItemNum}
          onImageUploaded={handleImageUploaded}
        />
      )}
    </div>
  );
};

export default ProductPage;
