
import React, { useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Lock } from 'lucide-react';
import RelatedProducts from '@/components/services/RelatedProducts';
import ProductDescription from '@/components/services/ProductDescription';
import { useParams } from 'react-router-dom';

const serviceData = {
  'reexpedition-courrier': {
    title: 'Réexpédition courrier (3 mois)',
    price: '30,00',
    description: 'Notre service de réexpédition de courrier sur 3 mois vous offre une solution pratique pour recevoir votre courrier où que vous soyez. Nous réexpédions votre courrier chaque mardi pendant un trimestre, assurant ainsi une gestion efficace de votre correspondance.'
  },
  'scan-courrier': {
    title: 'Scan de courrier (3 mois)',
    price: '18,00',
    description: 'Notre service de numérisation de courrier vous permet d\'accéder à vos documents importants dès leur réception. Les documents sont scannés en haute qualité et envoyés directement sur votre espace client sécurisé.'
  },
  'reception-colis': {
    title: 'Réception colis (3 mois)',
    price: '18,00',
    description: 'Service de garde de colis en toute sécurité. Nous réceptionnons vos colis professionnels ou personnels et les conservons jusqu\'à votre passage ou leur réexpédition selon vos instructions.'
  },
  'location-bureau': {
    title: 'Location de bureau',
    price: '5,00',
    priceUnit: '/heure',
    description: 'Espaces de coworking modernes et confortables, équipés de toutes les commodités nécessaires. Location flexible à l\'heure, à la demi-journée ou à la journée complète.'
  },
  'domiciliation-societe': {
    title: 'Domiciliation Sociétés - Artisans - Commerçants',
    price: '36,00',
    priceUnit: '/mois',
    description: 'Service complet de domiciliation commerciale pour entreprises, artisans et commerçants. Inclut une adresse professionnelle et la gestion de votre courrier.'
  },
  'domiciliation-auto-entrepreneur': {
    title: 'Domiciliation Auto-Entrepreneurs',
    price: '24,00',
    priceUnit: '/mois',
    description: 'Solution de domiciliation adaptée aux besoins spécifiques des auto-entrepreneurs. Bénéficiez d\'une adresse professionnelle à moindre coût.'
  },
  'domiciliation-association': {
    title: 'Domiciliation Associations',
    price: '15,00',
    priceUnit: '/mois',
    description: 'Offre dédiée aux associations avec tarif préférentiel. Donnez une adresse officielle à votre association et centralisez votre courrier.'
  },
  'pack-exclusif': {
    title: 'Pack Exclusif Nouveaux Domiciliés',
    price: '1514,00',
    description: 'Pack complet incluant un site internet sur mesure, 100 cartes de visite professionnelles, création de pages Instagram et LinkedIn, et 3 mois de domiciliation gratuite.'
  }
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const service = useMemo(() => {
    if (!id || !serviceData[id as keyof typeof serviceData]) {
      // Service par défaut si l'ID est invalide
      return serviceData['reexpedition-courrier'];
    }
    return serviceData[id as keyof typeof serviceData];
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service Info */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{service.title}</h1>
              <div className="text-2xl font-semibold text-lysco-turquoise">{service.price} €{service.priceUnit || ''}</div>
              <p className="text-sm text-gray-500">Hors taxes</p>
              
              <div className="prose max-w-none">
                <p>{service.description}</p>
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
