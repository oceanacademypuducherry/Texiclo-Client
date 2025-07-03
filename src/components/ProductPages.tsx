import { useEffect, useState } from "react";
import { Footer, Navbar } from "../common";
import {  PRODUCT } from "../assets";

export const ProductPages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPage = 4;

  // 🧾 Static Product Data
  const allProducts = [
    {
      _id: "1",
      name: "Polo",
      description: "Polo | Full Sleeve Shirt",
      price: 400,
      originalPrice: 562,
      discount: "30% off",
      image: PRODUCT, // You can replace with actual path or online image
      colors: ["#000000", "#FF0000", "#008000", "#D2B48C", "#FFFFFF"],
    },
    {
      _id: "2",
      name: "Casual",
      description: "Casual | Half Sleeve",
      price: 499,
      originalPrice: 599,
      discount: "20% off",
      image: PRODUCT,
      colors: ["#000", "#blue", "#gray"],
    },
    {
      _id: "3",
      name: "Formal",
      description: "Formal | Full Sleeve",
      price: 600,
      originalPrice: 850,
      discount: "25% off",
      image: PRODUCT,
      colors: ["#222", "#999", "#ccc"],
    },
    {
      _id: "4",
      name: "T-Shirt",
      description: "Round Neck T-Shirt",
      price: 350,
      originalPrice: 400,
      discount: "12% off",
      image: PRODUCT,
      colors: ["#111", "#EEE", "#BBB"],
    },
  ];

  // 🔍 Search Filter
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="w-full max-w-[1200px] mx-auto flex-grow px-4 sm:px-6 md:px-10 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14">
          Products
        </h2>

        {/* 🔍 Search Input */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search products..."
            className="border px-4 py-2 rounded w-full max-w-md"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>

        {/* 📦 Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {paginatedProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 flex flex-col items-center text-center shadow hover:shadow-md transition cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />

              {/* Color Options */}
              <div className="flex gap-1 mb-2">
                {product.colors.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs ml-1">+{product.colors.length - 4}</span>
                )}
              </div>

              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>

              {/* Pricing */}
              <div className="mt-2">
                <span className="text-lg font-bold">₹{product.price}</span>{" "}
                <span className="line-through text-gray-400 text-sm">
                  ₹{product.originalPrice}
                </span>{" "}
                <span className="text-green-600 text-sm">{product.discount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 🔢 Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded border ${
                  currentPage === i ? "bg-black text-white" : "bg-white"
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
