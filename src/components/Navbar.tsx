import { Link } from "react-router-dom";
import { TEXICLO } from "../assets";



export const  Navbar=()=>{
  return (
    <header className="w-full bg-custom-yellow text-custom-black p-6">
      <nav className="w-full flex justify-between items-center  md:px-10">
        
          <img src={TEXICLO} alt="Texiclo Logo" className="w-24 " />
        
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
      </nav>
    </header>
  );
}
