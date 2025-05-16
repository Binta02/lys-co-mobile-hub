
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/hooks/use-toast";

const DomiciliationPricing = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (offer: {id: string, title: string, price: string}) => {
    addItem({
      id: offer.id,
      title: offer.title,
      price: parseFloat(offer.price.replace(',', '.')),
      quantity: 1
    });

    toast({
      title: "Produit ajouté au panier",
      description: `${offer.title} a été ajouté à votre panier.`,
    });
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Sociétés - Artisans - Commerçants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-3xl font-bold">36€<span className="text-base font-normal">/mois</span></p>
            <p className="text-sm text-gray-600">Pour un engagement de plus de 6 mois, bénéficiez de 50% de réduction sur votre premier trimestre.</p>
            <p className="font-medium text-green-600">Soit 18€ vos 3 premiers mois !</p>
            <div className="space-y-2">
              <Button 
                className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                onClick={() => handleAddToCart({
                  id: 'domiciliation-mensuel-societe',
                  title: 'Domiciliation Mensuelle - Société',
                  price: '36,00'
                })}
              >
                Ajouter au panier
              </Button>
              <Link to="/service/domiciliation-societe" className="block w-full">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  Voir les détails <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auto-Entrepreneurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-3xl font-bold">24€<span className="text-base font-normal">/mois</span></p>
            <p className="text-sm text-gray-600">Pour un engagement de plus de 6 mois, bénéficiez de 50% de réduction sur votre premier trimestre.</p>
            <p className="font-medium text-green-600">Soit 12€ vos 3 premiers mois !</p>
            <div className="space-y-2">
              <Button 
                className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                onClick={() => handleAddToCart({
                  id: 'domiciliation-mensuel-auto-entrepreneur',
                  title: 'Domiciliation Mensuelle - Auto Entrepreneur',
                  price: '24,00'
                })}
              >
                Ajouter au panier
              </Button>
              <Link to="/service/domiciliation-auto-entrepreneur" className="block w-full">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  Voir les détails <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Associations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-3xl font-bold">15€<span className="text-base font-normal">/mois</span></p>
            <p className="text-sm text-gray-600">Tarif spécial pour les associations.</p>
            <div className="space-y-2">
              <Button 
                className="w-full flex items-center justify-center bg-lysco-turquoise hover:bg-opacity-90"
                onClick={() => handleAddToCart({
                  id: 'domiciliation-mensuel-association',
                  title: 'Domiciliation Mensuelle - Association',
                  price: '15,00'
                })}
              >
                Ajouter au panier
              </Button>
              <Link to="/service/domiciliation-association" className="block w-full">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  Voir les détails <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomiciliationPricing;
