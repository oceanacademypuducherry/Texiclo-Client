import { HEROIMAGE } from "../assets";

export const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-r from-white to-blue-100 px-0 sm:px-10">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row items-start md:items-center max-w-[1630px]">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-start space-y-6 sm:space-y-10 mt-10 mt-4 sm:mt-6">
          <h1 className="text-2xl sm:text-[30px] font-extrabold text-custom-black leading-[2.2rem] sm:leading-[3.2rem] max-w-full sm:max-w-[420px] mx-auto">
            T-Shirt Printing Made Simple For Everyone
          </h1>
          <p className="text-custom-grey text-base sm:text-[20px] leading-relaxed max-w-full sm:max-w-[420px] mx-auto">
            Custom T-shirt printing made simple and easier for all. Perfect for businesses, events, or showcasing your unique style.
          </p>
        </div>

        {/* Right Image */}
        <div className="mt-6 md:mt-0 w-full flex justify-center md:justify-end">
          <img
            src={HEROIMAGE}
            alt="T-Shirt Model"
            className="w-full max-w-[180px] sm:max-w-[250px] md:max-w-[300px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};
