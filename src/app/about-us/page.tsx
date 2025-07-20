import AboutUs from "@/widget/about-us/about-us";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас",
};
const page = () => {
  return <AboutUs />;
};

export default page;
