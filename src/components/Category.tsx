import { HOODIE, POLO, SWEATSHIRTS, TSHIRT } from "../assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Polo", image: POLO },
  { id: 2, name: "Hoodie", image: HOODIE },
  { id: 3, name: "T-shirt", image: TSHIRT },
  { id: 4, name: "Sweatshirt", image: SWEATSHIRTS },
  { id: 5, name: "Crop Top", image: POLO },
  { id: 6, name: "Sportswear", image: HOODIE },
  { id: 7, name: "Polo Wear", image: TSHIRT },
];

export const Product = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    <section className="w-[85%] mx-auto px-6 pb-20 md:px-20">
     
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold">Choose Your Category</h2>
        <p className="text-custom-grey mt-2 max-w-xl mx-auto text-[20px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing maecenas quis iaculis quam.
        </p>
      </div>

      <div className="relative">
        
        <button
          onClick={() => scroll("left")}
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-0 overflow-x-auto   scroll-smooth no-scrollbar"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card flex-shrink-0 w-[250px] rounded-xl overflow-hidden text-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-contain rounded-xl"
                />
                <p className="mt-3 font-medium text-[20px]">{product.name}</p>
              </div>
            ))}

            
<a
  href="/category"
  target="_blank"
  rel="noopener noreferrer"
  className="flex-shrink-0 w-[220px] h-72 bg-custom-yellow rounded-xl flex items-center justify-center text-center cursor-pointer shadow hover:bg-yellow-300 transition"
>
  <span className="text-xl font-semibold text-custom-black px-4">
    View More Category
  </span>
</a>

          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};
