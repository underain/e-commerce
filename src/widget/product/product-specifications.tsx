import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Separator } from "@/shared/ui/separator";

interface ProductSpecificationsProps {
  specifications: {
    id: string;
    name: string;
    description: string;
  }[];
}

const ProductSpecifications = ({
  specifications,
}: ProductSpecificationsProps) => {
  return (
    <Accordion type="single" collapsible defaultValue="specifications">
      <AccordionItem value="specifications">
        <AccordionTrigger className="text-left mb-3 font-bold text-base">
          Характеристики
        </AccordionTrigger>
        {specifications.length &&
          specifications.map((item) => (
            <AccordionContent
              key={item.id}
              className="space-y-1 flex items-center"
            >
              <b className="whitespace-nowrap shrink-0">{item.name}</b>
              <Separator className="flex-1 mx-2" />
              <p className="whitespace-nowrap truncate min-w-0">
                {item.description}
              </p>
            </AccordionContent>
          ))}
      </AccordionItem>
    </Accordion>
  );
};

export default ProductSpecifications;
