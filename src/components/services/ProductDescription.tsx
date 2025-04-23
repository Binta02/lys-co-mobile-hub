
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ReviewForm from './ReviewForm';
import { useParams } from 'react-router-dom';

const ProductDescription = () => {
  const { id } = useParams();
  const productName = "Accompagnement création VTC – Driel (*hors coûts organismes)";

  return (
    <div className="mt-16">
      <Tabs defaultValue="description" className="space-y-4">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Avis (0)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description">
          <Card>
            <CardContent className="prose max-w-none p-6">
              <h3>Description</h3>
              <p>Notre service d'accompagnement pour l'ouverture de votre société VTC est spécialement conçu pour simplifier le processus de création et de lancement de votre entreprise de transport avec chauffeur. En partenariat avec notre expert-comptable spécialisé dans le domaine, nous vous offrons une assistance professionnelle et personnalisée à chaque étape du processus, garantissant une démarche efficace et conforme à toutes les exigences réglementaires.</p>
              <p>Nous comprenons que le démarrage d'une entreprise VTC peut être complexe, avec de nombreuses démarches administratives et juridiques à suivre. C'est pourquoi notre équipe dédiée est là pour vous guider à travers toutes les étapes, depuis l'enregistrement de votre société jusqu'à l'obtention des licences et des permis nécessaires. Notre objectif est de vous offrir une assistance complète et de qualité, vous permettant de lancer votre entreprise avec confiance et succès.</p>
              <p>De plus, pour rendre nos services encore plus accessibles, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous. Cette réduction s'applique en plus des frais de service hors frais d'organisme, ce qui vous permet de bénéficier d'un accompagnement professionnel à un tarif avantageux.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6">
              <ReviewForm productName={productName} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDescription;
