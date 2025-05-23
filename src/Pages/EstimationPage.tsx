// EstimationPage.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {
  removeProduct,
  removeAllProducts,
  incrementQuantity,
  decrementQuantity,
} from "../redux/estimationSlice";

import { Navbar, Footer } from "../common";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

export const EstimationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.estimation.products);

 const total = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);


  const handleContactClick = async () => {
    const element = document.getElementById("estimation-section");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const image = canvas.toDataURL("image/png");
      localStorage.setItem("estimationScreenshot", image);
      navigate("/#contactus");
    } catch (error) {
      console.error("Error capturing estimation section:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" id="estimation-section">
      <Navbar />

      <div className="w-[95%] max-w-[1400px] mx-auto flex flex-col flex-grow">
        {/* Header */}
        <div className="relative px-6 sm:px-10 md:px-20 py-10 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Estimation Page</h1>
          {products.length > 0 && (
            <button
              onClick={() => dispatch(removeAllProducts())}
              className="text-sm sm:text-base bg-custom-yellow px-4 py-2 rounded font-medium"
            >
              Remove all
            </button>
          )}
        </div>

        {/* Products Grid */}
   <div className="px-6 sm:px-10 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-base">
  {products.length > 0 ? (
    products.map((product) => (
      <div
        key={product.id}
        className="flex flex-col sm:flex-row items-center sm:items-start p-4 rounded border border-gray-200 shadow-sm bg-gray-50 gap-4"
      >
        {/* Image + Quantity */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={product.img}
            alt={product.name}
            className="w-40 h-48 object-contain"
          />
          <div className="flex items-center gap-2">
            <button
              className="bg-gray-300 px-2 rounded"
              onClick={() => dispatch(decrementQuantity(product.id))}
            >
              -
            </button>
            <span className="w-6 text-center">{product.quantity}</span>
            <button
              className="bg-gray-300 px-2 rounded"
              onClick={() => dispatch(incrementQuantity(product.id))}
            >
              +
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h2 className="font-semibold text-lg">{product.name}</h2>
          <p>Description: {product.description}</p>
          <p>Color: {product.color}</p>
          <p>Size: {product.size}</p>
          <p>Type: {product.type}</p>
          <p>Discount: {product.discount}%</p>
          <p className="font-medium">Price: ₹{product.price}</p>
          <button
            onClick={() => dispatch(removeProduct(product.id))}
            className="bg-custom-yellow text-black px-3 py-1 mt-2 rounded text-sm w-fit mx-auto sm:mx-0"
          >
            Remove
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center text-lg text-gray-600 py-20">
      No products in estimation
    </div>
  )}
</div>



        {/* Total and Contact Section */}
        {products.length > 0 && (
          <div className="px-6 sm:px-10 md:px-20 py-10 mt-10 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6 ">
            <p className="text-lg sm:text-xl font-semibold">Total: ₹{total}</p>
            <button
              className="bg-custom-yellow px-6 py-2 rounded font-medium text-base sm:text-lg"
              onClick={handleContactClick}
            >
              Contact for purchasing
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
