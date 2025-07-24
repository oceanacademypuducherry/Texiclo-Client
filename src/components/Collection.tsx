import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const Collection = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSelector((state: RootState) => state.collections);
  const collections = Array.isArray(data) ? data : [];

  const displayedCollections = collections.slice(0, 4);
  const shouldShowViewMore = collections.length > 4;

  const showSkeleton = isLoading || collections.length === 0;

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-14 pt-0 lg:pt-20 pb-6 md:pb-10 lg:pb-20">
      <div className="flex flex-wrap justify-center gap-6">
        {showSkeleton
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse  rounded-xl h-[300px] w-[280px] shadow flex items-center justify-center"
              >
                <div className="h-full w-full bg-gray-200 rounded-xl" />
              </div>
            ))
          : displayedCollections.map((collection) => (
              <div
                key={collection.id}
                className="relative w-[280px] h-[300px] bg-white rounded-xl overflow-hidden cursor-pointer shadow"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate(`/products/?collectionId=${collection._id}`);
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={collection.imageUrl}
                    alt={collection.name}
                    className="max-w-full h-[300px] object-contain"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-black/10 z-10" />

                <div className="absolute bottom-1 left-2 right-2 text-center z-20">
                  <h3 className="inline-block text-white text-[20px] font-bold px-3 py-3 rounded">
                    {collection.name}
                  </h3>
                </div>
              </div>
            ))}

        {!showSkeleton && shouldShowViewMore && (
          <div
            className="h-[300px] w-[280px] bg-custom-yellow rounded-xl flex items-center justify-center shadow hover:bg-yellow-300 transition cursor-pointer"
            onClick={() => navigate("/collection")}
          >
            <span className="text-xl font-semibold text-custom-black">
              View More
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
