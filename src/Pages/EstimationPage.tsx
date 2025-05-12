
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeProduct, clearAll } from "../redux/estimationSlice";
import { Navbar, Footer } from "../common";

export const EstimationPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.estimation.products);

  const total = products.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto px-30 flex flex-col justify-between">
        <div className="relative px-20 py-10 flex justify-center items-center">
          <h1 className="text-3xl font-bold">Estimation Page</h1>
          <button onClick={() => dispatch(clearAll())} className="text-xl absolute right-20 bg-custom-yellow px-4 py-2 rounded font-medium">
            Remove all
          </button>
        </div>

        <div className="px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-row gap-4 text-xl p-4 rounded items-start">
              <div className="flex flex-col items-center mt-2 gap-2">
                <img src={product.img} alt="product" className="w-32 h-40 object-cover" />
                {/* <div className="text-lg text-center">₹{product.price}</div> */}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-medium">Mens printed t-shirts</h2>
                <p>GSM: {product.gsm}</p>
                <p>Color: {product.color}</p>
                <p>Size: {product.size}</p>
                <p>Type: {product.type}</p>
                <p>Total: ₹{product.price}</p>
                <button onClick={() => dispatch(removeProduct(product.id))} className="bg-custom-yellow px-4 py-2 rounded font-medium mt-2 w-fit">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-20 py-10 flex justify-center gap-12 items-center mt-10">
          <p className="text-xl font-medium">Total: ₹{total}</p>
          <button className="bg-custom-yellow px-6 py-2 rounded font-medium text-xl">
            Contact for purchasing
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
