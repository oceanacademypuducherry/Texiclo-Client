import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { setAllProducts } from "../redux/viewproductSlice";
import { RootState } from "../redux";
import { products as mockProducts } from "../constant/Product";
import {viewproducts} from "../constant/viewproduct"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Pagination } from "../common/Pagination";
import { Footer, Navbar, SearchBar } from "../common";


export const ProductPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  const collectionId = searchParams.get("collectionId");
  const [searchQuery, setSearchQuery] = useState("");
  // Convert categoryId to number if your product.categoryId is a number
  const categoryIdNum = categoryId ? Number(categoryId) : null;

  const products = useSelector((state: RootState) => state.products.products);
  const varientProduct = useSelector((state:RootState)=> state.viewproduct.products)
  console.log(varientProduct,"varientProduct");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const topRef = useRef<HTMLDivElement>(null);

  // Set mock products to Redux
  useEffect(() => {
    dispatch(setProducts(mockProducts));
    dispatch(setAllProducts(viewproducts));
  }, [dispatch]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, collectionId]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

//  const filteredProducts = products.filter(product => product.categoryId === categoryIdNum);

//   console.log(filteredProducts,"filteredProducts")

// Assume this categoryId to filter on
const filterCategoryId = categoryIdNum;

// Step 1: Filter products by categoryId
const filteredProductsByCategory = products.filter(p => p.categoryId === filterCategoryId);

console.log(filteredProductsByCategory,"filteredProductsByCategory");


// Step 2: Get filtered product IDs
const filteredProductIds = filteredProductsByCategory.map(p => p.id);

// Step 3: Find variants with productId in filtered product IDs
const filteredVariants = viewproducts.filter(v => filteredProductIds.includes(v.productId));

// Step 4: Get variant IDs from filtered variants
const filteredVariantIds = filteredVariants.map(v => v.id);

// Step 5: Filter viewProducts to only those with ids in filteredVariantIds
const filteredViewProducts = viewproducts.filter(vp => filteredVariantIds.includes(vp.id));

console.log(filteredViewProducts,"sjfskjfk");

  

 const finalFilteredProducts = filteredViewProducts.filter((product) => {
  const searchableText = `
    ${product.name}
    ${product.color}
    ${product.type}
    ${product.total}
  `.toLowerCase();

  return searchableText.includes(searchQuery.toLowerCase());
});

const totalPages = Math.ceil(finalFilteredProducts.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const currentProducts = finalFilteredProducts.slice(startIndex, startIndex + itemsPerPage);



  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="w-[90%] mx-auto flex-grow px-6 md:px-20 py-10">
        <div ref={topRef} />

        <h2 className="text-3xl font-bold text-center mb-14">Products</h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
  <div className="w-full md:w-1/2">
    <SearchBar onSearch={(query) => {
      setSearchQuery(query);
      setCurrentPage(1); 
    }} />
  </div>
  {/* <p className="text-custom-grey text-xl self-end md:self-center">
    Showing {currentProducts.length} of {filteredProducts.length} results
  </p> */}
</div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.id} className="flex flex-col items-center text-center cursor-pointer"
               onClick={() => navigate(`/viewproduct/${product.id}`)}>
                <img src={product.image.Image} alt={product.name} className="w-full h-auto rounded-md shadow-sm" />
                <h3 className="mt-5 text-xl font-medium mb-3">
                  {product.name} ({product.color}, {product.type})
                </h3>
                <p className="text-custom-grey text-xl mb-3">₹{product.total}</p>
                {/* <div className="flex items-center justify-center gap-3 mt-2">
  <button
    className="w-10 h-10 flex items-center justify-center rounded-full border"
    onClick={() => dispatch(decreaseQuantity(product.id))}
    disabled={product.quantity === 1}
  >
    -
  </button>
  <span className="w-10 h-10 border flex items-center justify-center">
    {product.quantity}
  </span>
  <button
    className="w-10 h-10 flex items-center justify-center rounded-full border"
    onClick={() => dispatch(increaseQuantity(product.id))}
  >
    +
  </button>
</div> */}

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
