import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer, Navbar } from "../common";
import { GetAllProductAPI } from "../features/api";
import { FiSearch } from "react-icons/fi";

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

  useEffect(() => {
    const payload = {
      categoryId,
      collectionId,
      search: searchQuery,
      page: currentPage,
    };
    dispatch(GetAllProductAPI(payload));
  }, [categoryId, collectionId, currentPage, searchQuery]);

  const { data, isLoading } = useSelector((state: RootState) => state.product);

  const products = data?.productValues || [];
  const meta = data?.meta || {
    totalPages: 1,
    currentPage: 1,
    totalData: 0,
    perPage: 4,
  };

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
          {/* 🔙 Back Button */}
      <div className="relative flex items-center justify-center mt-5 mb-0 sm:mb-14 h-14">
  {/* Back Button at Left Corner */}
  <button
    onClick={() => navigate("/")}
    className="absolute left-10 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base"
  >
     Back
  </button>

  {/* Centered Heading */}
  <h2 className="text-2xl sm:text-3xl font-bold text-center">
    Products
  </h2>
</div>
      <main className="w-full max-w-[1200px] mx-auto flex-grow px-4 sm:px-6 md:px-10 py-10">
        
    

        {/* 🔍 Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="w-3/4 mx-auto md:mx-0 sm:w-full md:w-1/2">
            <div className="flex justify-start mb-6 sm:mb-8">
              <div className="relative w-full">
                <span className="absolute left-3 top-2.5 text-gray-400 text-lg">
                  <FiSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search by product name"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(0);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 🧱 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col animate-pulse bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="w-full h-48 bg-gray-200 rounded mb-3" />
                <div className="flex items-center mb-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full bg-gray-300 border mr-1"
                    />
                  ))}
                </div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
className="flex flex-col items-start mr-[42px] ml-[42px]  sm:mr-0 sm:ml-0  text-left cursor-pointer bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                // onClick={() =>
                //   (window.location.href = `/viewproduct/${product._id}`)
                // }
                onClick={() => navigate(`/viewproduct/${product._id}?categoryId=${categoryId}&collectionId=${collectionId}`)}

              >
                <img
                  src={product.variantInfo?.[0]?.variantImage}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-3"
                />
                {Array.isArray(product.variantInfo) && (
                  <div className="flex items-center mb-2">
                    {product.variantInfo.slice(0, 4).map((variant, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full mr-1 border"
                        style={{ backgroundColor: variant.color?.code }}
                        title={variant.color?.name}
                      />
                    ))}
                    {product.variantInfo.length > 4 && (
                      <span className="text-sm text-gray-600 ml-1">
                        +{product.variantInfo.length - 4}
                      </span>
                    )}
                  </div>
                )}
                <h3 className="text-base font-semibold mb-1 text-gray-800">
                  {product.name}
                </h3>
                {Array.isArray(product.prices) &&
                  product.prices.length > 0 && (
                    <div className="text-sm font-medium">
                      <span className="text-black text-xl mr-2">
                        ₹
                        {product.discountPercentage
                          ? Math.round(
                              product.prices[0].amount -
                                (product.prices[0].amount *
                                  product.discountPercentage) /
                                  100
                            )
                          : Math.round(product.prices[0].amount)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <>
                          <span className="line-through text-gray-400 mr-2">
                            ₹{product.prices[0].amount}
                          </span>
                          <span className="text-green-600">
                            {product.discountPercentage}% off
                          </span>
                        </>
                      )}
                    </div>
                  )}
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
                onClick={() => handlePageChange(i)}
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
