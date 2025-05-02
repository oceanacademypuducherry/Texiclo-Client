import { HOODIE, POLO, SWEATSHIRTS, TSHIRT } from "../assets";
import { ChevronLeft, ChevronRight } from "lucide-react"; 


const products = [
  { id: 1, name: "Hoodie (black, full sleeve)", price: "₹620", image:POLO },
  { id: 2, name: "Hoodie (black, sleeveless)", price: "₹650", image: HOODIE},
  { id: 3, name: "Hoodie (black, full sleeve)", price: "₹600", image: SWEATSHIRTS},
  { id: 4, name: "Hoodie (black, strap sleeveless)", price: "₹620", image: TSHIRT },
];

export const RelatedProducts = () => {
  return (
    <div className="w-[85%] relative mx-auto px-20">
        <button
              
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-0 hover:bg-gray-800"
            >
              <ChevronLeft size={24} />
            </button>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="rounded-xl overflow-hidden text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-fit rounded-xl"
                />
                <p className="mt-3 font-medium text-[20px]">{product.name}</p>
                <p className="text-custom-grey text-[20px]">{product.price}</p>
              </div>
            ))}
          </div>
          <button
             
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-custom-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
            >
              <ChevronRight size={24} />
            </button>
          </div>
  );
};

