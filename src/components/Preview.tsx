// Import necessary libraries
import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CROPTOP, SPORTSWEAR } from "../assets";
import { ContactForm } from "./ContactForm";
import { ImageCropUpload } from "./ImageCropUpload"; // Import Crop component

interface PreviewProps {
  images: string[];
  onClose: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ images, onClose }) => {
  const positions = [
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
  const [currentSlide, setCurrentSlide] = useState<number>(-1);
  const [showContactModal, setShowContactModal] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [positionToAssign, setPositionToAssign] = useState<string | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUploadedImages(images);
  }, [images]);

  const openContactForm = () => {
    setShowContactModal(true);
    handleSavePDF(false).then((blob) => setPdfBlob(blob));
  };

  const closeContactForm = () => setShowContactModal(false);

  const handleImageSelect = (position: string, imageData: string) => {
    setSelectedImages((prev) => ({ ...prev, [position]: imageData }));
  };

  const handleCheckboxChange = (position: string, checked: boolean) => {
    const updatedChecked = { ...checkedPositions, [position]: checked };
    setCheckedPositions(updatedChecked);
    const validPositions = getConfiguredPreviews(updatedChecked, selectedImages);
    if (checked && selectedImages[position]) {
      setCurrentSlide(validPositions.indexOf(position));
    } else if (!checked) {
      const currentPos = getConfiguredPreviews(updatedChecked, selectedImages)[currentSlide];
      if (!currentPos) setCurrentSlide(-1);
    }
  };

  const getConfiguredPreviews = (
    checked = checkedPositions,
    selected = selectedImages
  ) => positions.filter((pos) => checked[pos] && selected[pos]);

  const previews = getConfiguredPreviews();
  const totalSlides = previews.length;
  const currentPosition = currentSlide >= 0 && previews[currentSlide];

  const handlePrev = () => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  const positionStyles: Record<string, string> = {
    "left chest": "top-[25%] left-[25%]",
    "center chest": "top-[25%] left-[40%]",
    "full front": "top-[20%] left-[20%] w-[60%]",
    "oversized front": "top-[15%] left-[10%] w-[80%]",
    "back collar": "top-[5%] left-[42%]",
    "upper back": "top-[15%] left-[42%]",
    "full back": "top-[20%] left-[20%] w-[60%]",
  };

  const handleSavePDF = async (shouldDownload = false): Promise<Blob> => {
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const slides = getConfiguredPreviews();
    const marginX = 30, marginY = 30, spacingY = 20;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const availableHeight = pageHeight - marginY * 2 - spacingY * 2;
    const maxImgHeight = availableHeight / 3;
    const maxImgWidth = pageWidth - marginX * 2;

    let imageCount = 0;

    for (let i = 0; i < slides.length; i++) {
      const pos = slides[i];

      const container = document.createElement("div");
      container.style.width = "300px";
      container.style.height = "350px";
      container.style.position = "relative";
      container.style.padding = "0";
      container.style.margin = "0";
      container.style.border = "1px solid #ccc";
      container.style.background = "#fff";
      container.style.overflow = "hidden";

      const shirtImg = document.createElement("img");
      shirtImg.src = SPORTSWEAR;
      shirtImg.style.width = "100%";
      shirtImg.style.height = "100%";
      shirtImg.style.objectFit = "contain";
      shirtImg.style.borderRadius = "4px";
      container.appendChild(shirtImg);

      if (selectedImages[pos]) {
        const printImg = document.createElement("img");
        printImg.src = selectedImages[pos];
        printImg.alt = pos;
        printImg.style.position = "absolute";
        printImg.style.height = "60px";
        printImg.style.objectFit = "contain";

        const [top, left, width] = positionStyles[pos]
          .replace(/top-\[([^\]]+)]/, "$1")
          .replace(/left-\[([^\]]+)]/, "$1")
          .replace(/w-\[([^\]]+)]/, "$1")
          .split(" ");

        printImg.style.top = top || "20%";
        printImg.style.left = left || "30%";
        if (width) printImg.style.width = width;

        container.appendChild(printImg);
      }

      document.body.appendChild(container);
      const canvas = await html2canvas(container, { useCORS: true, scale: 1.5 });
      const imgData = canvas.toDataURL("image/jpeg", 0.6);

      let imgWidth = maxImgWidth;
      let imgHeight = (canvas.height / canvas.width) * imgWidth;
      if (imgHeight > maxImgHeight) {
        imgHeight = maxImgHeight;
        imgWidth = (canvas.width / canvas.height) * imgHeight;
      }

      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = marginY + imageCount * (imgHeight + spacingY);

      pdf.addImage(imgData, "JPEG", xOffset, yOffset, imgWidth, imgHeight);
      imageCount++;

      if (imageCount === 3 && i < slides.length - 1) {
        pdf.addPage();
        imageCount = 0;
      }
      document.body.removeChild(container);
    }

    if (shouldDownload) pdf.save("tshirt_preview.pdf");
    return pdf.output("blob");
  };

  return (
    <div className="flex flex-col items-center p-0 sm:p-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Preview</h2>
      <div className="flex flex-col md:flex-row gap-20 w-full max-w-5xl mx-auto items-center justify-center">
        <div ref={previewRef} className="relative w-[220px] h-[280px] sm:w-[300px] sm:h-[350px]">
          <img src={CROPTOP} alt="shirt" className="w-full h-full object-contain rounded shadow border" />
          {currentPosition && selectedImages[currentPosition] && (
            <img
              src={selectedImages[currentPosition]}
              alt={currentPosition}
              className={`absolute ${positionStyles[currentPosition]} h-12 sm:h-16 object-contain`}
            />
          )}
          {totalSlides > 0 && (
            <div className="flex justify-center gap-8 mt-6 absolute bottom-[-60px] left-1/2 transform -translate-x-1/2">
              <ChevronLeft size={24} onClick={handlePrev} className="cursor-pointer" />
              <div className="flex items-center gap-3">
                {previews.map((_, index) => (
                  <span
                    key={index}
                    className={`w-2 h-2 rounded-full inline-block ${
                      index === currentSlide ? "bg-black" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <ChevronRight size={24} onClick={handleNext} className="cursor-pointer" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 text-left w-full max-w-md text-sm sm:text-base">
          {positions.map((pos, index) => (
            <div key={index} className="flex sm:flex-row justify-between items-start sm:items-center gap-2">
              <label className="flex items-center gap-2 font-medium">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(pos, e.target.checked)}
                  checked={checkedPositions[pos] || false}
                />
                {pos}
              </label>
              <select
                className="border rounded px-2 py-1 text-sm sm:text-base"
                onChange={(e) => {
                  setImageToCrop(e.target.value);
                  setPositionToAssign(pos);
                }}
                value={selectedImages[pos] || ""}
              >
                <option value="">Select image</option>
                {uploadedImages.map((img, idx) => (
                  <option key={idx} value={img}>Image {idx + 1}</option>
                ))}
              </select>
              {selectedImages[pos] && (
                <img src={selectedImages[pos]} alt={`Preview for ${pos}`} className="w-14 h-14 object-cover rounded border" />
              )}
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
           <button
  onClick={async () => {
    await handleSavePDF(true);
    onClose(); // Closes the Preview modal
  }}
  className="bg-yellow-400 px-4 py-2 rounded font-semibold text-sm sm:text-base shadow"
>
  Save as PDF
</button>

            <button
              onClick={openContactForm}
              className="bg-yellow-400 px-4 py-2 rounded font-semibold text-sm sm:text-base shadow"
            >
              Contact for purchasing
            </button>
            
          </div>

          {showContactModal && pdfBlob && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 sm:p-6 rounded-t-lg sm:rounded-lg w-full sm:w-[90%] max-w-lg relative">
                <ContactForm
                  onClose={closeContactForm}
                  requireScreenshot={false}
                  pdfBlob={pdfBlob}
                  onSubmitted={onClose}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {imageToCrop && positionToAssign && (
        <ImageCropUpload
          imageSrc={imageToCrop}
          onCropComplete={(croppedImage) => {
            handleImageSelect(positionToAssign, croppedImage);
            setImageToCrop(null);
            setPositionToAssign(null);
          }}
          onCancel={() => {
            setImageToCrop(null);
            setPositionToAssign(null);
          }}
        />
      )}
    </div>
  );
};
