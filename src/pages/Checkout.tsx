
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/components/cart/CartContext';
import { Check, CreditCard } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Nom complet requis" }),
  email: z.string().email({ message: "Email invalide" }),
  address: z.string().min(5, { message: "Adresse requise" }),
  city: z.string().min(2, { message: "Ville requise" }),
  postalCode: z.string().regex(/^\d{5}$/, { message: "Code postal à 5 chiffres requis" }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Numéro de carte à 16 chiffres requis" }),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, { message: "Format MM/AA requis" }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV à 3 ou 4 chiffres requis" }),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    }
  });

  const handleSubmit = async (data: FormValues) => {
    setIsProcessing(true);
    
    // Simuler un traitement de commande
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    navigate('/confirmation', { 
      state: { 
        order: {
          items,
          total,
          clientInfo: data,
          orderId: `ORD-${Math.floor(Math.random() * 1000000)}`
        } 
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Finaliser votre commande</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Informations de paiement */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Vos informations</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean Dupont" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jean.dupont@exemple.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Rue de Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ville</FormLabel>
                              <FormControl>
                                <Input placeholder="Paris" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code postal</FormLabel>
                              <FormControl>
                                <Input placeholder="75001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="pt-4 border-t mt-6">
                        <h3 className="font-medium mb-4">Informations de paiement</h3>
                        
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Numéro de carte</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="1234 5678 9012 3456" {...field} />
                                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date d'expiration</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90 mt-6"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Traitement en cours..." : `Payer ${total.toFixed(2)} €`}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Résumé de la commande */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Votre commande</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between pb-2 border-b">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                      </div>
                    ))}
                    
                    <div className="flex justify-between pt-4 font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
