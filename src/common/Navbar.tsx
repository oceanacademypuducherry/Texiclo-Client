import { useState } from "react";
import { Link } from "react-router-dom";
import { TEXICLO } from "../assets";
import { Menu, X } from "lucide-react"; // Or use Heroicons or SVGs

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-custom-yellow text-custom-black p-4 md:p-6">
      <nav className="flex justify-between items-center px-4 md:px-10">
        <img src={TEXICLO} alt="Texiclo Logo" className="w-24" />

        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-xl font-semibold hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/estimation"
            className="text-xl font-semibold hover:text-blue-600 transition"
          >
            Estimation
          </Link>
          <Link
            to="/#contact"
            className="text-xl font-semibold hover:text-blue-600 transition"
          >
            ContactUs
          </Link>
        </div>

        <div className="md:hidden  pt-5">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

   
      {isOpen && (
  <div className="md:hidden flex flex-col space-y-2 px-4 pb-4 pt-4">
    <Link
      to="/"
      className="text-lg font-semibold hover:text-blue-600 hover:bg-blue-100 rounded px-3 py-2 transition"
      onClick={() => setIsOpen(false)}
    >
      Home
    </Link>
    <Link
      to="/estimation"
      className="text-lg font-semibold hover:text-blue-600 hover:bg-blue-100 rounded px-3 py-2 transition"
      onClick={() => setIsOpen(false)}
    >
      Estimation
    </Link>
    <Link
      to="/#contact"
      className="text-lg font-semibold hover:text-blue-600 hover:bg-blue-100 rounded px-3 py-2 transition"
      onClick={() => setIsOpen(false)}
    >
      ContactUs
    </Link>
  </div>
)}

    </header>
  );
};
