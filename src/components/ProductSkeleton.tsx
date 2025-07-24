import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row gap-8 mb-16 animate-pulse">
      {/* Left thumbnails and main image */}
      <div className="flex gap-4 flex-col sm:flex-row sm:items-start">
        <div className="flex sm:flex-col gap-2 max-h-[28rem] pr-1 w-auto sm:w-24">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded"
              />
            ))}
        </div>
        <div className="w-72 h-72 sm:w-[28rem] sm:h-[28rem] bg-gray-200 rounded shadow-md" />
      </div>

      {/* Right product details */}
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
        <div className="flex gap-2 mt-2">
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="w-16 h-8 bg-gray-200 rounded" />
            ))}
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mt-4" />
        <div className="flex gap-3 mt-4">
          <div className="w-32 h-10 bg-gray-200 rounded" />
          <div className="w-40 h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
