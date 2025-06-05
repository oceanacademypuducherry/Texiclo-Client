import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

export const Collection = () => {
  const navigate = useNavigate();

  const {data:collections} = useSelector(
    (state: RootState) => state.collections
  );
  console.log(collections, "collections");

  const shouldShowViewMore = collections?.length >= 5;

  // useEffect(() => {
  //   dispatch(setCollections(Collections));
  // }, [dispatch]);

  return (
    <section className="w-[90%] max-w-[1400px] mx-auto px-4 md:px-10 lg:px-14 pt-0 lg:pt-20 pb-10 md:pb-10 lg:pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {collections?.map((collection) => (
          <div key={collection.id} className="collection-card">
            <div
              className="relative w-full h-[300px] bg-white rounded-xl overflow-hidden cursor-pointer"
              onClick={() =>
                navigate(`/products/?collectionId=${collection.id}`)
              }
            >
              {/* Image Centering */}
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={collection.imageUrl}
                  alt={collection.name}
                  className="max-w-full h-[300px] object-contain"
                />
              </div>

              {/* Bottom dark overlay only where text appears */}
              <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-black/09 z-10" />

              {/* Text overlay inside the bottom section */}
              <div className="absolute bottom-3 left-2 right-2 text-center z-20">
                <h3 className="inline-block text-white text-[20px] font-bold px-3 py-3 rounded">
                  {collection.name}
                </h3>
              </div>
            </div>
          </div>
        ))}

        {shouldShowViewMore && (
          <div
            className="h-[300px] bg-custom-yellow rounded-xl flex items-center justify-center shadow hover:bg-yellow-300 transition cursor-pointer"
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
