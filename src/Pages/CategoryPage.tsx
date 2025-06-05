import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/categorySlice";
import { RootState } from "../app/store";
import { categoryData } from "../constant/category";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../common/Pagination";
import { Footer, Navbar, SearchBar } from "../common";

interface CategoryData{
  imageUrl: string,
  name: string, 
  _id: string
}

export const CategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const categories = useSelector((state: RootState) => state.category?.data ?? []) as CategoryData[];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(setCategories(categoryData));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-[90%] mx-auto flex-grow px-6 md:px-20 py-10">
        <h2 className="text-3xl font-bold text-center mb-14">Categories</h2>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center mb-12 gap-4">
  <SearchBar onSearch={setSearchQuery} />
  <p className="text-custom-grey text-xl text-center md:text-right">
    Showing {filteredCategories.length === 0 ? 0 : startIndex + 1}–
    {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length} results
  </p>
</div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {currentCategories.length > 0 ? (
            currentCategories.map((category) => (
              <div
                key={category._id}
                className="flex flex-col items-center text-xl cursor-pointer"
                onClick={() => navigate(`/products/?categoryId=${category._id}`)}
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <h3 className="mt-2 text-md font-medium capitalize">{category.name}</h3>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg text-gray-500">No categories found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
