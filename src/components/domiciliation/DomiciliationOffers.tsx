import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from "@/components/cart/CartContext";
import { Link } from 'react-router-dom';

interface OfferProps {
  id: number;
  title: string;
  price: string;
  originalPrice?: string;
  isPromo?: boolean;
  slug: string;
}

const DomiciliationOffers = () => {
  const { addItem } = useCart();
  const [offers, setOffers] = useState<OfferProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('https://lys-and-co.com/wp-json/wp/v2/product?categories=22&per_page=100');
        const data = await response.json();

        const formattedOffers = data.map((item: any) => ({
          id: item.id,
          title: item.title.rendered,
          price: (item.price || item.acf?.price || "0").replace('.', ','), // adapt depending on your API structure
          originalPrice: item.acf?.original_price ? item.acf.original_price.replace('.', ',') : undefined,
          isPromo: !!item.acf?.original_price,
          slug: item.slug,
        }));

        setOffers(formattedOffers);
      } catch (error) {
        console.error("Erreur lors du chargement des offres :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-lysco-turquoise text-lg">Chargement des offres...</span>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Nos offres de domiciliation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <Card key={offer.id} className="flex flex-col">
              <CardHeader>
                {offer.isPromo && (
                  <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    Promo !
                  </div>
                )}
                <Link to={`/service/${offer.slug}`}>
                  <CardTitle className="text-xl hover:text-lysco-turquoise transition">
                    {offer.title}
                  </CardTitle>
                </Link>
              </CardHeader>

              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  {offer.isPromo && offer.originalPrice && (
                    <p className="text-lg line-through text-gray-500">{offer.originalPrice} €</p>
                  )}
                  <p className="text-2xl font-semibold text-lysco-turquoise">{offer.price} €</p>
                </div>

                <Button
                  className="mt-4 w-full flex items-center justify-center gap-2"
                  onClick={() =>
                    addItem({
                      id: `offer-${offer.id}`,
                      title: offer.title,
                      price: parseFloat(offer.price.replace(',', '.')),
                      quantity: 1,
                    })
                  }
                >
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
