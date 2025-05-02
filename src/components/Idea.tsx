import { CHECKICON, IDEAIMAGE, MATCHICON, QUALITYICON, SHIPPINGICON } from "../assets";


export const Idea=()=> {
  return (
    <section className="w-[90%] py-10 px-1 md:px-20 bg-white space-y-16">

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-start">

        
        <div>

          <h1 className=" ml-14 text-3xl md:text-[30px] font-extrabold text-custom-black leading-[3.5rem] mt-0">
            Stand Out From The<br />
            Crowd With Custom<br />  T-shirts
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col items-center text-center space-y-3">
            <img src={QUALITYICON} alt="Top Quality" className="w-12 h-12" />
            <h3 className="font-bold text-[20px]">Top Quality</h3>
            <p className="text-custom-grey text-[20px]">
              Printed on 100% quality cotton for a vibrant finish and all-day comfort.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <img src={MATCHICON} alt="Mix and Match" className="w-12 h-12" />
            <h3 className="font-bold text-[20px]">Mix And Match</h3>
            <p className="text-custom-grey text-[20px]">
              Make stunning designs with beginner-friendly design tools and assets.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <img src={SHIPPINGICON} alt="Shipping Worldwide" className="w-12 h-12" />
            <h3 className="font-bold text-[20px]">Shipping Worldwide</h3>
            <p className="text-custom-grey text-[20px]">
              Order prints and get them delivered fast, free, and in recycled packaging.
            </p>
          </div>
        </div>

      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* Left: Illustration */}
        <div className="flex justify-start">
          <img
            src={IDEAIMAGE}
            alt="Design Tools Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Right: Text Content */}
        <div className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-custom-black">
            You’ve Got The Ideas, We’ve Got The Tools
          </h2>
          <p className="text-custom-grey text-[20px]">
            T-shirt Printing for Everyone. Get a headstart with free design
            templates you can customize in a few clicks.
          </p>
          <ul className="space-y-6 text-gray-800 text-sm md:text-[20px]">
            <li className="flex items-center space-x-4 leading-snug">
              <img src={CHECKICON} alt="check" className="w-10 h-10" />
              <span>Top quality prints using the latest technology</span>
            </li>
            <li className="flex items-center space-x-4 leading-snug">
              <img src={CHECKICON} alt="check" className="w-10 h-10" />
              <span>Mix and match colors, sizes, and designs</span>
            </li>
            <li className="flex items-center space-x-4 leading-snug">
              <img src={CHECKICON} alt="check" className="w-10 h-10" />
              <span>Fast and free standard shipping</span>
            </li>
            <li className="flex items-center space-x-4 leading-snug">
              <img src={CHECKICON} alt="check" className="w-10 h-10" />
              <span>Customer happiness guarantee</span>
            </li>
          </ul>

        </div>
      </div>
    </section>
  );
}

