import Image from "next/image";
import React from "react";

const brandsData: { id: string; srcUrl: string }[] = [
  {
    id: "apple",
    srcUrl: "/icons/apple-logo.svg",
  },
  {
    id: "samsung",
    srcUrl: "/icons/samsung-logo.svg",
  },
  {
    id: "xiaomi",
    srcUrl: "/icons/xiaomi-logo.svg",
  },
  {
    id: "oppo",
    srcUrl: "/icons/oppo-logo.svg",
  },
  {
    id: "vivo",
    srcUrl: "/icons/vivo-logo.svg",
  },
];

const Brands = () => {
  return (
    <div className="bg-foreground">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-center md:justify-between py-5 md:py-0 sm:px-4 xl:px-0 space-x-7">
        {brandsData.map((brand) => (
          <Image
            key={brand.id}
            src={brand.srcUrl}
            height={0}
            width={0}
            alt={brand.id}
            className="h-auto w-auto max-w-[116px] lg:max-w-48 max-h-[26px] lg:max-h-9 filter dark:invert dark:brightness-0 dark:contrast-100"
          />
        ))}
      </div>
    </div>
  );
};

export default Brands;
