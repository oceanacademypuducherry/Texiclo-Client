import { HEROIMAGE } from "../assets";

export const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-r from-white to-blue-100 px-4 sm:px-10">
      <div className="w-[91%] mx-auto flex flex-col md:flex-row items-start max-w-[1500px]">
        {/* Left Content */}
        <div className="md:w-1/2 text-start space-y-6 sm:space-y-10 mt-10 sm:mt-28">
          <h1 className="text-2xl sm:text-[30px] font-extrabold text-custom-black leading-[2.2rem] sm:leading-[3.2rem] max-w-[420px]">
            T-Shirt Printing Made Simple For Everyone
          </h1>
          <p className="text-custom-grey text-base sm:text-[20px] leading-relaxed max-w-[420px]">
            Custom T-shirt printing made simple and easier for all. Perfect for businesses, events, or showcasing your unique style.
          </p>
        </div>

        {/* Right Image */}
        <div className="mt-6 md:mt-0">
          <img
            src={HEROIMAGE}
            alt="T-Shirt Model"
            className="max-w-xs md:max-w-sm w-full"
          />
        </div>
      </div>
    </section>
  );
};
