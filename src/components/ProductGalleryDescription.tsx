import { CROPTOP} from "../assets";

const images = [
  CROPTOP,
  CROPTOP,
  CROPTOP,
  CROPTOP,
];
const previewImage = CROPTOP;

export const ProductGalleryDescription = () => {
  return (
    <div className="mx-auto px-20 flex flex-col lg:flex-row gap-6 mb-16">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 pt-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className="w-16 h-16 object-cover border "
            />
          ))}
        </div>
        <div className=" w-82 h-82 ">
          <img
            src={previewImage}
            alt="preview"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="space-y-3 text-xl">
        <h2 className="font-medium">Mens printed t-shirts</h2>
        <p className="text-custom-grey text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique
          malesuada elit, ut facilisis tellus elementum id.
        </p>
        <p>
  GSM:
  <select className="ml-2 border px-2 py-1 rounded text-xl">
    {Array.from({ length: (500 - 120) / 20 + 1 }, (_, i) => 120 + i * 20).map((gsm) => (
      <option key={gsm} value={gsm}>{gsm} GSM</option>
    ))}
  </select>
</p>

        <p>
          Color:
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
          Size:
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
        <p>Total: ₹680</p>
        <p>
          Type:
          <select className="ml-2 border px-2 py-1 rounded text-xl">
            <option>full sleeve</option>
            <option>sleeveless</option>
            <option>crop full sleeve</option>
            <option>crop sleeveless</option>
          </select>
        </p>
        <p className="text-custom-darkgreen">Discount applied 20% Off</p>

        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 border rounded">Upload & preview</button>
          <button className="px-4 py-2 bg-custom-yellow rounded font-medium">
            Add to estimation
          </button>
        </div>
      </div>
    </div>
  );
};
