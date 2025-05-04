
import React from 'react';
import { Link } from 'react-router-dom';
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

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {items.length > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Votre panier</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Votre panier est vide</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
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
              <div className="pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <Button 
                  className="w-full mt-4 bg-lysco-turquoise hover:bg-lysco-turquoise/90"
                  asChild
                >
                  <Link to="/checkout">Passer la commande</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
