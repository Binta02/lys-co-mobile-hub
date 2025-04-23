
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const ProductDescription = () => {
  return (
    <div className="mt-16">
      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Avis (0)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description">
          <Card>
            <CardContent className="prose max-w-none p-6">
              <h3>Description</h3>
              <p>Notre service de réexpédition de courrier sur une période de 3 mois offre une solution pratique et efficace pour vous assurer de recevoir votre courrier même lorsque vous n'êtes pas à votre adresse habituelle.</p>
              <p>Avec notre service, nous réexpédions votre courrier chaque mardi pendant un trimestre, vous garantissant ainsi de rester connecté à votre correspondance où que vous soyez. Cette fréquence régulière de réexpédition assure une gestion efficace de votre courrier tout en évitant l'accumulation de documents importants.</p>
              <p>Le coût de ce service est de 10 euros par mois, ce qui vous permet de bénéficier d'une solution abordable pour la réexpédition de votre courrier pendant 3 mois. Veuillez noter que des frais supplémentaires seront facturés pour les timbres utilisés lors de la réexpédition, en fonction du volume de courrier et des tarifs postaux en vigueur.</p>
              <p>Avec notre service de réexpédition de courrier, vous pouvez avoir l'assurance que votre courrier vous parviendra de manière fiable et sécurisée, où que vous soyez dans le monde.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6">
              <p>Aucun avis pour le moment.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDescription;
