
import { ChevronLeft, ChevronRight } from "lucide-react"; 

export const Preview = () => {
  const positions = ["left chest", "center chest", "ForeArm", "Back side", "center chest"];
  const images = ["img1", "img2"];

  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="text-2xl font-bold mb-8">Preview</h2>

      <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl justify-between items-start">
        
        <div className="relative">
          <img
            src="/shirt1.png"
            alt="shirt"
            className="w-[300px] h-[350px] object-cover rounded shadow"
          />
          

         
          <div className="flex justify-center gap-8 mt-4">
          <ChevronLeft size={24} />
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-custom-black rounded-full inline-block"></span>
              <span className="w-2 h-2 bg-custom-grey rounded-full inline-block"></span>
              <span className="w-2 h-2 bg-custom-grey rounded-full inline-block"></span>
            </div>
            <ChevronRight size={24} />
          </div>
        </div>

        
        <div className="flex flex-col gap-4 text-left w-full max-w-md">
          {positions.map((pos, index) => (
            <div key={index} className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-lg">
                <input type="checkbox" />
                {pos}
              </label>
              <select className="border rounded px-2 py-1">
                {images.map((img, idx) => (
                  <option key={idx}>{img}</option>
                ))}
              </select>
            </div>
          ))}

          

          <div className="flex gap-4 mt-6">
            <button className="bg-custom-yellow px-6 py-2 rounded font-semibold shadow">
              Save as PDF
            </button>
            <button className="bg-custom-yellow px-6 py-2 rounded font-semibold shadow">
              Contact for purchasing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
