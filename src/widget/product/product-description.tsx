"use client";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";

const ProductDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="space-y-4">
      <h3 className="font-bold">Описание</h3>
      <p
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "text-sm cursor-pointer leading-snug  transition-all duration-300",
          !isExpanded && "line-clamp-3 text-muted-foreground"
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default ProductDescription;
