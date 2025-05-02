import { NEWCOLLECTION, MENS, WOMENS, KIDS } from "../assets";

export const CollectionPage = () => {
  const collections = [
    { image: NEWCOLLECTION, label: "New Collection" },
    { image: MENS, label: "Men's" },
    { image: WOMENS, label: "Women's" },
    { image: KIDS, label: "Kid's" },
    { image: MENS, label: "T-Shirts" },
    { image: KIDS, label: "Casuals" },
    { image: MENS, label: "Men's" },
    { image: WOMENS, label: "Women's" },
    { image: KIDS, label: "Kid's" },
    { image: MENS, label: "T-Shirts" },
    { image: KIDS, label: "Casuals" },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-10">All Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {collections.map((item, index) => (
          <div
            key={index}
            className=" overflow-hidden "
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-full h-[200px] object-contain"
            />
            <div className="p-4 text-center font-semibold text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
