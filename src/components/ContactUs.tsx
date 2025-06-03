// src/components/ContactUs.tsx
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
    <div id="contactus" className="w-[90%] mx-auto max-lg:px-0 px-0 md:px-20 py-10 md:text-[20px] text-[16px]">
      <h2 className="md:text-[30px] text-[20px] font-bold text-center mb-4">Contact Us</h2>

      <p className="text-center text-custom-grey mb-10 max-w-[700px] mx-auto">
        Reach out to us for inquiries, support, or feedback. Our team is here to support you every step of the way.
      </p>

      <div className="flex flex-col md:flex-row gap-10 max-w-[1500px] mx-auto">
        <div className="flex-1 space-y-6">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-custom-green text-xl mt-1" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p>{CONTACT_INFO.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-custom-green text-xl mt-1" />
            <div>
              <h4 className="font-semibold">Mobile</h4>
              <p>{CONTACT_INFO.phones[0]}</p>
              <p>{CONTACT_INFO.phones[1]}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-custom-green text-xl mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>{CONTACT_INFO.email}</p>
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
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
