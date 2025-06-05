import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollections } from "../redux/collectionSlice";
import { Collections } from "../constant/collection";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

interface CollectionData {
  imageUrl: string;
  name: string;
  _id: string;
}

export const CollectionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: collections = [] } = useSelector((state: RootState) => state.collections) as { data: CollectionData[] };

  console.log(collections, "collections");

  useEffect(() => {
    dispatch(setCollections(Collections));
  }, [dispatch]);

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-10">All Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {collections?.map((collection) => (
          <div
            key={collection._id}
            className="overflow-hidden cursor-pointer"
            onClick={() => navigate(`/products/?collectionId=${collection._id}`)}
          >
            <img
              src={collection.imageUrl}
              alt={collection.name}
              className="w-full h-[200px] object-contain"
            />
            <div className="p-4 text-center font-semibold text-lg">
              {collection.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
