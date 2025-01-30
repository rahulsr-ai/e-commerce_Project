import React from "react";

const brands = [
  {
    name: "Nike",
    logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4f3.png",
  },
  {
    name: "Adidas",
    logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c486.png",
  },
  {
    name: "Puma",
    logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4c0.png",
  },
  {
    name: "Under Armour",
    logo: "https://assets.stickpng.com/images/584297c4a6515b1e0ad75aca.png",
  },
  {
    name: "New Balance",
    logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4ae.png",
  },
];

const BrandsMarquee = () => {
  return (
    <div className="overflow-hidden py-8 mx-32">
      <div className="relative">
        <div className="flex gap-10 animate-marquee">
          {brands.map((brand) => (
            <div
              key={brand.logo}
              className="relative rounded-xl mx-10 flex-none w-[300px] group cursor-pointer inline-block"
            >
              <div>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {brand.name}
              </h3>
            </div>
          ))}

          {brands.map((brand) => (
            <div
              key={brand.logo}
              className="relative rounded-xl mx-10 flex-none w-[300px] group cursor-pointer inline-block"
            >
              <div>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsMarquee;
