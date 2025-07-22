import { getBrands } from "@/features/brand/lib/get-brands";
import { getCategories } from "@/features/category/lib/get-categories";
import { getMemories } from "@/features/memory/lib/get-memories";
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
  const [brands, categories, memories] = await Promise.all([
    getBrands(),
    getCategories(),
    getMemories(),
  ]);

  return (
    <aside className="w-full md:max-w-xs">
      <Card className="bg-sidebar-primary-foreground w-full md:max-w-xs">
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
              {categories.length &&
                categories.map((item) => (
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
              {brands.length &&
                brands.map((item) => (
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
              {memories.length &&
                memories.map((item) => (
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
          <Separator />
          <Link
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 w-full"
            href="/catalog"
          >
            Сбросить фильтры
            
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Filtration;
