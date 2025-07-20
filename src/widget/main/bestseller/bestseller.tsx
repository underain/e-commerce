import { getBestseller } from "@/features/product/lib/get-bestseller";
import BestsellerProducts from "./bestseller-products";
import BestsellerTitle from "./bestseller-title";

const Bestseller = async () => {
  const bestseller = await getBestseller();

  return (
    <section className="w-full max-w-[1440px] mx-auto my-5 px-5">
      <BestsellerTitle />
      {bestseller.length && <BestsellerProducts bestseller={bestseller} />}
    </section>
  );
};

export default Bestseller;
