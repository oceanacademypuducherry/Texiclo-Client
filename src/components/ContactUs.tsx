import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTACT_INFO } from '../constant';
import {ContactForm} from './ContactForm';

export const ContactUs = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contactus') {
      const section = document.getElementById('contactus');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div id="contactus" className="w-[90%] mx-auto max-lg:px-0 px-0 md:px-20 py-6 sm:py-10 md:text-[20px] text-[16px]">
      <h2 className="md:text-[30px] text-[20px] font-bold text-center mb-4">Contact Us</h2>

      <p className="text-center text-custom-grey mb-6 sm:mb-10 max-w-[700px] mx-auto">
        Reach out to us for inquiries, support, or feedback. Our team is here to support you every step of the way.
      </p>

      <div className="flex flex-col md:flex-row  gap-10  max-w-[1500px] mx-auto">
        <div className="flex-1 space-y-6">
          <div className="flex items-start gap-4">
  <FaMapMarkerAlt className="text-custom-green text-xl mt-1" />
  <div>
    <h4 className="font-semibold">Address</h4>
      {CONTACT_INFO.address}
    </div>
</div>

<div className="flex items-start gap-4">
  <FaPhoneAlt className="text-custom-green text-xl mt-1" />
  <div>
    <h4 className="font-semibold">Mobile</h4>
    <a href={`tel:${CONTACT_INFO.phones[0]}`} className="block">
      {CONTACT_INFO.phones[0]}
    </a>
    <a href={`tel:${CONTACT_INFO.phones[1]}`} className="block">
      {CONTACT_INFO.phones[1]}
    </a>
  </div>
</div>

<div className="flex items-start gap-4">
  <FaEnvelope className="text-custom-green text-xl mt-1" />
  <div>
    <h4 className="font-semibold">Email</h4>
   <a
      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.email}`}
      target="_blank"
      rel="noopener noreferrer"
     
    >
  {CONTACT_INFO.email}
</a>

  </div>
</div>


          <div className="flex items-start gap-4">
            <FaClock className="text-custom-green text-xl mt-1" />
            <div>
              <h4 className="font-semibold">Opening Hour</h4>
              <p>{CONTACT_INFO.workingHours}</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="md:text-xl text-base font-semibold mb-6">Send a Message</h3>
          <ContactForm
  pdfBlob={new Blob()} // or actual blob if you have one
  onSubmitted={() => {
    console.log("✅ Contact form submitted.");
  }}
/>

        </div>
      </div>
    </div>
  );
};
