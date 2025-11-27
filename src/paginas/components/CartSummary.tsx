import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
//resumen del pedido
export default function CartSummary() {
  const { total } = useCart();

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6 sticky top-4">
        <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-gray-500">Envío</span>
          <span className="font-semibold">Gratis</span>
        </div>

        <div className="border-t my-4"></div>

        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <Button className="w-full mb-3 add-cart-button">
          Proceder al pago
        </Button>

        <Button
          variant="outline"
          className="w-full add-cart-button"
          onClick={() => (window.location.href = "/productos")}
        >
          Continuar comprando
        </Button>
      </div>
    </div>
  );
}
