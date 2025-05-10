import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PREVIEW } from "../assets";

export const Preview: React.FC = () => {
  const positions: string[] = [
    "left chest",
    "center chest",
    "full front",
    "oversized front",
    "back collar",
    "upper back",
    "full back",
  ];

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<Record<string, string>>({});
  const [checkedPositions, setCheckedPositions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem("uploadedImages");
    if (stored) {
      setUploadedImages(JSON.parse(stored));
    }
  }, []);

  const handleImageSelect = (position: string, imageData: string) => {
    setSelectedImages((prev) => ({
      ...prev,
      [position]: imageData,
    }));
  };

  const handleCheckboxChange = (position: string, checked: boolean) => {
    setCheckedPositions((prev) => ({
      ...prev,
      [position]: checked,
    }));
  };

  const positionStyles: Record<string, string> = {
    "left chest": "top-[25%] left-[20%]",
    "center chest": "top-[25%] left-[40%]",
    "full front": "top-[20%] left-[20%] w-[60%]",
    "oversized front": "top-[15%] left-[10%] w-[80%]",
    "back collar": "top-[5%] left-[45%]",
    "upper back": "top-[15%] left-[35%]",
    "full back": "top-[20%] left-[20%] w-[60%]",
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="text-2xl font-bold mb-8">Preview</h2>

      <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl justify-between items-start">
        {/* Shirt Preview Area */}
        <div className="relative w-[300px] h-[350px]">
          <img
            src={PREVIEW}
            alt="shirt preview"
            className="w-full h-full object-contain rounded shadow border"
          />

          {/* Show only checked + selected images */}
          {positions.map((position) => {
            const image = selectedImages[position];
            const isChecked = checkedPositions[position];
            const style = positionStyles[position] || "top-0 left-0";

            return (
              isChecked &&
              image && (
                <img
                  key={position}
                  src={image}
                  alt={`${position} design`}
                  className={`absolute ${style} h-16 object-contain`}
                />
              )
            );
          })}

          {/* Navigation */}
          <div className="flex justify-center gap-8 mt-4 absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
            <ChevronLeft size={24} />
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-custom-black rounded-full inline-block"></span>
              <span className="w-2 h-2 bg-custom-grey rounded-full inline-block"></span>
              <span className="w-2 h-2 bg-custom-grey rounded-full inline-block"></span>
            </div>
            <ChevronRight size={24} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 text-left w-full max-w-md">
          {positions.map((pos, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
            >
              <label className="flex items-center gap-2 text-lg">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(pos, e.target.checked)}
                />
                {pos}
              </label>

              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleImageSelect(pos, e.target.value)}
              >
                <option value="">Select image</option>
                {uploadedImages.map((img, idx) => (
                  <option key={idx} value={img}>
                    Image {idx + 1}
                  </option>
                ))}
              </select>

              {selectedImages[pos] && (
                <img
                  src={selectedImages[pos]}
                  alt={`Thumbnail for ${pos}`}
                  className="w-16 h-16 object-cover rounded border"
                />
              )}
            </div>
          ))}

          {/* Action Buttons */}
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
