import { HOODIE, POLO, SWEATSHIRTS, TSHIRT } from "../assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const products = [
  { id: 1, name: "Hoodie (black, full sleeve)", price: "₹620", image: POLO },
  { id: 2, name: "Hoodie (black, sleeveless)", price: "₹650", image: HOODIE },
  { id: 3, name: "Hoodie (black, full sleeve)", price: "₹600", image: SWEATSHIRTS },
  { id: 4, name: "Hoodie (black, strap sleeveless)", price: "₹620", image: TSHIRT },
];

export const RelatedProducts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full px-4 sm:px-8 md:px-16 lg:px-20 max-w-screen-xl mx-auto my-10">
      {/* Chevron Buttons for md+ screens */}
      <button
        onClick={() => scroll(-300)}
        className="hidden md:flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        ref={scrollRef}
        className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[250px] md:min-w-0 shrink-0 rounded-xl overflow-hidden text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain rounded-xl"
            />
            <p className="mt-3 font-medium text-lg">{product.name}</p>
            <p className="text-custom-grey text-lg">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Right Chevron for md+ screens */}
      <button
        onClick={() => scroll(300)}
        className="hidden md:flex absolute right-2 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
