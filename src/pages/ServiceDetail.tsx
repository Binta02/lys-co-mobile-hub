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

interface ServiceData {
  title: string;
  price: string;
  description: string;
  priceUnit?: string;
  originalPrice?: string;
  isPromo?: boolean;
}

const serviceData: Record<string, ServiceData> = {
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
  'domiciliation-1an-entreprise': {
    title: 'Domiciliation 1 an – Entreprise',
    price: '361,80',
    originalPrice: '432,00',
    isPromo: true,
    description: 'Service de domiciliation commerciale annuelle pour entreprises. Profitez d\'une adresse professionnelle prestigieuse pour votre société pendant 12 mois.'
  },
  'domiciliation-3mois-entreprise': {
    title: 'Domiciliation 3 mois – Entreprise',
    price: '108,00',
    description: 'Solution de domiciliation trimestrielle pour entreprises. Idéal pour tester notre service ou pour des besoins à court terme.'
  },
  'domiciliation-3mois-micro': {
    title: 'Domiciliation 3 mois – Micro Entreprise',
    price: '72,00',
    description: 'Offre adaptée aux micro-entreprises pour une durée de 3 mois. Une solution économique pour les entrepreneurs individuels.'
  },
  'domiciliation-6mois-entreprise': {
    title: 'Domiciliation 6 mois – Entreprise',
    price: '162,00',
    originalPrice: '216,00',
    isPromo: true,
    description: 'Service de domiciliation semestrielle pour entreprises. Une solution flexible avec un excellent rapport qualité-prix.'
  },
  'domiciliation-6mois-micro': {
    title: 'Domiciliation 6 mois – Micro Entreprise',
    price: '108,00',
    originalPrice: '144,00',
    isPromo: true,
    description: 'Offre semestrielle spéciale micro-entreprises. Bénéficiez d\'une réduction importante sur 6 mois de domiciliation.'
  },
  'pack-domine': {
    title: 'Pack domicilié',
    price: '1514,00',
    description: 'Pack complet incluant un site internet sur mesure, 100 cartes de visite professionnelles, création de pages Instagram et LinkedIn, et 3 mois de domiciliation gratuite.'
  }
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const service = useMemo(() => {
    if (!id || !serviceData[id as keyof typeof serviceData]) {
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
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{service.title}</h1>
              <div className="flex items-baseline gap-2">
                {service.isPromo && service.originalPrice && (
                  <span className="text-lg line-through text-gray-500">{service.originalPrice} €</span>
                )}
                <div className="text-2xl font-semibold text-lysco-turquoise">{service.price} €{service.priceUnit || ''}</div>
              </div>
              {service.isPromo && (
                <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  Promo !
                </div>
              )}
              <p className="text-sm text-gray-500">Hors taxes</p>
              
              <div className="prose max-w-none">
                <p>{service.description}</p>
              </div>
            </div>

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

          <ProductDescription />

          <RelatedProducts />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
