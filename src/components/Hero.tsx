import { HEROIMAGE } from "../assets";


export const  Hero=()=> {
  return (
    <section className="w-full bg-gradient-to-r from-white to-blue-100  px-4 md:px-16">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center ">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-10">
        <h1 className="text-3xl md:text-[30px] font-extrabold text-custom-black leading-[3.5rem] mt-0">
  T-Shirt Printing<br/>
   Made Simple For<br/> Everyone
</h1>
          <p className="text-custom-grey text-base md:text-[20px]">
            Lorem ipsum dolor sit amet, consectetur<br/>
            adipiscing elit maecenas quis iaculis quam<br/>
             auris ferment.
          </p>
          {/* <button className="bg-gray-100 text-custom-black font-bold px-6 py-2 rounded-md shadow hover:bg-gray-100 transition">
            Click
          </button> */}
        </div>

        {/* Right Image */}
        <div className=" mt-6 md:mt-0 ">
          <img
            src={HEROIMAGE}
            alt="T-Shirt Model"
            className="max-w-xs md:max-w-sm w-full"
          />
        </div>
      </div>
    </section>
  );
}
