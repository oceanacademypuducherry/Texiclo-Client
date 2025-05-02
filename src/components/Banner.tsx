import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LOGO, LOGO1, LOGO2 } from "../assets";

const banners = [
  { bgImage: LOGO },
  { bgImage: LOGO1 },
  { bgImage: LOGO2 },
];

export const ImageBannerSlider = () => {
  const [index, setIndex] = useState(1); 
  const [isAnimating, setIsAnimating] = useState(true);
  const sliderRef = useRef(null);

  
  const extendedBanners = [
    banners[banners.length - 1], 
    ...banners,
    banners[0], 
  ];

  const slideWidth = 100 / extendedBanners.length;

  const nextSlide = () => {
    if (index >= extendedBanners.length - 1) return;
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (index <= 0) return;
    setIndex((prev) => prev - 1);
  };

  
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [index]);

 
  const handleTransitionEnd = () => {
    setIsAnimating(true);

    if (index === extendedBanners.length - 1) {
     
      setIsAnimating(false);
      setIndex(1);
    } else if (index === 0) {
      
      setIsAnimating(false);
      setIndex(extendedBanners.length - 2);
    }
  };

  return (
    <div className="relative w-full h-40 md:h-60 overflow-hidden">
      <div
        ref={sliderRef}
        className="flex"
        style={{
          width: `${extendedBanners.length * 100}%`,
          transform: `translateX(-${index * slideWidth}%)`,
          transition: isAnimating ? "transform 0.6s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedBanners.map((banner, i) => (
          <img
            key={i}
            src={banner.bgImage}
            alt={`Banner ${i}`}
            className="w-full h-40 md:h-60 object-cover flex-shrink-0"
            style={{ width: `${slideWidth}%` }}
          />
        ))}
      </div>

     
      <button
        onClick={() => {
          setIsAnimating(true);
          prevSlide();
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      
      <button
        onClick={() => {
          setIsAnimating(true);
          nextSlide();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
