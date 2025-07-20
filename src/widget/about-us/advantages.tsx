import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import Image from "next/image";

const AdvantagesSection = () => {
  return (
    <section className="px-5 mb-20">
      <motion.h2
        initial={{ y: "100px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[32px] md:text-5xl mb-8 md:mb-14 capitalize text-center space-y-4 font-bold"
      >
        Преимущества
      </motion.h2>
      <motion.div
        initial={{ y: "100px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card >
          <CardHeader className="p-0">
            <Image
              src="/about-us/card1.png"
              alt=""
              width={200}
              height={200}
              className="w-full"
            />
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <CardTitle className="font-bold text-xl"> Trade-In</CardTitle>
            <CardDescription>
              обменяйте свои устройства и получите скидку на новые
            </CardDescription>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="text-center space-y-4">
            <CardTitle className="font-bold text-xl">
              Порадуйте себя аксессуарами!
            </CardTitle>
            <CardDescription>Ваш новый iPhone ждет дополнений!</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src="/about-us/card2.png"
              alt=""
              width={200}
              height={200}
              className="w-full"
            />
          </CardContent>
        </Card>
        <Card className="pt-0">
          <CardHeader className="p-0">
            <Image
              src="/about-us/card3.png"
              alt=""
              width={200}
              height={200}
              className="w-full"
            />
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <CardTitle className="font-bold text-xl">Гарантия</CardTitle>
            <CardDescription>
              не беспокойтесь целый год из-за поломки техники
            </CardDescription>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="text-center space-y-4">
            <CardTitle className="font-bold text-xl">Рассрочка</CardTitle>
            <CardDescription>
              любой товар можно приобрести в рассрочку
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src="/about-us/card4.png"
              alt=""
              width={200}
              height={200}
              className="w-full"
            />
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default AdvantagesSection;
