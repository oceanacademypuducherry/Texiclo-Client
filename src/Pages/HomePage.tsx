import {Collection, ContactUs, Footer, Hero, Idea, ImageBannerSlider, Navbar, Print, Product } from "../components";



export  const HomePage = () => {
  return (
    <div>
     <Navbar/>
     <ImageBannerSlider/>
      <Hero />
      <Idea />
      <Print />
      <Collection/>
      <Product />
      <ContactUs/>
      <Footer />
    </div>
  );
};

