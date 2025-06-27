import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer, Navbar, SearchBar } from "../common";
import { GetAllProductAPI } from "../features/api";


export const ProductPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const categoryId = searchParams.get("categoryId") || "";
  const collectionId = searchParams.get("collectionId") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const topRef = useRef<HTMLDivElement>(null);

  // 🔁 Fetch products based on page/category/collection
  useEffect(() => {
    const payload = {
      categoryId,
      collectionId,
      search: searchQuery,
      page: currentPage,
    };
    dispatch(GetAllProductAPI(payload));
  }, [categoryId, collectionId, currentPage,searchQuery]);

  const { data, isLoading, isError } = useSelector(
    (state: RootState) => state.product
  );
  const products = data?.productValues || [];
  const meta = data?.meta || { totalPages: 1, currentPage: 1, totalData: 0 };

  const filteredProducts = products; // Already filtered from backend

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="w-full max-w-[1200px] mx-auto flex-grow px-4 sm:px-6 md:px-10 py-10">
        <div ref={topRef} />
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14">
          Products
        </h2>

        {/* 🔍 Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="w-3/4 mx-auto md:mx-0 sm:w-full md:w-1/2">
            {/* <SearchBar
              onSearch={query => {
                setSearchQuery(query);
                handlePageChange(1); // reset to page 1 on search
              }}
            /> */}
            {/* <SearchBar
  onSearch={(query) => {
    setSearchQuery(query);
    setCurrentPage(0); // ✅ reset to first page when searching
  }}
/> */}

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {isLoading ? (
            <p className="text-center col-span-full">Loading...</p>
          ) : isError ? (
            <p className="text-center text-red-500 col-span-full">
              Error loading products
            </p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-col items-center text-center cursor-pointer bg-white rounded-lg p-4 transition-transform hover:scale-[1.02]"
                onClick={() => navigate(`/viewproduct/${product._id}`)}
              >
                <img
                  src={product.image?.Image || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-56 object-contain rounded-md mb-4"
                />
                <h3 className="text-base sm:text-lg md:text-xl font-medium mb-2">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base md:text-lg">
                  {product.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-lg col-span-full text-center">
              No products found
            </p>
          )}
        </div>

        {/* 🔢 Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex justify-center gap-4">
            {Array.from({ length: meta.totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border rounded ${
                  currentPage === i
                    ? "bg-black text-white"
                    : "bg-white border-gray-400"
                }`}
                onClick={() => handlePageChange(i )} 
              >
                {i + 1} 
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
