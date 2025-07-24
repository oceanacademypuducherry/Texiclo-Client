// import { useRef, useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { PRODUCT } from "../assets";
// import { RootState } from "../app/store";

// export const RelatedProducts = () => {
//   const navigate = useNavigate();
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1000);

//   const relatedProduct = useSelector(
//     (state: RootState) => state.viewProduct.relatedProduct
//   );

//   const scroll = (offset: number) => {
//     scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= 1000);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (!relatedProduct || relatedProduct.length === 0) return null;

//   return (
//     <div className="relative w-full px-4 sm:px-8 md:px-16 lg:px-20 max-w-screen-xl mx-auto my-10">
     

//       {isDesktop && relatedProduct.length > 4 && (
//         <>
//           <button
//             onClick={() => scroll(-300)}
//             className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button
//             onClick={() => scroll(300)}
//             className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </>
//       )}

//       <div
//         ref={scrollRef}
//         className={`flex gap-6 scroll-smooth ${
//           isDesktop
//             ? relatedProduct.length <= 4
//               ? "justify-center"
//               : "overflow-hidden"
//             : "overflow-x-auto"
//         }`}
//       >
//         {relatedProduct.map((product) => {
//           const {
//             _id,
//             name,
//             description,
//             discountPercentage = 0,
//             variantImage,
//             price = 0,
//             colors = [],
//           } = product;

//           const finalPrice = Math.round(
//             price - (price * discountPercentage) / 100
//           );

//           return (
//             <div
//               key={_id}
//              onClick={() => {
//   navigate(`/viewproduct/${_id}`);
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }}

//               className="min-w-[250px] shrink-0 rounded-xl overflow-hidden text-center cursor-pointer border border-gray-200 p-4 hover:shadow-md transition"
//             >
//               <img
//                 src={variantImage || PRODUCT}
//                 alt={name}
//                 className="w-full h-48 object-contain"
//               />
// {/* {Array.isArray(colors) && colors.length > 0 && (
//   <div className="flex items-center justify-center gap-1 mt-3">
//     {colors.slice(0, 4).map((color, index) => (
//       <div
//         key={index}
//         className="w-4 h-4 rounded-full border border-gray-300"
//         style={{ backgroundColor: color?.code || '#ccc' }}
//         title={color?.name || 'No name'}
//       />
//     ))}
//     {colors.length > 4 && (
//       <span className="text-xs text-gray-500">+{colors.length - 4}</span>
//     )}
//   </div>
// )} */}





//               <p className="mt-3 font-semibold text-base">{name}</p>
//               {/* <p className="text-sm text-custom-grey line-clamp-2">{description}</p> */}

//               {price > 0 ? (
//                 <div className="flex justify-center items-center gap-2 mt-2 text-base">
//                   <span className="font-semibold text-black">₹{finalPrice}</span>
//                   <span className="line-through text-gray-400">₹{price}</span>
//                   {discountPercentage > 0 && (
//                     <span className="text-green-600 font-medium text-sm">
//                       {discountPercentage}% off
//                     </span>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-gray-400 text-sm mt-2">Price not available</div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRODUCT } from "../assets";
import { RootState } from "../app/store";

export const RelatedProducts = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1000);

  const { relatedProduct, isLoading } = useSelector(
    (state: RootState) => state.viewProduct
  );

  // Debugging logs (optional)
  useEffect(() => {
    console.log("relatedProduct:", relatedProduct);
    console.log("isLoading:", isLoading);
  }, [relatedProduct, isLoading]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skeletonArray = new Array(3).fill(null);

  const scroll = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative w-full px-4 sm:px-8 md:px-16 lg:px-20 max-w-screen-xl mx-auto my-10">
      {/* <h2 className="text-xl font-semibold mb-4 text-center">Related Products</h2> */}

      {isDesktop && !isLoading && relatedProduct?.length > 3 && (
        <>
          <button
            onClick={() => scroll(-300)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll(300)}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className={`flex gap-6 scroll-smooth justify-center ${
          isDesktop && relatedProduct?.length > 3
            ? "overflow-hidden"
            : "overflow-x-auto"
        }`}
      >
        {isLoading ? (
          skeletonArray.map((_, index) => (
            <div
              key={index}
              className="min-w-[250px] shrink-0 rounded-xl overflow-hidden border border-gray-200 p-4 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 mx-auto"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
            </div>
          ))
        ) : relatedProduct && relatedProduct.length > 0 ? (
          relatedProduct.slice(0, 3).map((product) => {
            const {
              _id,
              name,
              discountPercentage = 0,
              variantImage,
              price = 0,
            } = product;

            const finalPrice = Math.round(
              price - (price * discountPercentage) / 100
            );

            return (
              <div
                key={_id}
                onClick={() => {
                  navigate(`/viewproduct/${_id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="min-w-[250px] shrink-0 rounded-xl overflow-hidden text-center cursor-pointer border border-gray-200 p-4 hover:shadow-md transition"
              >
                <img
                  src={variantImage || PRODUCT}
                  alt={name}
                  className="w-full h-48 object-contain"
                />
                <p className="mt-3 font-semibold text-base">{name}</p>
                {price > 0 ? (
                  <div className="flex justify-center items-center gap-2 mt-2 text-base">
                    <span className="font-semibold text-black">
                      ₹{finalPrice}
                    </span>
                    <span className="line-through text-gray-400">
                      ₹{price}
                    </span>
                    {discountPercentage > 0 && (
                      <span className="text-green-600 font-medium text-sm">
                        {discountPercentage}% off
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm mt-2">
                    Price not available
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 text-lg w-full my-4">
            No related products available.
          </div>
        )}
      </div>
    </div>
  );
};






