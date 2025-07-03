import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { TEXICLO } from "../assets";
import { Menu, X } from "lucide-react"; // Or use Heroicons or SVGs

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const products = useSelector((state: RootState) => state.estimation.products);
  const productCount = products.length;

  return (
    <header className="w-full bg-custom-yellow text-custom-black p-4 md:p-6">
      <nav className="flex justify-between items-center px-4 md:px-10">
        <img src={TEXICLO} alt="Texiclo Logo" className="w-24" />

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center relative">
          <Link
            to="/"
            className="text-xl font-semibold hover:text-blue-600 transition"
          >
            Home
          </Link>

          <div className="relative">
            <Link
              to="/estimation"
              className="text-xl font-semibold hover:text-blue-600 transition"
            >
              Estimation
            </Link>
            {productCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {productCount}
              </span>
            )}
          </div>

          <Link
            to="/#contactus"
            className="text-xl font-semibold hover:text-blue-600 transition"
          >
            ContactUs
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden pt-5">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-custom-yellow shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="rounded-full p-2 bg-black text-white shadow-md  transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col space-y-4 px-6 pt-2">
          <Link
            to="/"
            className="text-lg font-semibold hover:text-blue-600 hover:bg-blue-100 rounded px-3 py-2 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <div className="relative">
  <Link
    to="/estimation"
    className="block w-full text-lg font-semibold hover:text-blue-600 hover:bg-blue-100 rounded px-3 py-2 transition"
    onClick={() => setIsOpen(false)}
  >
    Estimation
  </Link>
  {productCount > 0 && (
    <span className="absolute top-3 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
      {productCount}
    </span>
  )}
</div>


          <Link
            to="/#contactus"
            className="text-lg font-semibold hover:text-blue-600 hover:bg-blue-100 rounded px-3 py-2 transition"
            onClick={() => setIsOpen(false)}
          >
            ContactUs
          </Link>
        </div>
      </div>
    </header>
  );
};
