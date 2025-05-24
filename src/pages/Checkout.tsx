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

const lineItems = [
  { price: 'price_id_abonnement', quantity: 1 },  // abonnement
  { price: 'price_id_unique', quantity: 1 },      // achat unique
  
];

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
    'domiciliation-mensuel-societe-normal': 'price_1RSKGYQ5vrwB5bWyC5m7YKIm', //fait
    'domiciliation-mensuel-societe-reduit': 'price_1RSMFmQ5vrwB5bWyBk9nXFcb', //fait
    'domiciliation-mensuel-auto-entrepreneur-normal': 'price_1RSMGfQ5vrwB5bWyWe4cF5pp',//fait
    'domiciliation-mensuel-auto-entreprise-reduit': 'price_1RSMGIQ5vrwB5bWy4e4ogBUY', //fait
    'domiciliation-mensuel-association': 'price_1RSLsMQ5vrwB5bWydudKGQ7b', //fait
    'service-reexpedition': 'price_1RSLlyQ5vrwB5bWyTf2ay5tf', //fait
    'service-scan': 'price_1RSLmKQ5vrwB5bWyRouPTXPR', //fait
    'service-colis': 'price_1RSLmcQ5vrwB5bWyeWckoEPg', //fait
    'coworking-space': 'price_1RSMKlQ5vrwB5bWyTH1NrRlA', //fait
    'location-bureau': 'price_1RSMLjQ5vrwB5bWyUerVSlHF', //fait
    'formation-room': 'price_1RSMLIQ5vrwB5bWysp4JTZZQ', //fait
    'domiciliation-1an-entreprise': 'price_1RSLi2Q5vrwB5bWyeizWaoWy', //fait
    'domiciliation-3mois-entreprise': 'price_1RSLinQ5vrwB5bWyYpgyzSyL', //fait
    'domiciliation-3mois-micro': 'price_1RSLjPQ5vrwB5bWyoNy1OKMb', //fait
    'domiciliation-6mois-entreprise': 'price_1RSLkAQ5vrwB5bWyk4rjnkyb',//fait
    'domiciliation-6mois-micro': 'price_1RSLkfQ5vrwB5bWymj0lkM4Z',//fait
    'pack-domine': 'price_1RSLlCQ5vrwB5bWyqOByLGS5', //fait
    'vtc-creation': 'price_1RSLnfQ5vrwB5bWy7D4g1s1M', //fait
    'bank-account': 'price_1RSLo4Q5vrwB5bWyqaPfyWN0', //fait
    'company-creation': 'price_1RSLoRQ5vrwB5bWyLbVvOhhe', //fait
    'micro-company': 'price_1RSLozQ5vrwB5bWyhXZaREUE', //fait
    'company-transfer': 'price_1RSLpLQ5vrwB5bWyFdN0Wljp', //fait
    'share-transfer': 'price_1RSLpjQ5vrwB5bWynvYt7DzQ', //fait
    'commercial-ad': 'price_1RSLqCQ5vrwB5bWyabANz81P', //fait
    'quote-creation': 'price_1RSLqdQ5vrwB5bWyuMOQBt2h', //fait
    'annual-accounts': 'price_1RSLqzQ5vrwB5bWyp2PPrbP2', //fait
    'company-modification': 'price_1RSLrMQ5vrwB5bWyqYeVbL0c', //fait

  };
  return map[productId];
};

const sendToStripeCheckout = async (email: string, lineItems: { price: string, quantity: number }[], mode: 'payment' | 'subscription') => {
  const response = await fetch('https://mon-backend-node.vercel.app/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, lineItems, mode }),
  });

  const data = await response.json();
  if (!response.ok || !data.url) {
    throw new Error('Erreur lors de la création de la session Stripe');
  }

  window.location.href = data.url;
};

const handleSubmit = async (data: FormValues) => {
  setIsProcessing(true);

  try {
    const subscriptionItems = items
      .filter(item => subscriptionProductIds.includes(item.id))
      .map(item => {
        const priceId = getPriceIdFromProductId(item.id);
        if (!priceId) throw new Error(`Price ID manquant pour ${item.id}`);
        return { price: priceId, quantity: item.quantity };
      });

    const oneTimeItems = items
      .filter(item => !subscriptionProductIds.includes(item.id))
      .map(item => {
        const priceId = getPriceIdFromProductId(item.id);
        if (!priceId) throw new Error(`Price ID manquant pour ${item.id}`);
        return { price: priceId, quantity: item.quantity };
      });

    // On ouvre d'abord une session pour les paiements ponctuels
    if (oneTimeItems.length > 0) {
      await sendToStripeCheckout(data.email, oneTimeItems, 'payment');
    }

    // Puis une session pour les abonnements
    if (subscriptionItems.length > 0) {
      await sendToStripeCheckout(data.email, subscriptionItems, 'subscription');
    }

    clearCart();
  } catch (err) {
    console.error(err);
  } finally {
    setIsProcessing(false);
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
