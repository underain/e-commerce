import { getCart } from "@/features/cart/lib/get-user-cart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import CartProducts from "./cart-products";
import CartOrdering from "./cart-ordering";
import EmptyCart from "./empty-cart";
const Cart = async () => {
  const cartProducts = await getCart();
  const totalPrice = cartProducts.reduce((sum, item) => sum + item.price, 0);
  const totalCount = cartProducts.length;
  return (
    <main className="max-w-[1440px] w-full mx-auto p-5">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Корзина</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <h1 className="text-2xl font-black lg:text-3xl mb-5 lg:mb-8">
          Корзина
        </h1>
        <div className="flex flex-col md:flex-row gap-5">
          {!cartProducts.length ? (
            <EmptyCart />
          ) : (
            <>
              <CartProducts products={cartProducts} />
              <CartOrdering totalPrice={totalPrice} totalCount={totalCount} />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cart;
