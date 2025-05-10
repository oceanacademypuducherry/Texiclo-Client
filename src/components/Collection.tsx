import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCollections } from "../redux/collectionSlice";
import { RootState } from "../app/store"; 
import { Collections } from "../constant/collection"; 

export const Collection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  

  const collections = useSelector((state: RootState) => state.collections.collections);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const shouldShowViewMore = collections.length >= 5;

  useEffect(() => {
    dispatch(setCollections(Collections)); 
  }, [dispatch]);

  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      if (el) setShowArrows(el.scrollWidth > el.clientWidth);
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [collections]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const card = container.querySelector(".collection-card") as HTMLElement;
      const cardWidth = card?.offsetWidth || 250;
      container.scrollBy({
        left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-[80%] max-w-[1400px] mx-auto px-14 py-20 relative">
      {showArrows && (
        <>
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-custom-black text-white p-2 rounded-full hover:bg-gray-800">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-custom-black text-white p-2 rounded-full hover:bg-gray-800">
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="overflow-hidden">
        <div ref={scrollRef} className={`flex gap-6 overflow-x-auto scroll-smooth no-scrollbar ${collections.length < 5 ? "justify-center" : ""}`}>
          {collections.map((collection) => (
            <div key={collection.id} className="flex-shrink-0 w-[250px] collection-card">
              <div
  className="relative rounded-xl overflow-hidden w-full h-[300px] cursor-pointer"
  onClick={() => navigate(`/products/?collectionId=${collection.id}`)}
>
  <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
  <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold z-10">
    {collection.name}
  </h3>
</div>

            </div>
          ))}

          {shouldShowViewMore && (
            <div
              className="flex-shrink-0 w-[250px] h-[300px] bg-custom-yellow rounded-xl flex items-center justify-center shadow hover:bg-yellow-300 transition cursor-pointer"
              onClick={() => navigate("/collection")}
            >
              <span className="text-xl font-semibold text-custom-black">View More</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
