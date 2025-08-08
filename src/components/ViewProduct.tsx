import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../common/Footer";
import { Navbar } from "../common/Navbar";
import { ProductGalleryDescription } from "./ProductGalleryDescription";
import { RelatedProducts } from "./RelatedProducts";

export const ViewProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId") || "";
  const collectionId = searchParams.get("collectionId") || "";

  // const handleBack = () => {
  //   navigate(`/products?categoryId=${categoryId}&collectionId=${collectionId}`);

  // };

  return (
    <div>
      <Navbar />

      {/* Back Button Section */}
      

      <main className="w-[90%] mx-auto py-10">
       <div className="w-full px-4 sm:px-6 md:px-10 mt-0 relative flex items-center justify-center mb-20">
  {/* Back Button (left corner) */}
  <button
    // onClick={() => navigate(-1)}
    onClick={() =>
    navigate(`/products?categoryId=${categoryId}&collectionId=${collectionId}`)
  }
    className="absolute -left-12 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base"
  >
    Back
  </button>

  {/* Centered Heading */}
  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
    View Products
  </h1>
</div>


        
        <ProductGalleryDescription />
        <h2 className="text-xl font-bold mt-16 mb-12 text-center">Related Products</h2>
        <RelatedProducts />
      </main>

      <Footer />
    </div>
  );
};






