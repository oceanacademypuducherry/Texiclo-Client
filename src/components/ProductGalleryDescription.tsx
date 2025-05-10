import React from "react";
import { useNavigate } from "react-router-dom";
import { CROPTOP } from "../assets";

export const ProductGalleryDescription: React.FC = () => {
  const navigate = useNavigate();

// ✅ Storing uploaded images in localStorage
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const fileArray: File[] = Array.from(files);

  Promise.all(fileArray.map(fileToBase64)).then((base64Images: string[]) => {
    localStorage.setItem("uploadedImages", JSON.stringify(base64Images));
    navigate("/preview");
  });
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};


  return (
    <div className="mx-auto px-20 flex flex-col lg:flex-row gap-6 mb-16">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 pt-2">
          {[CROPTOP, CROPTOP, CROPTOP, CROPTOP].map((img, idx) => (
            <img key={idx} src={img} alt={`thumb-${idx}`} className="w-16 h-16 object-cover border" />
          ))}
        </div>
        <div className="w-82 h-82">
          <img src={CROPTOP} alt="preview" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="space-y-3 text-xl">
        <h2 className="font-medium">Mens printed t-shirts</h2>
        <p className="text-custom-grey text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique
          malesuada elit, ut facilisis tellus elementum id.
        </p>

        <p>
          <span>GSM:</span>
          <select className="ml-2 border px-2 py-1 rounded text-xl">
            {Array.from({ length: (500 - 120) / 20 + 1 }, (_, i) => 120 + i * 20).map((gsm) => (
              <option key={gsm} value={gsm}>{gsm} GSM</option>
            ))}
          </select>
        </p>

        <p>
          <span>Color:</span>
          <select className="ml-2 border px-2 py-1 rounded text-xl">
            <option>White</option>
            <option>Black</option>
            <option>Gray</option>
            <option>Navy Blue</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Green</option>
            <option>Yellow</option>
          </select>
        </p>

        <p>
          <span >Size:</span>
          <select className="ml-2 border px-2 py-1 rounded text-xl">
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
            <option>3XL</option>
          </select>
        </p>

        <p><span >Total:</span> ₹680</p>

        <p>
          <span >Type:</span>
          <select className="ml-2 border px-2 py-1 rounded text-xl">
            <option>full sleeve</option>
            <option>sleeveless</option>
            <option>crop full sleeve</option>
            <option>crop sleeveless</option>
          </select>
        </p>

        <p className="text-custom-darkgreen">Discount applied 20% Off</p>
        <div className="flex gap-4 mt-4">
          <label className="px-4 py-2 border rounded cursor-pointer">
            Upload & Preview
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <button className="px-4 py-2 bg-custom-yellow rounded font-medium">
            Add to estimation
          </button>
        </div>
      </div>
    </div>
  );
};
