import {Collection, ContactUs, Footer, Hero, Idea, ImageBannerSlider, Navbar, Print, Product } from "../components";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export  const HomePage = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div>
     <Navbar/>
     <ImageBannerSlider/>
      <Hero />
      <Idea />
      <Print />
      <Collection/>
      <Product />
      <ContactUs id="contact"/>
      <Footer />
    </div>
  );
};

