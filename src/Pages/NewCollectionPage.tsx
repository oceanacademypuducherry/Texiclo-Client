import { HOODIE, POLO, SWEATSHIRTS, TSHIRT } from "../assets";
import { IoIosSearch } from "react-icons/io";
import { Footer, Navbar } from "../components";



const products = [
  { name: "Hoodie(black, full sleeve)", price: "₹562", image: HOODIE },
  { name: "Hoodie(Red, sleeveless)", price: "₹562", image: POLO },
  { name: "Hoodie(Violet, crop full sleeve)", price: "₹562", image: TSHIRT },
  { name: "Hoodie(Green, crop sleeveless)", price: "₹562", image: SWEATSHIRTS },
];


export const NewCollectionPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="w-[90%] mx-auto flex-grow px-6 md:px-20 py-10">
        <h2 className="text-3xl font-bold text-center mb-14">New Collections</h2>
        <div className="flex justify-between items-center mb-12">
          <p className="text-custom-grey text-xl">showing 1–12 of 35 results</p>
          <div className="relative">
            <input
              type="text"
              placeholder="search"
              className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none text-xl"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2  text-custom-grey">   <IoIosSearch /></span>
         
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col items-center text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-md shadow-sm"
            />
            
           
            <h3 className="mt-5 text-xl font-medium mb-3 ">{product.name}</h3>
            
            
            <p className="text-custom-grey text-xl mb-3">{product.price}</p>
          
            
            <div className="flex items-center justify-center gap-3 mt-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border">-</button>
              <span className="w-10 h-10 border px-3 py-1">{1}</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border">+</button>
            </div>
          </div>
          
          ))}
        </div>

    
        <div className="flex justify-center items-center space-x-4 text-xl mb-10">
          <button className="w-10 h-10 rounded-full bg-custom-black text-white">1</button>
          <button className="w-10 h-10 rounded-full border">2</button>
          <button className="w-10 h-10 rounded-full border">3</button>
          <button className="text-3xl">&gt;&gt;</button>
        </div>
      </main>

     <Footer />
    </div>
  );
};


