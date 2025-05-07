import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { RootState } from "../redux";
import { products as mockProducts } from "../constant/Product";
import { Navbar, Footer } from "../components";
import Pagination from "../components/Pagination";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom";

export const ProductPage = () => {
  const dispatch = useDispatch();
  // const { categoryId, collectionId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  console.log(categoryId);
  
  const collectionId = searchParams.get("collectionId");

  const products = useSelector((state: RootState) => state.products.products);                                                                                                                                                                                                                                                                                                                                                                                                                                     


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  // Filter products based on categoryId and/or collectionId
  const filteredProducts = products.filter((product) => {
    const matchCategory = categoryId ? String(product.categoryId) === String(categoryId) : true;
    const matchCollection = collectionId ? String(product.collectionId) === String(collectionId) : true;
    return matchCategory && matchCollection;
  });

  // Pagination
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="w-[90%] mx-auto flex-grow px-6 md:px-20 py-10">
        <h2 className="text-3xl font-bold text-center mb-14">Products</h2>
        <div className="flex justify-between items-center mb-12">
          <p className="text-custom-grey text-xl">
            showing {currentProducts.length} of {filteredProducts.length} results
          </p>

          <div className="relative">
            <input
              type="text"
              placeholder="search"
              className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none text-xl"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-custom-grey">
              <IoIosSearch />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.id} className="flex flex-col items-center text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <h3 className="mt-5 text-xl font-medium mb-3">
                  {product.name} ({product.color}, {product.type})
                </h3>
                <p className="text-custom-grey text-xl mb-3">₹{product.price}</p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border">-</button>
                  <span className="w-10 h-10 border px-3 py-1">{product.quantity}</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border">+</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl col-span-full text-center">No products found for this filter</p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};
