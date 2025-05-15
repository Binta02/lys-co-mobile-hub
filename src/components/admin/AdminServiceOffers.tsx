
// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ShoppingCart } from 'lucide-react';
// import { Link } from 'react-router-dom';

// interface ServiceProps {
//   id: string;
//   title: string;
//   price: string;
//   note?: string;
// }

// const services: ServiceProps[] = [
//   {
//     id: 'vtc-creation',
//     title: 'Accompagnement création VTC – Driel',
//     price: '900,00',
//     note: '*hors coûts organismes'
//   },
//   {
//     id: 'bank-account',
//     title: 'Accompagnement ouverture de compte bancaire en ligne',
//     price: '150,00'
//   },
//   {
//     id: 'company-creation',
//     title: 'Accompagnement ouverture de votre société',
//     price: '600,00'
//   },
//   {
//     id: 'micro-company',
//     title: 'Accompagnement ouverture micro entreprise',
//     price: '150,00'
//   },
//   {
//     id: 'company-transfer',
//     title: 'Accompagnement transfert de société',
//     price: '600,00',
//     note: '*hors coûts organismes'
//   },
//   {
//     id: 'share-transfer',
//     title: 'Cession de parts',
//     price: '200,00'
//   },
//   {
//     id: 'commercial-ad',
//     title: "Création annonce commerciale pour site d'annonces",
//     price: '15,00'
//   },
//   {
//     id: 'quote-creation',
//     title: 'Création devis ou service',
//     price: '15,00'
//   },
//   {
//     id: 'annual-accounts',
//     title: 'Dépôt des comptes annuels',
//     price: '300,00',
//     note: '*hors coûts organismes'
//   },
//   {
//     id: 'company-modification',
//     title: 'Modification société',
//     price: '900,00',
//     note: '*hors coûts organismes'
//   }
// ];

// const AdminServiceOffers = () => {
//   return (
//     <div className="py-12">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold mb-4">Services administratifs</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((service) => (
//             <Card key={service.id} className="flex flex-col">
//               <CardHeader>
//                 <CardTitle className="text-xl">{service.title}</CardTitle>
//               </CardHeader>
//               <CardContent className="flex-grow flex flex-col justify-between">
//                 <div className="space-y-2">
//                   <p className="text-2xl font-semibold text-lysco-turquoise">{service.price} €</p>
//                   {service.note && <p className="text-sm text-gray-500">{service.note}</p>}
//                 </div>
//                 <Link to={`/service/${service.id}`} className="w-full">
//                   <Button className="mt-4 w-full flex items-center justify-center gap-2">
//                     <ShoppingCart className="h-4 w-4" />
//                     Ajouter au panier
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminServiceOffers;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const services = [
  'vtc-creation',
  'bank-account',
  'company-creation',
  'micro-company',
  'company-transfer',
  'share-transfer',
  'commercial-ad',
  'quote-creation',
  'annual-accounts',
  'company-modification'
];

const AdminServiceOffers = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="w-10 h-10 text-lysco-turquoise" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Services administratifs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((id) => {
            const service = serviceData[id];
            if (!service) return null;
            return (
              <Card key={id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-lysco-turquoise">{service.price} €</p>
                    {service.note && <p className="text-sm text-gray-500 italic">{service.note}</p>}
                    <p className="text-sm text-gray-700 whitespace-pre-line line-clamp-4">{service.description}</p>
                  </div>
                  <Link to={`/services/${id}`} className="w-full">
                    <Button className="mt-4 w-full flex items-center justify-center gap-2 bg-lysco-turquoise text-white hover:bg-lysco-turquoise/90">
                      En savoir plus
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminServiceOffers;
