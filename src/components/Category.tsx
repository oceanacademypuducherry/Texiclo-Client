import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/categorySlice";
import { categoryData } from "../constant/category";
import { RootState } from "../app/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Product = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state: RootState) => state.categories.categories);

  useEffect(() => {
    dispatch(setCategories(categoryData));
  }, [dispatch]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const card = container.querySelector(".product-card") as HTMLElement;
      const cardWidth = card?.offsetWidth || 250;
      container.scrollBy({
        left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-[85%] mx-auto px-4 sm:px-6 md:px-10 lg:px-20  pb-0 sm:pb-10">
      <div className="text-center mb-12">
        <h2 className="text-[20px] md:text-3xl font-bold">Choose Your Category</h2>
        <p className="text-custom-grey mt-2 max-w-xl mx-auto text-[16px] md:text-[20px]">
          Explore a variety of categories to create unique T-shirts that match your personality.


        </p>
      </div>

      <div className="relative">
        {/* Only show scroll buttons on large screens */}
        <button
          onClick={() => scroll("left")}
          className="hidden lg:flex absolute -left-10 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="overflow-hidden">
  <div
    ref={scrollRef}
    className="
      flex gap-4 py-4
      overflow-x-auto scroll-smooth 
      scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
      lg:overflow-x-hidden lg:scrollbar-none
    "
  >
    {categories.map((category) => (
      <div
        key={category.id}
        className="product-card flex-shrink-0 w-[250px] rounded-xl overflow-hidden text-center cursor-pointer  transition"
        onClick={() => navigate(`/products/?categoryId=${category.id}`)} 
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-72 object-contain rounded-xl"
        />
        <p className="mt-3 font-medium text-[16px] md:text-[20px]">{category.name}</p>
      </div>
    ))}

    <a
      href="/category"
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[220px] h-72 bg-custom-yellow rounded-xl flex items-center justify-center text-center cursor-pointer shadow hover:bg-yellow-300 transition"
    >
      <span className="md:text-xl text-[16px] font-semibold text-custom-black px-4">
        View More Category
      </span>
    </a>
  </div>
</div>


        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute -right-10 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};
