import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeProduct, removeAllProducts } from "../redux/estimationSlice";
import { Navbar, Footer } from "../common";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

export const EstimationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.estimation.products);

  const total = products.reduce((acc, curr) => acc + curr.price, 0);

    const handleContactClick = async () => {
      console.log("Button clicked"); 
    const element = document.getElementById("estimation-section");
    if (!element) return;

    // Take screenshot of the estimation section
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png");

    // Save image to localStorage or pass via navigation state if needed
    localStorage.setItem("estimationScreenshot", image);

    // Redirect to home and scroll to contact section
    navigate("/#contactus");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col" id="estimation-section">
        <Navbar />
        
        <div className="w-[95%] max-w-[1400px] mx-auto flex flex-col flex-grow justify-between">
          {/* Header */}
          <div className="relative px-6 sm:px-10 md:px-20 py-10 sm:py-10 flex justify-between sm:justify-between items-center">
            <h1 className="text-[20px] sm:text-3xl font-bold sm:text-left sm:text-center">
              Estimation Page
            </h1>
            <button
              onClick={() => dispatch(removeAllProducts())}
              className="text-sm sm:text-base md:text-lg absolute right-6 sm:right-10 md:right-20 bg-custom-yellow px-3 sm:px-4 py-2 rounded font-medium sm:block"
            >
              Remove all
            </button>
          </div>

          {/* Products */}
          <div className="px-6 sm:px-6 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row gap-4 text-base sm:text-lg p-4 rounded sm:items-start md:items-start items-center border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-center sm:items-start sm:justify-start">
                    <img src={product.img} alt="product" className="w-32 h-40 object-contain" />
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2 text-center sm:text-left">
                    <h2 className="font-semibold">{product.name}</h2>
                    <p>Description: {product.description}</p>
                    <p>Color: {product.color}</p>
                    <p>Size: {product.size}</p>
                    <p>Type: {product.type}</p>
                    <p>Discount: {product.discount}%</p>
                    <p>Price: ₹{product.price}</p>
                    <button
                      onClick={() => dispatch(removeProduct(product.id))}
                      className="bg-custom-yellow px-3 py-1.5 rounded font-medium mt-2 w-fit text-sm sm:text-base sm:mx-0 mx-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-lg sm:text-xl font-medium text-gray-600 py-20">
                No products in estimation
              </div>
            )}
          </div>

          {/* Total + Contact */}
          {products.length > 0 && (
            <div className="px-4 sm:px-6 md:px-20 py-10 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6 mt-10">
              <p className="text-lg sm:text-xl font-medium">Total: ₹{total}</p>
              <button
                className="bg-custom-yellow px-6 py-2 rounded font-medium text-base sm:text-xl"
                onClick={handleContactClick}
              >
                Contact for purchasing
              </button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};
