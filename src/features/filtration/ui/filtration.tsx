import { getBrand } from "@/features/brand/lib/get-brand";
import { getCategory } from "@/features/category/lib/get-category";
import { getMemory } from "@/features/memory/lib/get-memory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import Link from "next/link";
import { GiSettingsKnobs } from "react-icons/gi";

const Filtration = async () => {
  const [brand, category, memory] = await Promise.all([
    getBrand(),
    getCategory(),
    getMemory(),
  ]);

  return (
    <aside>
      <Card className="max-w-xs bg-sidebar-primary-foreground">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="font-bold text-xl">Фильтры</CardTitle>
          <GiSettingsKnobs />
        </CardHeader>
        <CardContent className="space-y-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger className="text-left p-0 py-0.5 font-normal text-base">
                Категория
              </AccordionTrigger>
              {category.length &&
                category.map((item) => (
                  <AccordionContent
                    key={item.id}
                    className="p-4 pb-0 border-l flex flex-col"
                  >
                    <Link href={`/catalog?category=${item.name}`}>
                      {item.name}
                    </Link>
                  </AccordionContent>
                ))}
            </AccordionItem>
          </Accordion>
          <Separator />
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger className="text-left p-0 py-0.5 font-normal text-base">
                Бренд
              </AccordionTrigger>
              {brand.length &&
                brand.map((item) => (
                  <AccordionContent
                    key={item.id}
                    className="p-4 pb-0 border-l flex flex-col"
                  >
                    <Link href={`/catalog?brand=${item.name}`}>
                      {item.name}
                    </Link>
                  </AccordionContent>
                ))}
            </AccordionItem>
          </Accordion>
          <Separator />
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger className="text-left p-0 py-0.5 font-normal text-base">
                Память
              </AccordionTrigger>
              {memory.length &&
                memory.map((item) => (
                  <AccordionContent
                    key={item.id}
                    className="p-4 pb-0 border-l flex flex-col"
                  >
                    <Link href={`/catalog?memory=${item.label}`}>
                      {item.label}
                    </Link>
                  </AccordionContent>
                ))}
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Filtration;
