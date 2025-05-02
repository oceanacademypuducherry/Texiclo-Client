import { CROPTOP, HOODIE, POLO, SWEATSHIRTS, TSHIRT } from "../assets";
import { Footer, Navbar } from "../components";

const products = [
  { id: 1, img: POLO },
  { id: 2, img: TSHIRT },
  { id: 3, img: SWEATSHIRTS },
  { id: 4, img: CROPTOP },
  { id: 5, img: HOODIE },
  { id: 6, img: POLO },
  { id: 7, img: TSHIRT },
];

export const EstimationPage = () => {
  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto px-30 flex flex-col justify-between">
     
        <div className="relative px-20 py-10 flex justify-center items-center">
          <h1 className="text-3xl font-bold">Estimation Page</h1>
          <button className="text-xl absolute right-20 bg-custom-yellow px-4 py-2 rounded font-medium">
            Remove all
          </button>
        </div>

        
        <div className="px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map((product) => (
    <div
      key={product.id}
      className="flex flex-row gap-4 text-xl  p-4 rounded items-start"
    >
     
      <div className="flex flex-col items-center mt-2 gap-2">
        <img
          src={product.img}
          alt="product"
          className="w-32 h-40 object-cover "
        />
        <div className="flex items-center gap-2 mt-2">
          <button className="w-8 h-8 rounded-full border text-lg flex items-center justify-center">
            -
          </button>
          <div className="px-4 py-1 border rounded text-lg">1</div>
          <button className="w-8 h-8 rounded-full border text-lg flex items-center justify-center">
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-xl ">Mens printed t-shirts</h2>
        <p>
          Size:
          <select className="ml-2 border px-2 py-1 rounded text-xl">
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
            <option>3XL</option>
          </select>
        </p>
        <p>Total: ₹680</p>
        <p className="text-custom-darkgreen">Discount applied 80% Off</p>
        <button className="bg-custom-yellow px-4 py-2 rounded font-medium mt-2 w-fit">
          Remove
        </button>
      </div>
    </div>
  ))}
</div>

        <div className="px-20 py-10 flex justify-center gap-12 items-center mt-10">
          <p className="text-xl font-medium">Total: ₹2899</p>
          <button className="bg-custom-yellow px-6 py-2 rounded font-medium text-xl">
            Contact for purchasing
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
