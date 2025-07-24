import {
  Collection,
  ContactUs,
  Hero,
  Idea,
  ImageBannerSlider,
  Print,
  Product,
} from "../components";

import { Footer, Navbar } from "../common";


export const HomePage = () => {
   
  return (
    <div>
      <Navbar />
      <ImageBannerSlider />
      <Hero />
      <Idea />
      <Print />
      <Collection />
      <Product />
      <ContactUs />
      <Footer />
    </div>
  );
};
