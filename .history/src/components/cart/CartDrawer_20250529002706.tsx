// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, Trash, Plus, Minus } from "lucide-react";
// import { useCart } from "@/components/cart/CartContext";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export function CartDrawer({ onCheckout }: { onCheckout?: () => void }) {
//   const { items, removeItem, updateQuantity, total, subtotal, tax } = useCart();

//   return (
//     <div className="flex flex-col flex-1 mt-8">
//       {items.length === 0 ? (
//         <p className="text-center text-gray-500">Votre panier est vide</p>
//       ) : (
//         <>
//           <ScrollArea
//             className="flex-1 pr-4"
//             style={{ maxHeight: "calc(70vh - 120px)" }}
//           >
//             <div className="space-y-4">
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center justify-between border-b pb-4"
//                 >
//                   <div className="space-y-1">
//                     <p className="font-medium">{item.title}</p>
//                     <p className="text-sm text-gray-500">{item.price} €</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-8 w-8 text-red-500"
//                       onClick={() => removeItem(item.id)}
//                     >
//                       <Trash className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>

//           <div className="pt-4 mt-4 border-t sticky bottom-0 bg-background">
//             <div className="flex justify-between text-sm">
//               <span>Sous-total</span>
//               <span>{subtotal.toFixed(2)} €</span>
//             </div>
//             <div className="flex justify-between text-sm mt-2">
//               <span>TVA (20%)</span>
//               <span>{tax.toFixed(2)} €</span>
//             </div>
//             <div className="flex justify-between font-medium mt-2 pt-2 border-t">
//               <span>Total</span>
//               <span>{total.toFixed(2)} €</span>
//             </div>
//             <Button
//               className="w-full mt-4 bg-lysco-turquoise hover:bg-lysco-turquoise/90"
//               asChild
//               onClick={onCheckout}
//             >
//               <Link to="/checkout">Passer la commande</Link>
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartDrawer({ onCheckout }: { onCheckout?: () => void }) {
  const { items, removeItem, updateQuantity, total, subtotal, tax } = useCart();

  return (
    <div className="flex flex-col flex-1">
      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base mt-6">
          Votre panier est vide
        </p>
      ) : (
        <>
          <ScrollArea className="flex-1 pr-2 sm:pr-4 max-h-[60vh] sm:max-h-[70vh]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 border-b pb-4"
                >
                  <div className="flex-1 min-w-[120px]">
                    <p className="font-medium truncate max-w-[200px] sm:max-w-xs">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.price} €</p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
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

          <div className="pt-4 mt-4 border-t bg-background text-sm sm:text-base">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between mt-2">
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
