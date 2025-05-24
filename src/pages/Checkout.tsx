import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  firstName: z.string().min(2, { message: "Prénom requis" }),
  lastName: z.string().min(2, { message: "Nom requis" }),
  companyName: z.string().min(2, { message: "Nom de l'entreprise requis" }),
  businessActivity: z.string().min(2, { message: "Activité de l'entreprise requise" }),
  siretNumber: z.string().min(14, { message: "Numéro SIRET requis (14 chiffres)" }).max(14),
  address: z.string().min(5, { message: "Adresse requise" }),
  addressDetails: z.string().optional(),
  city: z.string().min(2, { message: "Ville requise" }),
  postalCode: z.string().regex(/^\d{5}$/, { message: "Code postal à 5 chiffres requis" }),
  phone: z.string().optional(),
  country: z.string().default("France"),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { items, total, subtotal, tax, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      companyName: "",
      businessActivity: "",
      siretNumber: "",
      address: "",
      addressDetails: "",
      city: "",
      postalCode: "",
      phone: "",
      country: "France",
    }
  });

  //   const handleSubmit = async (data: FormValues) => {
  //   setIsProcessing(true)

  // const response = await fetch('https://mon-backend-node.vercel.app/api/create-payment-intent', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ amount: Math.round(total * 100), email: data.email }),
  // })

  // const { clientSecret } = await response.json()
  // if (!response.ok) {
  //   const errorText = await response.text();
  //   console.error('Erreur lors de la création du PaymentIntent :', errorText);
  //   setIsProcessing(false);
  //   return;
  // }
  // if (!clientSecret) {
  //   console.error('clientSecret manquant dans la réponse du backend');
  //   setIsProcessing(false);
  //   return;
  // }


  //   // 2) Confirmer le paiement avec Stripe.js
  //   if (!stripe || !elements) return
  //   const card = elements.getElement(CardElement)
  //   if (!card) return

  //   const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: { card },
  //     receipt_email: data.email,
  //   })

  //   if (error) {
  //     console.error(error)
  //     // afficher message d’erreur à l’utilisateur
  //     setIsProcessing(false)
  //   } else if (paymentIntent?.status === 'succeeded') {
  //     clearCart()
  //     navigate('/confirmation', {
  //       state: {
  //         order: { items, subtotal, tax, total, clientInfo: data, orderId: paymentIntent.id },
  //       },
  //     })
  //   }
  // };

const subscriptionProductIds = [
  'domiciliation-mensuel-societe',
  'domiciliation-mensuel-auto-entrepreneur',
  'domiciliation-mensuel-association',
  'service-reexpedition',
  'service-scan',
  'service-colis',
];

const getPriceIdFromProductId = (productId: string): string | undefined => {
  const map: Record<string, string> = {
    'domiciliation-mensuel-societe': 'price_1RRqxxxxxxSociete',
    'domiciliation-mensuel-auto-entrepreneur': 'price_1RRqxxxxxxAuto',
    'domiciliation-mensuel-association': 'price_1RRqxxxxxxAsso',
    'service-reexpedition': 'price_1RRqxxxxxxReexp',
    'service-scan': 'price_1RRqxxxxxxScan',
    'service-colis': 'price_1RRqxxxxxxColis',
  };

  return map[productId];
};

const handleSubmit = async (data: FormValues) => {
  setIsProcessing(true);
  if (!stripe || !elements) return;
  const card = elements.getElement(CardElement);
  if (!card) return;

  const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card,
    billing_details: { email: data.email },
  });

  if (paymentError || !paymentMethod) {
    console.error(paymentError);
    setIsProcessing(false);
    return;
  }

  const subscriptionItems = items.filter(item => subscriptionProductIds.includes(item.id));
  const oneTimeItems = items.filter(item => !subscriptionProductIds.includes(item.id));

  // Gestion des abonnements multiples
  if (subscriptionItems.length > 0) {
    const priceItems = subscriptionItems.map(item => {
      const priceId = getPriceIdFromProductId(item.id);
      if (!priceId) {
        console.error("Price ID introuvable pour l'abonnement :", item.id);
        return null;
      }
      return { price: priceId, quantity: item.quantity };
    }).filter(Boolean);

    if (priceItems.length === 0) {
      console.error("Aucun abonnement valide trouvé dans le panier");
      setIsProcessing(false);
      return;
    }

    const response = await fetch('https://mon-backend-node.vercel.app/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        paymentMethodId: paymentMethod.id,
        items: priceItems,
      }),
    });

    const { clientSecret, subscriptionId } = await response.json();
    if (!response.ok || !clientSecret) {
      console.error("Erreur lors de la création de l'abonnement");
      setIsProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
    if (confirmError) {
      console.error(confirmError);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded' && oneTimeItems.length === 0) {
      clearCart();
      navigate('/confirmation', {
        state: {
          order: { items, subtotal, tax, total, clientInfo: data, subscriptionId },
        },
      });
      return;
    }
  }

  // Paiement simple (ou si des produits one-time restent à payer)
  if (oneTimeItems.length > 0) {
    const oneTimeTotal = oneTimeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const response = await fetch('https://mon-backend-node.vercel.app/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(oneTimeTotal * 100), email: data.email }),
    });

    const { clientSecret } = await response.json();
    if (!response.ok || !clientSecret) {
      console.error("Erreur lors de la création du paiement");
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
      receipt_email: data.email,
    });

    if (error) {
      console.error(error);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      clearCart();
      navigate('/confirmation', {
        state: {
          order: { items, subtotal, tax, total, clientInfo: data, orderId: paymentIntent.id },
        },
      });
    }
  } else {
    // Si tout était des abonnements déjà traités
    clearCart();
    navigate('/confirmation', {
      state: {
        order: { items, subtotal, tax, total, clientInfo: data },
      },
    });
  }
};


  return (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Finaliser votre commande</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Informations de facturation et paiement */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informations de facturation</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="votre@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4 border-t mt-2">
                      <h3 className="font-medium mb-4">Adresse de facturation</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Entrez l'adresse de facturation qui correspond à votre moyen de paiement.
                      </p>

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pays / Région</FormLabel>
                            <FormControl>
                              <Input value="France" disabled {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prénom</FormLabel>
                              <FormControl>
                                <Input placeholder="Jean" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input placeholder="Dupont" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Nom de l'entreprise</FormLabel>
                            <FormControl>
                              <Input placeholder="Entreprise SAS" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessActivity"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Activité de l'entreprise</FormLabel>
                            <FormControl>
                              <Input placeholder="Conseil informatique" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="siretNumber"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Numéro SIRET</FormLabel>
                            <FormControl>
                              <Input placeholder="12345678901234" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Adresse postale</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Rue de Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="addressDetails"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Complément d'adresse (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="Appartement, étage, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4 mt-4">
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

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Téléphone (optionnel)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="0612345678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* <div className="pt-4 border-t mt-6">
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
                                <Input placeholder="MM/AA" {...field} />
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
                    </div> */}
                    <div className="pt-4 border-t mt-6">
                      <h3 className="font-medium mb-4">Informations de paiement</h3>
                      <div className="border p-3 rounded">
                        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
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
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between pb-2 border-b">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  ))}
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>TVA (20%)</span>
                      <span>{tax.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between pt-4 mt-2 border-t font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
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
