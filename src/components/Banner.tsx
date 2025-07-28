import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RootState } from "../app/store";
import { GetAllBannerAPI } from "../features/api/bannerAPI";

export const ImageBannerSlider = () => {
  const dispatch = useDispatch();
  const sliderRef = useRef<HTMLDivElement>(null);

  const {
    data: banners,
    isLoading,
    isError,
  } = useSelector((state: RootState) => state.banner);

  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);

  const extendedBanners = [
    banners[banners.length - 1],
    ...banners,
    banners[0],
  ];
  const slideWidth = 100 / extendedBanners.length;

  useEffect(() => {
    dispatch(GetAllBannerAPI());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [index, banners]);

  const nextSlide = () => {
    if (index >= extendedBanners.length - 1) return;
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (index <= 0) return;
    setIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (index === extendedBanners.length - 1) setIndex(1);
    else if (index === 0) setIndex(extendedBanners.length - 2);
  };

  const visibleIndex =
    index === 0
      ? banners.length - 1
      : index === extendedBanners.length - 1
      ? 0
      : index - 1;

  return (
    <div className="relative w-full overflow-hidden">
      {isLoading || banners.length === 0 ? (
        // Skeleton Loader
        <div className="w-full h-[6rem] sm:h-[16rem] overflow-hidden relative">
          <div className="flex w-full h-full animate-pulse px-2 gap-2">
            {[...Array(1)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gray-200 rounded-md"
              />
            ))}
          </div>
          {/* Skeleton Indicators */}
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[3px] w-4 sm:h-1 sm:w-6 md:w-8 bg-gray-300 rounded-full"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Slider Container */}
          <div className="w-full overflow-hidden relative">
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
                <div
                  key={i}
                  className="flex-shrink-0 w-full flex items-center justify-center bg-white"
                  style={{ width: `${slideWidth}%` }}
                >
                  <img
                    src={banner?.imageUrl}
                    alt={`Banner ${i}`}
                    className="w-full h-[6rem] sm:h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={() => {
              setIsAnimating(true);
              prevSlide();
            }}
            className="hidden md:flex absolute left-7 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 shadow-md z-10 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={() => {
              setIsAnimating(true);
              nextSlide();
            }}
            className="hidden md:flex absolute right-7 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 shadow-md z-10 rounded-full"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
            {banners.map((_, i) => (
              <div
                key={i}
                className="relative h-[3px] w-4 sm:h-1 sm:w-6 md:w-8 bg-gray-300 overflow-hidden rounded-full"
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
        </>
      )}
    </div>
  );
};
