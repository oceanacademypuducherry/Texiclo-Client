import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollections } from "../redux/collectionSlice";
import { Collections } from "../constant/collection";
import { RootState } from "../app/store"; // adjust path as needed

export const CollectionPage = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state: RootState) => state.collections.collections);

  useEffect(() => {
    dispatch(setCollections(Collections));
  }, [dispatch]);

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-10">All Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {collections.map((item, index) => (
          <div key={index} className="overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[200px] object-contain"
            />
            <div className="p-4 text-center font-semibold text-lg">{item.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
