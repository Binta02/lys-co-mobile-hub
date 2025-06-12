import React from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartDrawer({ onCheckout }: { onCheckout?: () => void }) {
  const { items, removeItem, updateQuantity, total, subtotal, tax } = useCart();

  return (
    <div
      className="
    fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out
    data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=closed]:duration-300 data-[state=open]:duration-500
    inset-y-0 right-0 h-full border-l
    data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right
    w-full max-w-xs sm:max-w-sm sm:w-[540px] flex flex-col
  "
    >
      <button
        onClick={onCheckout} // Remplace par ta fonction de fermeture si besoin
        className="absolute top-4 right-4 rounded-full p-2 bg-white hover:bg-gray-100 z-50"
        aria-label="Fermer le panier"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x h-6 w-6 text-black"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
      {items.length === 0 ? (
        <p className="text-center text-gray-500">Votre panier est vide</p>
      ) : (
        <>
          <ScrollArea
            className="flex-1 pr-4"
            style={{ maxHeight: "calc(70vh - 120px)" }}
          >
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.price} €</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="pt-4 mt-4 border-t sticky bottom-0 bg-background">
            <div className="flex justify-between text-sm">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>TVA (20%)</span>
              <span>{tax.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between font-medium mt-2 pt-2 border-t">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <Button
              className="w-full mt-4 bg-lysco-turquoise hover:bg-lysco-turquoise/90"
              asChild
              onClick={onCheckout}
            >
              <Link to="/checkout">Passer la commande</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
