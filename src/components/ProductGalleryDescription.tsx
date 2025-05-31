import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/estimationSlice";
import { RootState, setAllProducts, setProducts } from "../redux";
import { viewproducts } from "../constant/viewproduct";
import { products as mockProducts } from "../constant/Product";
import { Preview } from "./Preview";

export const ProductGalleryDescription: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const selectedProduct = useSelector((state: RootState) => state.viewproduct.products);
  const filterData = selectedProduct.filter(p => p.id === parseInt(productId || "0"));
  const specificProductData = filterData[0];

  const [gsm, setGsm] = useState<string>(specificProductData?.GSM || "120");
  const [color, setColor] = useState<string>(specificProductData?.color || "White");
  const [size, setSize] = useState<string>(specificProductData?.size || "M");
  const [type, setType] = useState<string>(specificProductData?.type || "full sleeve");
  const [showModal, setShowModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const discount = specificProductData?.discount || 0;
  const basePrice = specificProductData?.price || 500;
  const price = Math.round(basePrice - (basePrice * discount) / 100);

  const thumbnails = [
    specificProductData?.image?.Image,
    specificProductData?.image?.backImage,
    specificProductData?.image?.frontImage,
    specificProductData?.image?.sleeveImage,
  ].filter(Boolean);

  useEffect(() => {
    setSelectedImage(thumbnails[0] || "");
  }, [thumbnails]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray: File[] = Array.from(files);
    Promise.all(fileArray.map(fileToBase64)).then((base64Images: string[]) => {
      setUploadedImages(base64Images);
      setShowModal(true);
    });
  };

  const handleAddToEstimation = () => {
    const uniqueId = `${specificProductData?.name}-${gsm}-${color}-${size}-${type}`;
    const newProduct = {
      id: uniqueId,
      img: selectedImage,
      name: specificProductData?.name,
      gsm,
      color,
      size,
      type,
      price,
      total: specificProductData?.total,
      discount,
      description: specificProductData?.description,
      originalPrice: specificProductData?.price,
    };
    dispatch(addProduct(newProduct));
    navigate("/estimation");
  };

  useEffect(() => {
    dispatch(setAllProducts(viewproducts));
    dispatch(setProducts(mockProducts));
  }, []);

  if (!specificProductData) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row gap-8 mb-16">
      {/* LEFT: Image Gallery */}
      <div className="flex gap-4 flex-col items-start sm:flex-row sm:items-center lg:items-start">
        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-2">
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              onMouseEnter={() => setSelectedImage(img)}
              className={`w-16 h-16 sm:w-20 sm:h-20 object-contain border rounded cursor-pointer transition duration-200 ${
                selectedImage === img ? "border-2 border-custom-grey" : "border"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="w-72 h-72 sm:w-96 sm:h-96 border rounded">
          <img
            src={selectedImage}
            alt="preview"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* RIGHT: Product Details */}
      <div className="flex-1 space-y-3 text-base sm:text-lg lg:text-xl">
        <h2 className="font-bold text-xl sm:text-2xl">{specificProductData?.name}</h2>
        <p className="text-gray-700">
          {specificProductData?.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique malesuada elit, ut facilisis tellus elementum id."}
        </p>

        <p><span className="font-semibold">Color:</span> {color}</p>
        <p><span className="font-semibold">Size:</span> {size}</p>
        <p><span className="font-semibold">Type:</span> {type}</p>
        <p><span className="font-semibold">Price:</span> ₹{price}</p>
        <p className="text-custom-darkgreen ">
          Discount applied: {discount}% Off
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <label className="px-4 py-2 border rounded cursor-pointer text-center sm:text-left">
            Upload & Preview
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <button
            className="px-4 py-2 bg-custom-yellow rounded font-medium"
            onClick={handleAddToEstimation}
          >
            Add to estimation
          </button>
        </div>
      </div>

      {/* Modal */}
   {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-gray-600"
      >
        &times;
      </button>
     <Preview images={uploadedImages} onClose={() => setShowModal(false)} />

    </div>
  </div>
)}





    </div>
  );
};
