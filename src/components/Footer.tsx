import { TEXICLO } from "../assets";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";


export  const Footer=()=> {
  return (
    <footer className="bg-custom-yellow text-custom-black py-5 px-4 md:px-20 text-[20px]">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 items-start">
        
        
        <div className="flex flex-col items-start">
  <img src={TEXICLO} alt="Texiclo Logo" className="w-28 mb-5" />
  <p className="mb-6 max-w-sm leading-relaxed">
    Distrusts delighted excuse few the remain highly feebly add people manner say.
    It high at my mind by roof.
  </p>
  <div className="flex gap-4 text-[22px]">
    <a href="#" className="hover:text-white transition-colors"><FaTwitter /></a>
    <a href="#" className="hover:text-white transition-colors"><FaFacebookF /></a>
    <a href="#" className="hover:text-white transition-colors"><FaYoutube /></a>
    <a href="#" className="hover:text-white transition-colors"><FaSquareInstagram /></a>
  </div>
</div>


<div className="flex flex-col items-center md:items-center text-center">
  <h3 className="font-bold mb-4 text-xl">Get In Touch</h3>
  <p className="mb-2">hello@teecheap.com</p>
  <p className="font-bold mb-2">+02 036 038 6686</p>
  <p>
    25 Lipsum Place, Suite 0960<br />
    Las Vegas
  </p>
</div>

<div className="flex flex-col items-end text-center">
  <h3 className="font-bold mb-4 text-xl">Information</h3>
  <ul className="space-y-2">
    <li><a href="#" className="hover:underline">About Us</a></li>
    <li><a href="#" className="hover:underline">Policies</a></li>
    <li><a href="#" className="hover:underline">Contact Us</a></li>
    <li><a href="#" className="hover:underline">Privacy Policies</a></li>
  </ul>
</div>

        
      </div>
    </footer>
  );
}
