import { CHECKICON, IDEAIMAGE, MATCHICON, QUALITYICON, SHIPPINGICON } from "../assets";

export const Idea = () => {
  return (
   <section className="w-[87%] sm:[80%] mx-auto bg-white px-0 sm:px-6 px-0 lg:px-0 xl:px-0 pt-0 lg:pt-20 pb-0 md:pb-0 lg:pb-20 space-y-16">

      {/* Top Heading and Icons */}
<div className="flex flex-col  below-1000:flex-wrap md:flex-row gap-5 sm:gap-10 items-start mt-2">

  {/* Left Heading (breaks only on md and above) */}
  <div className="flex-shrink-0 px-0 md:px-0">


    {/* Desktop version with line breaks */}
    <h1 className="hidden md:block text-2xl sm:text-3xl lg:text-[30px] font-extrabold text-custom-black text-center md:text-left leading-[2.8rem] md:leading-[3.5rem]">
      Stand Out From The <br />
      Crowd With Custom<br />
      T-shirts
    </h1>

    {/* Mobile/Tablet version as a paragraph */}
    <h1 className="block md:hidden text-2xl sm:text-3xl lg:text-[28px] font-extrabold text-custom-black text-start  leading-[2.5rem]">
      Stand Out From The Crowd With Custom T-shirts
    </h1>

  </div>

  {/* Right Icon Features */}
  <div className="flex-1 flex flex-col md:flex-row gap-6 px-0 md:px-0 lg:px-4 md:px-0">

    {/* Quality Icon */}
   <div className="max-w-[500px] flex flex-col items-start md:items-center text-start md:text-center space-y-3 px-0 md:px-3">

      <img src={QUALITYICON} alt="Top Quality" className="w-12 h-12" />
      <h3 className="font-bold text-[18px] sm:text-[20px]">Top Quality</h3>                                                                                     
      <p className="text-custom-grey text-[16px] sm:text-[16px]">
        Printed on 100% quality cotton for a vibrant finish and all-day comfort.
      </p>
    </div>                                                    

    {/* Mix and Match Icon */}
    <div className="max-w-[500px] flex flex-col items-start md:items-center text-start md:text-center space-y-3 px-0 md:px-3">

      <img src={MATCHICON} alt="Mix and Match" className="w-12 h-12" />
      <h3 className="font-bold text-[18px] sm:text-[20px]">Mix And Match</h3>
      <p className="text-custom-grey text-[16px] sm:text-[16px]">
        Make stunning designs with beginner-friendly design tools and assets.
      </p>
    </div>

    {/* Shipping Icon */}
    <div className="max-w-[500px] flex flex-col items-start md:items-center text-start md:text-center space-y-3 px-0 md:px-3">

      <img src={SHIPPINGICON} alt="Shipping Worldwide" className="w-12 h-12" />
      <h3 className="font-bold text-[18px] sm:text-[20px]">Shipping Worldwide</h3>
      <p className="text-custom-grey text-[16px] sm:text-[16px]">
        Order prints and get them delivered fast, free, and in recycled packaging.
      </p>
    </div>

  </div>

</div>



      {/* Bottom Illustration and List Section */}
      <div className="grid grid-cols-1 max-lg:grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Illustration Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src={IDEAIMAGE}
            alt="Design Tools Illustration"
            className="w-full max-w-[400px] sm:max-w-[500px]"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-6 text-start sm:text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-custom-black">
            You’ve Got The Ideas, We’ve Got The Tools
          </h2>
          <p className="text-custom-grey text-[16px] sm:text-[18px]">
            T-shirt Printing for Everyone. Get a headstart with free design templates you can customize in a few clicks.
          </p>
          <ul className="space-y-4 text-gray-800 text-[14px] sm:text-[18px] px-0">
  {[
    "Top quality prints using the latest technology",
    "Mix and match colors, sizes, and designs",
    "Fast and free standard shipping",
    "Customer happiness guarantee",
  ].map((text, idx) => (
    <li
      key={idx}
      className="flex items-center gap-3"
    >
      <img
        src={CHECKICON}
        alt="check"
        className="w-5 h-5 sm:w-8 sm:h-8 mt-[2px] sm:mt-0 flex-shrink-0"
      />
      <span className="leading-snug">{text}</span>
    </li>
  ))}
</ul>

        </div>
      </div>
    </section>
  );
};
