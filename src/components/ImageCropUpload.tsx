// src/components/ImageCropUpload.tsx
import React, { useEffect, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface ImageCropUploadDirectProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

export const ImageCropUpload: React.FC<ImageCropUploadDirectProps> = ({
  imageSrc,
  onCropComplete,
  onCancel,
}) => {
  const cropperRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cropper = (cropperRef.current as any)?.cropper;
    if (cropper) {
      // Delay to ensure cropper is ready
      setTimeout(() => {
        cropper.setCropBoxData({
          width: 200, // Set your fixed width
          height: 200, // Set your fixed height
          left: 100,
          top: 50,
        });
      }, 100);
    }
  }, [imageSrc]);

  const handleCrop = () => {
    const cropper = (cropperRef.current as any)?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas({
        width: 200,  // Output size
        height: 200,
      });
      if (!canvas) return;
      const base64Image = canvas.toDataURL("image/png");
      onCropComplete(base64Image);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Crop Image</h3>
        <Cropper
  src={imageSrc}
  style={{ height: 300, width: "100%" }}
  aspectRatio={1}                 // fixed 1:1 ratio
  viewMode={1}
  guides={false}
  background={false}
  responsive={true}
  dragMode="none"                // prevent moving the image
  cropBoxResizable={false}      // don't allow resizing
  cropBoxMovable={true}         // allow dragging the crop box
  center={true}                 // crop box always centered
  movable={false}               // prevent image moving
  scalable={false}              // prevent scaling
  zoomable={false}              // prevent zooming
  checkOrientation={false}
  ref={cropperRef}
  ready={() => {
    const cropper = (cropperRef.current as any)?.cropper;
    if (cropper) {
      cropper.setCropBoxData({
        width: 200,             // fixed circular box size
        height: 200,
      });
    }
  }}
/>


        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={handleCrop}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Crop & Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
