import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function FloatingCartButton() {
  const { items } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-4 right-4 z-50">
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {items.length}
              </Badge>
            )}
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] flex flex-col"
      >
        <SheetTitle>Votre panier</SheetTitle>
        <CartDrawer />
      </SheetContent>
    </Sheet>
  );
}
