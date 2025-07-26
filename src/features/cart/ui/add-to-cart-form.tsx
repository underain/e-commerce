"use client";
import { addToCart } from "@/features/cart/lib/add-to-cart";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddToCartForm = ({ variantId }: { variantId: string }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async () => {
    try {
      await addToCart(variantId);
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      toast.error("Ошибка", {
        description:
          error instanceof Error
            ? error.message
            : "Не удалось добавить товар в корзину",
      });
    }
  };
  return (
    <form className="max-w-fit" onSubmit={handleSubmit(onSubmit)}>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Добавление..." : "Добавить в корзину"}
      </Button>
    </form>
  );
};

export default AddToCartForm;
