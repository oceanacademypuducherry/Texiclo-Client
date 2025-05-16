import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LOGO, LOGO1, LOGO2 } from "../assets"; // update your actual paths

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
      setIsAnimating(true);
      nextSlide();
    }, 3000); // 3 seconds

    return () => clearInterval(timer);
  }, [index]);

  const handleTransitionEnd = () => {
    setIsAnimating(false);

    if (index === extendedBanners.length - 1) {
      setIndex(1);
    } else if (index === 0) {
      setIndex(extendedBanners.length - 2);
    }
  };

  // Calculate correct visible index for indicators
  const visibleIndex =
    index === 0
      ? banners.length - 1
      : index === extendedBanners.length - 1
      ? 0
      : index - 1;

  return (
    <div className="relative w-full h-40 md:h-60 overflow-hidden">
      {/* Banner Images */}
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

 {/* Left Button - visible only above 1200px */}
<button
  onClick={() => {
    setIsAnimating(true);
    prevSlide();
  }}
  className="below-1000:hidden absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
>
  <ChevronLeft className="w-6 h-6" />
</button>

{/* Right Button - visible only above 1200px */}
<button
  onClick={() => {
    setIsAnimating(true);
    nextSlide();
  }}
  className="below-1000:hidden absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
>
  <ChevronRight className="w-6 h-6" />
</button>



      {/* Progress Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {banners.map((_, i) => (
          <div
            key={i}
            className="relative h-1 w-8 bg-gray-300 rounded-full overflow-hidden"
          >
            <div
              className={`absolute top-0 left-0 h-full bg-black ${
                i === visibleIndex ? "animate-slideProgress" : ""
              }`}
              style={{ width: i === visibleIndex ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
