import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/slice/estimationSlice";
import { Preview } from "./Preview";
import { GetProductByIdAPI } from "../features/api";
import { RootState } from "../app/store";
import ProductSkeleton from "./ProductSkeleton";


export const ProductGalleryDescription: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const [gsm, setGsm] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("M");
  const [type] = useState<string>("full sleeve");
  const [showModal, setShowModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");

  const { product, isLoading } = useSelector(
    (state: RootState) => state.viewProduct
  );

  // Fetch product
  useEffect(() => {
    if (productId) {
      dispatch(GetProductByIdAPI(productId));
    }
  }, [dispatch, productId]);

  // Set first GSM & variant on load
  useEffect(() => {
    if (product && product.prices?.length > 0) {
      const firstVariant = product?.variantData?.[0];
     const firstGsm = String(product.prices[0].gsmName);

      setSelectedVariant(firstVariant);
      setMainImage(
        firstVariant?.variantImage || firstVariant?.frontImage || ""
      );
      setGsm(firstGsm); // ✅ Set GSM
      setColor(firstVariant?.color?.name || "");
    }
  }, [product]);

  // Update main image on variant change
  useEffect(() => {
    if (selectedVariant) {
      setMainImage(
        selectedVariant?.variantImage || selectedVariant?.frontImage || ""
      );
    }
  }, [selectedVariant]);

  // All images
  const allImages = useMemo(() => {
    if (!selectedVariant) return [];
    return [
      selectedVariant.variantImage,
      selectedVariant.frontImage,
      selectedVariant.backImage,
      ...(selectedVariant.otherImages || []),
    ].filter(Boolean);
  }, [selectedVariant]);

  // Price calculation
  const discount = Number(product?.discountPercentage ?? 0);
  const selectedPriceObj = product?.prices?.find(p => String(p.gsmName) === gsm);
  const basePrice = Number(selectedPriceObj?.amount || 500);
  const price = Math.round(basePrice - (basePrice * discount) / 100);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
  if (Array.isArray(product?.sizesData) && product.sizesData.length > 0) {
    setSize(product.sizesData[0].label);
  }
}, [product?.sizesData]);

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
    const uniqueId = `${product?.name}-${gsm}-${color}-${size}-${type}`;
    const newProduct = {
      id: uniqueId,
      img: selectedImage || mainImage,
      name: product?.name,
      gsm,
      color,
      size,
      price,
      total: product?.total,
      discount,
      description: product?.description,
      originalPrice: basePrice,
    };
    dispatch(addProduct(newProduct));
    navigate("/estimation");
  };

  if (isLoading || !product) return <ProductSkeleton />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row gap-8 mb-16">
      {/* LEFT: Image Gallery */}
      <div className="flex gap-4 flex-col sm:flex-row sm:items-start">
        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-2 max-h-[28rem] overflow-y-auto pr-1 w-auto sm:w-24">
          {allImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onMouseEnter={() => setMainImage(img)}
              className={`h-16 w-16 cursor-pointer rounded border object-cover transition duration-200 ${
                mainImage === img
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="w-72 h-72 sm:w-[28rem] sm:h-[28rem] border rounded shadow-md bg-white">
          <img
            src={mainImage}
            alt={product?.title}
            className="w-full h-full object-contain max-w-[100%] max-h-[100%]"
          />
        </div>
      </div>

      {/* RIGHT: Product Details */}
      <div className="flex-1 text-base sm:text-[15px] lg:text-[20px] max-1300:text-[18px]">
        {/* Product Name */}
        <h2 className="font-bold text-sm sm:text-lg md:text-xl lg:text-2xl mb-5">
          {product?.name}
        </h2>

        {/* Description */}
        <p className="mb-5 text-sm sm:text-base md:text-lg">
          {product?.description}
        </p>

        {/* GSM */}
        <div className="mb-5 flex items-center gap-2">
  <span className="whitespace-nowrap text-sm sm:text-base md:text-lg">
    <b>GSM:</b>
  </span>
  <div className="flex gap-2 flex-wrap">
    {product.prices.map((p, idx) => (
      <div
        key={idx}
        onClick={() => setGsm(String(p.gsmName))}
        className={`px-2 py-1 border rounded cursor-pointer text-sm sm:text-base md:text-lg ${
          gsm === String(p.gsmName)
            ? "border-black font-semibold bg-gray-100"
            : "border-gray-300"
        }`}
      >
        {p.gsmName}
      </div>
    ))}
  </div>
</div>


        {/* Color Variants */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-sm sm:text-base md:text-lg">
            <b>Color:</b>
          </span>
          <div className="flex gap-2 flex-wrap">
            {product.variantData.map((variant, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setColor(variant.color.name);
                  setSelectedVariant(variant);
                }}
                className={`flex items-center gap-1 px-2 py-1 border rounded cursor-pointer text-sm sm:text-base md:text-lg ${
                  color === variant.color.name
                    ? "border-black font-semibold bg-gray-100"
                    : "border-gray-300"
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: variant.color.code }}
                  title={variant.color.name}
                />
                <span>{variant.color.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        {Array.isArray(product?.sizesData) && (
  <div className="mb-5 flex items-center gap-2">
    <p className="whitespace-nowrap text-sm sm:text-base md:text-lg">
      <b>Sizes:</b>
    </p>
    <div className="flex gap-2 flex-nowrap overflow-x-auto whitespace-nowrap">
      {product.sizesData.map((s, index: number) => (
        <div
          key={index}
          onClick={() => setSize(s.label)}
          className={`px-3 py-2 border rounded cursor-pointer transition duration-200 text-sm sm:text-base md:text-lg ${
            size === s.label
              ? "border-black font-semibold bg-gray-100"
              : "border-gray-300"
          }`}
        >
          {s.label}
        </div>
      ))}
    </div>
  </div>
)}


        {/* Price */}
        {product?.prices?.length > 0 && (
          <div className="text-sm lg:text-[18px] mt-3 mb-3 flex items-center gap-2">
            <span className="text-sm lg:text-[18px]">
              <b>Price:</b>
            </span>
            <span className="text-black text-sm lg:text-[18px] mr-1">
              ₹{discount ? price : basePrice}
            </span>
            {discount > 0 && (
              <>
                <span className="line-through text-gray-400 text-sm lg:text-[18px]">
                  ₹{basePrice}
                </span>
                <span className="text-green-600 text-sm lg:text-[18px]">
                  {discount}% off
                </span>
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-10">
          <label className="px-4 py-2 border rounded cursor-pointer text-center sm:text-left text-sm lg:text-[18px]">
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
            className="px-6 py-2 bg-custom-yellow text-black rounded font-semibold text-sm lg:text-[18px]"
            onClick={handleAddToEstimation}
          >
            Add to estimation
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-gray-600"
            >
              &times;
            </button>
            <Preview
              images={uploadedImages}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};


// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addProduct } from "../features/slice/estimationSlice";
// import { Preview } from "./Preview";
// import { GetProductByIdAPI } from "../features/api";
// import { RootState } from "../app/store";

// export const ProductGalleryDescription: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { productId } = useParams();

//   useEffect(() => {
//     if (productId) {
//       dispatch(GetProductByIdAPI(productId));
//     }
//   }, [dispatch, productId]);

//   const { product } = useSelector((state: RootState) => state.viewProduct);
//   console.log(product?.variantData,"pppppppppp");

//   const [gsm, setGsm] = useState<string>("120");
//   const [color, setColor] = useState<string>("White");
//   const [size, setSize] = useState<string>("M");
//   const [type, setType] = useState<string>("full sleeve");
//   const [showModal, setShowModal] = useState(false);
//   const [uploadedImages, setUploadedImages] = useState<string[]>([]);
//   const [selectedImage, setSelectedImage] = useState<string>("");

//   const discount = Number(product?.discountPercentage ?? 0);
//   const basePrice = Number(product?.price?.$numberDecimal || 500);
//   const price = Math.round(basePrice - (basePrice * discount) / 100);

//   const thumbnails = [
//   ...(product?.sleeveImage || []),
//   product?.image?.frontImage,
//   product?.image?.backImage,
//   product?.image?.variantImage,
// ].filter(Boolean);

//   // Set first thumbnail image on mount only if not already selected
//   useEffect(() => {
//     if (thumbnails.length && !selectedImage) {
//       setSelectedImage(thumbnails[0]);
//     }
//   }, [thumbnails, selectedImage]);

//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const fileArray: File[] = Array.from(files);
//     Promise.all(fileArray.map(fileToBase64)).then((base64Images: string[]) => {
//       setUploadedImages(base64Images);
//       setShowModal(true);
//     });
//   };

//   const handleAddToEstimation = () => {
//     const uniqueId = `${product?.name}-${gsm}-${color}-${size}-${type}`;
//     const newProduct = {
//       id: uniqueId,
//       img: selectedImage,
//       name: product?.name,
//       gsm,
//       color,
//       size,
//       // type,
//       price,
//       total: product?.total,
//       discount,
//       description: product?.description,
//       originalPrice: product?.price,
//     };
//     dispatch(addProduct(newProduct));
//     navigate("/estimation");
//   };

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row gap-8 mb-16">

//       {/* LEFT: Image Gallery */}
//       <div className="flex gap-4 flex-col sm:flex-row sm:items-start">
//         {/* Thumbnails */}
//         <div className="flex sm:flex-col gap-2 max-h-[28rem] overflow-y-auto pr-1 w-auto sm:w-24">
//           {thumbnails.map((img, idx) => (
//             <img
//               key={idx}
//               src={img}
//               alt={`thumb-${idx}`}
//               onMouseEnter={() => setSelectedImage(img)}
//               className={`w-16 h-16 sm:w-20 sm:h-20 object-contain border rounded cursor-pointer transition duration-200 transform  ${
//                 selectedImage === img
//                   ? "border-2 border-blue-500 ring-2 ring-blue-200"
//                   : "border border-gray-300"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="w-72 h-72 sm:w-[28rem] sm:h-[28rem] border rounded shadow-md bg-white">
//           <img
//             src={selectedImage}
//             alt="Selected"
//             className="w-full h-full object-contain max-w-[100%] max-h-[100%]"
//           />
//         </div>
//       </div>

//       {/* RIGHT: Product Details */}
//       <div className="flex-1 text-base sm:text-[15px] lg:text-[20px] max-1300:text-[18px]">
//         <h2 className="font-bold text-xl sm:text-2xl mb-3">{product?.name}</h2>
//         <p >
//           {product?.description}
//         </p>

//         {/* Color Indicator Dots */}

// {product?.variantData && (
//   <div className="flex items-center gap-2 mt-3">

//     <span>Color:</span>

//     <div className="inline-flex items-center gap-2 px-2 py-1 border rounded">

//       <div
//         className="w-4 h-4 rounded-full border"
//         style={{
//           backgroundColor: product?.variantData?.code,
//         }}
//         title={product?.variantData?.name}
//       />

//       <span>{product?.variantData?.name}</span>
//     </div>
//   </div>
// )}

//         {/* Price Display */}
//       {product?.prices?.length > 0 && (
//   <div className="text-sm mt-3 mb-3 flex items-center gap-2">
//     {/* Label */}
//     <span className="text-[18px]">Price:</span>

//     {/* Discounted Price */}
//     <span className="text-black text-[18px] mr-1">
//       ₹
//       {product.discountPercentage
//         ? Math.round(
//             product.prices[0].amount -
//               (product.prices[0].amount * product.discountPercentage) / 100
//           )
//         : Math.round(product.prices[0].amount)}
//     </span>

//     {/* Original Price (Striked Through) */}
//     {product.discountPercentage > 0 && (
//       <span className="line-through text-gray-400 mr-1">
//         ₹{product.prices[0].amount}
//       </span>
//     )}

//     {/* Discount Percentage */}
//     {product.discountPercentage > 0 && (
//       <span className="text-green-600">{product.discountPercentage}% off</span>
//     )}
//   </div>
// )}

// {/* GSM */}

// {product?.prices?.length > 0 && (
//   <div className="mb-3 flex items-center gap-2">
//     <span className="whitespace-nowrap">GSM:</span>
//     <div className="flex gap-2 flex-wrap">
//       {Array.from(new Set(product.prices.map((p: any) => p.gsmId)) as Set<string>).map((gsmOption: string, idx: number) => (
//         <div
//           key={idx}
//           onClick={() => setGsm(gsmOption)}
//           className={`px-2 py-1 border rounded cursor-pointer transition ${
//             gsm === gsmOption ? "border-black font-semibold bg-gray-100" : "border-gray-300"
//           }`}
//         >
//           {gsmOption}
//         </div>
//       ))}
//     </div>
//   </div>
// )}

// {/* Sizes */}
// {Array.isArray(product?.sizeIds) && product.sizeIds.length > 0 && (
//   <div className="mb-2 flex items-center gap-2">
//     <p className="whitespace-nowrap">Sizes:</p>
//     <div className="flex gap-2 flex-nowrap overflow-x-auto whitespace-nowrap">
//       {product.sizeIds.map((s: any, index: number) => (
//         <div
//           key={index}
//           onClick={() => setSize(s.sizeId)}
//           className={`px-4 py-4 border rounded cursor-pointer transition duration-200 ${
//             size === s.sizeId ? "border-black font-semibold bg-gray-100" : "border-gray-300"
//           }`}
//         >
//           {s.sizeId}
//         </div>
//       ))}
//     </div>
//   </div>
// )}

//         {/* Action Buttons */}
//         <div className="flex gap-4 mt-5">
//           <label className="px-4 py-2 border rounded cursor-pointer text-center sm:text-left">
//             Upload & Preview
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//               className="hidden"
//             />
//           </label>
//           <button
//             className="px-6 py-2 bg-custom-yellow text-black rounded font-semibold"
//             onClick={handleAddToEstimation}
//           >
//             Add to estimation
//           </button>
//         </div>
//       </div>

//       {/* Modal for Preview */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-gray-600"
//             >
//               &times;
//             </button>
//             <Preview
//               images={uploadedImages}
//               onClose={() => setShowModal(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
