import React from "react";
import Image from "next/image";

const brands = [
  { name: "Nike", logo: "/brandsLogo/nikeWithName.jpg" },
  { name: "Adidas", logo: "/brandsLogo/adidasWithname.jpg" },
  { name: "Puma", logo: "/brandsLogo/PumawithName.jpg" },
  { name: "Rolex", logo: "/brandsLogo/rolexwithName.jpg" },
  { name: "Sony", logo: "/brandsLogo/sonyWIthName.jpg" },
  { name: "JBL", logo: "/brandsLogo/JBLwithName.jpg" },
];

const BrandsMarquee = () => {
  return (
    <div className="overflow-hidden py-8 mx-10 hidden dark:block ">
      <div className="relative flex gap-4 sm:gap-10 animate-marquee">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={index}
            className="relative w-[200px] h-[100px] flex-none rounded-xl cursor-pointer"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={200}
              height={100}
              className="object-contain w-full h-full "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsMarquee;
