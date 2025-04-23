
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RelatedProducts = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Réception colis (3 mois)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-semibold text-lysco-turquoise">18,00 €</p>
            <Button className="w-full">Ajouter au panier</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scan courrier (3 mois)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-semibold text-lysco-turquoise">18,00 €</p>
            <Button className="w-full">Ajouter au panier</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Création courrier administratif ou commercial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-semibold text-lysco-turquoise">30,00 €</p>
            <Button className="w-full">Ajouter au panier</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RelatedProducts;
