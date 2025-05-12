import { Footer } from "../common/Footer";
import { Navbar } from "../common/Navbar";
import { ProductGalleryDescription } from "./ProductGalleryDescription";
import { RelatedProducts } from "./RelatedProducts";


export const  ViewProduct= () => {
  return (
    <div>
      <Navbar />
      <main className="w-[90%] mx-auto py-10">
        <h1 className="text-3xl font-bold mb-10 text-center">View Products</h1>
        <ProductGalleryDescription />
        <h2 className="text-xl font-bold mt-16 mb-12 text-center">Related Products</h2>
        <RelatedProducts />
      </main>
      <Footer />
    </div>
  );
};



