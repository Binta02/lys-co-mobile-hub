
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Lock } from 'lucide-react';
import RelatedProducts from '@/components/services/RelatedProducts';
import ProductDescription from '@/components/services/ProductDescription';

const ServiceDetail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service Info */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Réexpédition courrier (3 mois)</h1>
              <div className="text-2xl font-semibold text-lysco-turquoise">30,00 €</div>
              <p className="text-sm text-gray-500">Hors taxes</p>
              
              <div className="prose max-w-none">
                <p>Notre service de réexpédition de courrier sur 3 mois vous offre une solution pratique pour recevoir votre courrier où que vous soyez. Nous réexpédions votre courrier chaque mardi pendant un trimestre, assurant ainsi une gestion efficace de votre correspondance.</p>
              </div>
            </div>

            {/* Purchase Card */}
            <Card className="p-6">
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span>Quantité</span>
                  <Input 
                    type="number" 
                    defaultValue={1} 
                    min={1}
                    className="w-24" 
                  />
                </div>

                <Button className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                  Ajouter au panier
                </Button>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Lock className="h-4 w-4" />
                    <span>PAIEMENT SÉCURISÉ GARANTI</span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="flex items-center justify-center p-2 border rounded">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div className="flex items-center justify-center p-2 border rounded">
                      <img src="/visa.png" alt="Visa" className="h-6" />
                    </div>
                    <div className="flex items-center justify-center p-2 border rounded">
                      <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for Description and Reviews */}
          <ProductDescription />

          {/* Related Products */}
          <RelatedProducts />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
