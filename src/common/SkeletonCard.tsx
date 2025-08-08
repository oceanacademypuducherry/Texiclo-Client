import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col sm:flex-row items-center sm:items-start p-4 rounded border border-gray-200 shadow-sm bg-gray-50 gap-4">
      <div className="flex flex-col items-center gap-2">
        {/* Actual image placeholder (blurred) */}
        <div className="w-40 h-40 mt-3 overflow-hidden rounded bg-gray-300">
          <img
            src="/images/placeholder.png" // replace with your image path
            alt="loading"
            className="w-full h-full object-cover blur-sm opacity-70"
          />
        </div>

        <div className="flex flex-col gap-2 items-center mt-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="w-6 h-6 bg-gray-300 rounded" />
          </div>
          <div className="w-20 h-6 bg-gray-300 rounded" />
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 text-center sm:text-left">
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto sm:mx-0" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
        <div className="h-4 bg-gray-200 rounded w-3/6" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  );
};

export default SkeletonCard;
