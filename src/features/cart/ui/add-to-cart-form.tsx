"use client";
import { addToCart } from "@/features/cart/lib/add-to-cart";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddToCartForm = ({ variantId }: { variantId: string }) => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    try {
      await addToCart(variantId);
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AuthError") {
          toast.error("Требуется авторизация", {
            description: error.message,
            action: {
              label: "Войти",
              onClick: () => router.push("/login"),
            },
          });
        } else {
          toast.error("Ошибка", {
            description: error.message,
          });
        }
      } else {
        toast.error("Неизвестная ошибка");
      }
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
