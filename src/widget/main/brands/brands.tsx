import React from "react";
import { SiSamsung, SiVivo, SiXiaomi, SiHonor, SiApple } from "react-icons/si";
const brandsData: { id: string; icon: any }[] = [
  {
    id: "apple",
    icon: <SiApple className="text-background text-7xl" />,
  },
  {
    id: "samsung",
    icon: <SiSamsung className="text-background text-[180px]" />,
  },
  {
    id: "xiaomi",
    icon: <SiXiaomi className="text-background text-7xl" />,
  },
  {
    id: "honor",
    icon: <SiHonor className="text-background text-[180px]" />,
  },
  {
    id: "vivo",
    icon: <SiVivo className="text-background text-[180px]" />,
  },
];

const Brands = () => {
  return (
    <div className="bg-foreground py-3">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-center md:justify-between py-5 md:py-0 sm:px-4 xl:px-0 space-x-7">
        {brandsData.map((brand) => (
          <div key={brand.id}>{brand.icon}</div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
