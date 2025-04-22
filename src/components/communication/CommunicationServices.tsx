
// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';

// const services = [
//   {
//     title: "Stratégie",
//     description: "Conseil et mise en place",
//   },
//   {
//     title: "Communication globale et digitale",
//     description: "Solutions complètes pour votre présence numérique",
//   },
//   {
//     title: "Communication orale",
//     description: "Médiatraining - Préparation, conférence et autres présentations",
//   },
//   {
//     title: "Communication print & visuelle",
//     description: "Cartes de visites, flyers, affiches, logos, plaquettes, livres blancs, photos et vidéos",
//   },
//   {
//     title: "Communication web",
//     description: "Conception et réalisation de site web",
//   },
//   {
//     title: "Créations de contenu",
//     description: "Photo, vidéo et contenus médias",
//   },
// ];

// const CommunicationServices = () => {
//   return (
//     <section className="py-16 px-4 bg-white">
//       <div className="container mx-auto">
//         <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Les Prestations de Communication</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((service, index) => (
//             <Card key={index} className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <CardTitle className="text-xl">{service.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 mb-4">{service.description}</p>
//                 <Link to="/contact">
//                   <Button variant="ghost" className="text-lysco-turquoise hover:text-lysco-turquoise/90">
//                     En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CommunicationServices;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Stratégie",
    description: "Audit et accompagnement stratégique pour optimiser votre communication.",
    link: "/communication/strategie",
  },
  {
    title: "Community Management",
    description: "Gestion et animation de vos réseaux sociaux pour fédérer votre communauté.",
    link: "/communication/community-management",
  },
  {
    title: "Créations",
    description: "Conception de supports visuels sur mesure pour valoriser votre image de marque.",
    link: "/communication/creations",
  },
  {
    title: "Communication Print",
    description: "Réalisation de supports imprimés : flyers, brochures, cartes de visite, etc.",
    link: "/communication/print",
  },
  {
    title: "Site Internet",
    description: "Conception et développement de sites web adaptés à vos besoins.",
    link: "/communication/site-internet",
  },
  {
    title: "Photos",
    description: "Services photographiques professionnels pour mettre en valeur vos produits et services.",
    link: "/communication/photos",
  },
  {
    title: "Media Training",
    description: "Formation à la prise de parole en public et aux relations médias.",
    link: "/communication/media-training",
  },
  {
    title: "Packs de Communication",
    description: "Offres packagées pour une communication complète et cohérente.",
    link: "/communication/packs",
  },
];

const CommunicationServices = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Nos Prestations de Communication</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to={service.link}>
                  <Button variant="ghost" className="text-lysco-turquoise hover:text-lysco-turquoise/90">
                    En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunicationServices;
