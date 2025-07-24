import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { useState } from "react";
import {
  removeProduct,
  removeAllProducts,
  incrementQuantity,
  decrementQuantity,
} from "../features/slice/estimationSlice";

import { Navbar, Footer } from "../common";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { ContactForm } from "../components";

export const EstimationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.estimation.products);
  const [showModal, setShowModal] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // ✅ Total price calculation
  const total = products.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  const handleContactClick = async () => {
    const element = document.getElementById("estimation-section");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const image = canvas.toDataURL("image/png");
      setScreenshot(image);
      setShowModal(true);
    } catch (error) {
      console.error("Error capturing estimation section:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" id="estimation-section">
      <Navbar />

      <div className="flex-grow w-[95%] max-w-[1400px] mx-auto">
        {/* Header */}
        {/* Header (only if products exist) */}
{products.length > 0 && (
  <div className="relative px-6 sm:px-10 md:px-20 py-10 flex justify-between items-center">
    <h1 className="text-[20px] sm:text-3xl font-bold">Estimation Page</h1>
    <button
      onClick={() => dispatch(removeAllProducts())}
      className="text-sm sm:text-base bg-custom-yellow px-4 py-2 rounded font-medium"
    >
      Remove all
    </button>
  </div>
)}


        {/* Conditional Rendering */}
        {products.length === 0 ? (
          <div className="flex-1 flex justify-center items-center">
  <p className="text-center text-lg text-gray-600 mt-60">No products in estimation</p>
</div>

        ) : (
          <>
            {/* Product Grid */}
            <div className="px-6 sm:px-10 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-base">
              {products.map((product) => (
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
                    <p>GSM: {product.gsm}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-black-600 text-sm">
                        Price: ₹{product.price}
                      </span>
                    </div>
                    <button
                      onClick={() => dispatch(removeProduct(product.id))}
                      className="bg-custom-yellow text-black px-3 py-1 mt-2 rounded text-sm w-fit mx-auto sm:mx-0"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total + Contact */}
            <div className="px-6 sm:px-10 md:px-20 py-10 mt-10 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6 ">
              <p className="text-lg sm:text-xl font-semibold">
                Total: ₹{Math.round(total).toLocaleString()}
              </p>
              <button
                className="bg-custom-yellow px-6 py-2 rounded font-medium text-base sm:text-lg"
                onClick={handleContactClick}
              >
                Contact for purchasing
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Contact Form</h2>
            <ContactForm
              requireScreenshot
              screenshot={screenshot || ""}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
