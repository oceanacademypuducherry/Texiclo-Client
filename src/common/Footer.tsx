import { TEXICLO } from "../assets";
import { FaFacebookSquare, FaLinkedin, FaTelegramPlane } from "react-icons/fa";

import { FaSquareInstagram } from "react-icons/fa6";
import { CONTACT_INFO } from "../constant";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-custom-yellow text-custom-black py-8 px-4 sm:px-8 md:px-20 max-lg:px-0 text-base md:text-[20px]">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1500px] items-center">
        
       
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={TEXICLO} alt="Texiclo Logo" className="w-28 mb-5" />
          <p className="mb-6">
            Distrusts delighted excuse few the remain highly feebly add people manner say.
            It high at my mind by roof.
          </p>
          <div className="flex gap-4 text-xl md:text-[22px] justify-center md:justify-start">
            <a
  href="https://t.me/Texiclo_bot"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-red-500 transition-colors"
>
  <FaTelegramPlane />
</a>

<a
  href="https://www.facebook.com/people/Texiclo-page/61565989897279/?mibextid=kFxxJD"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-red-500 transition-colors"
>
  <FaFacebookSquare />

</a>

            <a href="https://www.linkedin.com/in/texiclo-company-texiclo-823152337/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"
  rel="noopener noreferrer"
  className="hover:text-red-500 transition-colors"><FaLinkedin />
</a>
            <a href="https://www.instagram.com/texiclo/?igsh=MTVlanJsbjd3cnM1cg%3D%3D#" target="_blank"
  rel="noopener noreferrer"
  className="hover:text-red-500 transition-colors"><FaSquareInstagram /></a>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="font-bold mb-4 text-lg md:text-xl">Get In Touch</h3>
          <p className="mb-2"><a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.email}`}
                target="_blank"
                rel="noopener noreferrer"
                
              >
            {CONTACT_INFO.email}
          </a></p>
          <p className="font-bold mb-2"><a href={`tel:${CONTACT_INFO.phones[0]}`} className="block">
      {CONTACT_INFO.phones[0]}
    </a>
    <a href={`tel:${CONTACT_INFO.phones[1]}`} className="block">
      {CONTACT_INFO.phones[1]}
    </a></p>
          <p>
            {CONTACT_INFO.address}
           
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-center">
          <h3 className="font-bold mb-4 text-lg md:text-xl">Information</h3>
          

{/* <ul className="space-y-2">
  <li>
    <Link to="/about" target="_blank" className="hover:text-red-600 transition-colors">About Us</Link>
  </li>
  <li>
    <Link to="/policies" target="_blank" className="hover:text-red-600 transition-colors">Policies</Link>
  </li>
  <li>
    <Link to="/contactus" target="_blank" className="hover:text-red-600 transition-colors">Contact Us</Link>
  </li>
  <li>
    <Link to="/privacy" target="_blank" className="hover:text-red-600 transition-colors">Privacy Policies</Link>
  </li>
</ul> */}
<ul className="space-y-2">
  <li>
    About Us
  </li>
  <li>
    Policies
  </li>
  <li>
    Contact Us
  </li>
  <li>
    Privacy Policies
  </li>
</ul>

        </div>

      </div>
    </footer>
  );
};
