import { STEP1, STEP2, STEP3 } from "../assets";

export const Print = () => {
  return (
    <section className="py-12 px-4 sm:px-6 md:px-10 bg-[#FFFDF8] text-center">
      <h2 className="text-xl  md:text-3xl font-extrabold text-custom-black mb-4">
        T-shirt Printing Made Easy
      </h2>
      <p className="text-custom-grey sm:text-base md:text-[20px] max-w-2xl mx-auto mb-3 sm:mb-12">
        Suspendisse et laoreet lorem, ut condimentum diam finibus neque id id erat vulputate in tristique dui mattis.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-10 items-start">
        {/* Step 1 */}
        <div className="flex flex-col items-center space-y-4 ">
          <img src={STEP1} alt="Pick A Product" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
          <div className="bg-yellow-200 rounded-full w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] flex items-center justify-center font-bold text-lg sm:text-[20px]">
            01
          </div>
          <h3 className="font-semibold text-lg sm:text-xl">Pick A Product</h3>
          <p className="text-custom-grey sm:text-base md:text-[20px] max-w-xs">
            Printed on 100% quality cotton for a vibrant finish and all-day comfort.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center space-y-4">
          <img src={STEP2} alt="Custom Artwork" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
          <div className="bg-yellow-200 rounded-full w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] flex items-center justify-center font-bold text-lg sm:text-[20px]">
            02
          </div>
          <h3 className="font-semibold text-lg sm:text-xl">Custom Artwork</h3>
          <p className="text-custom-grey sm:text-base md:text-[20px] max-w-xs">
            Printed on 100% quality cotton for a vibrant finish and all-day comfort.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center space-y-4">
          <img src={STEP3} alt="Ship It For You" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
          <div className="bg-yellow-200 rounded-full w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] flex items-center justify-center font-bold text-lg sm:text-[20px]">
            03
          </div>
          <h3 className="font-semibold text-lg sm:text-xl">Ship It For You</h3>
          <p className="text-custom-grey sm:text-base md:text-[20px] max-w-xs">
            Printed on 100% quality cotton for a vibrant finish and all-day comfort.
          </p>
        </div>
      </div>
    </section>
  );
};
