
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface OfferProps {
  title: string;
  price: string;
  originalPrice?: string;
  isPromo?: boolean;
}

const offers: OfferProps[] = [
  {
    title: 'Domiciliation 1 an – Entreprise',
    price: '361,80',
    originalPrice: '432,00',
    isPromo: true,
  },
  {
    title: 'Domiciliation 3 mois – Entreprise',
    price: '108,00',
  },
  {
    title: 'Domiciliation 3 mois – Micro Entreprise',
    price: '72,00',
  },
  {
    title: 'Domiciliation 6 mois – Entreprise',
    price: '162,00',
    originalPrice: '216,00',
    isPromo: true,
  },
  {
    title: 'Domiciliation 6 mois – Micro Entreprise',
    price: '108,00',
    originalPrice: '144,00',
    isPromo: true,
  },
  {
    title: 'Pack domicilié',
    price: '1514,00',
  },
];

const DomiciliationOffers = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Nos offres de domiciliation</h2>
          <p className="text-gray-600">6 résultats affichés</p>
          <p className="text-sm text-gray-500">Tri par défaut</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                {offer.isPromo && (
                  <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    Promo !
                  </div>
                )}
                <CardTitle className="text-xl">{offer.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  {offer.isPromo && offer.originalPrice && (
                    <p className="text-lg line-through text-gray-500">{offer.originalPrice} €</p>
                  )}
                  <p className="text-2xl font-semibold text-lysco-turquoise">{offer.price} €</p>
                </div>
                <Button className="mt-4 w-full flex items-center justify-center gap-2" onClick={() => addToCart(service)}>
                  <ShoppingCart className="h-4 w-4" />
                  Ajouter au panier
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomiciliationOffers;
