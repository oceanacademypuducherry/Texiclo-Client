import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../common";
import { GetAllCategoryAPI } from "../features/api";
import { FiSearch } from "react-icons/fi";

let debounceTimeout: NodeJS.Timeout;

export const CategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Local loading state

  const { data: categories = [], meta } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      GetAllCategoryAPI({
        page,
        search,
        withMeta: true,
      }) as any
    ).finally(() => setIsLoading(false));
  }, [page, search]);

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 400);
  }, [searchInput]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-[90%] mx-auto flex-grow px-4 sm:px-6 md:px-20 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
          Categories
        </h2>

        {/* 🔍 Search Bar */}
        <div className="flex justify-start mb-6 sm:mb-8">
          <div className="relative w-full max-w-md">
            <span className="absolute left-3 top-2.5 text-gray-400 text-lg">
              <FiSearch />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* 🗂 Category Grid or Skeleton Loader */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 justify-items-center">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full max-w-[250px] rounded-xl overflow-hidden text-center animate-pulse"
                >
                  <div className="w-full h-64 sm:h-72 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              ))
            : categories.map((category: any) => (
                <div
                  key={category._id}
                  className="product-card w-full max-w-[250px] rounded-xl overflow-hidden text-center cursor-pointer transition"
                  onClick={() =>
                    navigate(`/products/?categoryId=${category._id}`)
                  }
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-64 sm:h-72 object-contain rounded-xl"
                  />
                  <p className="mt-3 font-medium text-sm sm:text-base md:text-lg">
                    {category.name}
                  </p>
                </div>
              ))}
        </div>

        {/* Pagination */}
        {!isLoading && meta?.totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
            {Array.from({ length: meta.totalPages }, (_, index) => {
              const currentPage = index + 1;
              const isActive = currentPage === page;

              return (
               <button
  key={currentPage}
  onClick={() => {
    setPage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border rounded transition
    ${isActive
      ? "bg-black text-white"
      : "bg-white text-black border-gray-400 hover:bg-gray-100"}`}
>
  {currentPage}
</button>

              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
