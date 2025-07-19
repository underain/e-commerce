import Admin from "@/widget/admin/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ панель",
};

const page = async () => {
  return (
    <main>
      <Admin />
    </main>
  );
};

export default page;
