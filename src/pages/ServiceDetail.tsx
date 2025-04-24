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
import { useCart } from "@/components/cart/CartContext";

interface ServiceData {
  title: string;
  price: string;
  description: string;
  priceUnit?: string;
  originalPrice?: string;
  isPromo?: boolean;
  note?: string;
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
  'coworking-space': {
      title: 'Espace de coworking',
      price: '5,00',
      priceUnit: '/heure',
      description: 'Espace de coworking pour 8 personnes avec Wi-Fi et espace calme. Réservation flexible à l’heure.'
    },
  'formation-room': {
      title: 'Salle de formation',
      price: '10,00',
      priceUnit: '/heure',
      description: 'Salle pour 10 personnes. Tarifs : 10€/h, 25€/demi-journée, 45€/journée. Matériel pédagogique disponible.'
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
  },
  'vtc-creation': {
    title: 'Accompagnement création VTC – Driel',
    price: '900,00',
    note: '*hors coûts organismes',
    description: "Notre service d'accompagnement pour l'ouverture de votre société VTC est spécialement conçu pour simplifier le processus de création et de lancement de votre entreprise de transport avec chauffeur. En partenariat avec notre expert-comptable spécialisé dans le domaine, nous vous offrons une assistance professionnelle et personnalisée à chaque étape du processus, garantissant une démarche efficace et conforme à toutes les exigences réglementaires.\n\nNous comprenons que le démarrage d'une entreprise VTC peut être complexe, avec de nombreuses démarches administratives et juridiques à suivre. C'est pourquoi notre équipe dédiée est là pour vous guider à travers toutes les étapes, depuis l'enregistrement de votre société jusqu'à l'obtention des licences et des permis nécessaires. Notre objectif est de vous offrir une assistance complète et de qualité, vous permettant de lancer votre entreprise avec confiance et succès.\n\nDe plus, pour rendre nos services encore plus accessibles, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous. Cette réduction s'applique en plus des frais de service hors frais d'organisme, ce qui vous permet de bénéficier d'un accompagnement professionnel à un tarif avantageux."
  },
  'bank-account': {
    title: 'Accompagnement ouverture de compte bancaire en ligne',
    price: '150,00',
    description: "Service d'assistance personnalisée pour l'ouverture de votre compte bancaire professionnel en ligne."
  },
  'company-creation': {
    title: 'Accompagnement ouverture de votre société',
    price: '600,00',
    description: "Assistance complète pour la création de votre société, incluant les démarches administratives et juridiques."
  },
  'micro-company': {
    title: 'Accompagnement ouverture micro entreprise',
    price: '150,00',
    description: "Accompagnement pour la création de votre micro-entreprise, incluant les formalités administratives."
  },
  'company-transfer': {
    title: 'Accompagnement transfert de société',
    price: '600,00',
    note: '*hors coûts organismes',
    description: "Service d'accompagnement pour le transfert de votre société, incluant toutes les démarches nécessaires."
  },
  'share-transfer': {
    title: 'Cession de parts',
    price: '200,00',
    description: "Assistance pour la cession de parts de votre société, incluant la préparation des documents nécessaires."
  },
  'commercial-ad': {
    title: "Création annonce commerciale pour site d'annonces",
    price: '15,00',
    description: "Rédaction professionnelle d'annonces commerciales pour différentes plateformes."
  },
  'quote-creation': {
    title: 'Création devis ou service',
    price: '15,00',
    description: "Création de devis professionnels personnalisés pour vos clients."
  },
  'annual-accounts': {
    title: 'Dépôt des comptes annuels',
    price: '300,00',
    note: '*hors coûts organismes',
    description: "Service de dépôt de vos comptes annuels, en conformité avec les exigences légales."
  },
  'company-modification': {
    title: 'Modification société',
    price: '900,00',
    note: '*hors coûts organismes',
    description: "Accompagnement pour toute modification de votre société (statuts, siège social, etc.)."
  }
};

const ServiceDetail = () => {
  const { addItem } = useCart();
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
                <Button
                  className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90"
                  onClick={() =>
                    addItem({
                      id: `service-${id}`,
                      title: service.title,
                      price: parseFloat(service.price.replace(',', '.')),
                      quantity: 1
                    })
                  }
                >
                  <ShoppingCart className="h-4 w-4" />
                  Ajouter au panier
                </Button>


                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Lock className="h-4 w-4" />
                    <span>PAIEMENT SÉCURISÉ GARANTI</span>
                  </div>

                  <div className="mt-4">
                    <form action="/create-checkout-session" method="POST">
                      <Button 
                        type="submit"
                        className="w-full mt-4 bg-black text-white hover:bg-gray-800"
                      >
                        Payer avec Stripe (Carte bancaire, Apple Pay, Google Pay)
                      </Button>
                    </form>
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
