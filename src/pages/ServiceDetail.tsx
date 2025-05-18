import React, { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Lock, Calendar, Clock } from 'lucide-react';
import RelatedProducts from '@/components/services/RelatedProducts';
import ProductDescription from '@/components/services/ProductDescription';
import { useCart } from "@/components/cart/CartContext";
import { useParams } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import ReviewForm from '@/components/services/ReviewForm';
import ReviewsList from '@/components/services/ReviewsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

interface ServiceData {
  title: string;
  price: string;
  description: string;
  priceUnit?: string;
  originalPrice?: string;
  isPromo?: boolean;
  note?: string;
}

interface CoworkingPrices {
  hour: number;
}

interface FormationRoomPrices {
  hour: number;
  halfDay: number;
  fullDay: number;
}

interface LocationBureauPrices {
  halfDay: number;
  fullDay: number;
}

interface ReservationPrices {
  'coworking-space': CoworkingPrices;
  'formation-room': FormationRoomPrices;
  'location-bureau': LocationBureauPrices;
}

const serviceData: Record<string, ServiceData> = {
  'reexpedition-courrier': {
    title: 'Réexpédition courrier (3 mois)',
    price: '30,00',
    description: 'Notre service de réexpédition de courrier sur 3 mois vous offre une solution pratique pour recevoir votre courrier où que vous soyez. Nous réexpédions votre courrier chaque mardi pendant un trimestre, assurant ainsi une gestion efficace de votre correspondance. Le coût de ce service est de 10 euros par mois, avec des frais supplémentaires pour les timbres utilisés lors de la réexpédition. Avec notre service, vous pouvez avoir l’assurance que votre courrier vous parviendra de manière fiable et sécurisée pendant toute la durée de votre absence.'
  },
  'scan-courrier': {
    title: 'Scan de courrier (3 mois)',
    price: '18,00',
    description: 'Notre service de scan de courrier sur 3 mois est conçu pour vous offrir une solution pratique et efficace pour la gestion de votre correspondance, même lorsque vous n’avez pas le temps de vous en occuper ou que vous ne souhaitez pas opter pour la réexpédition de courrier. Avec ce service, dès réception de votre courrier, notre équipe se charge de le scanner et de vous envoyer une copie numérique par voie électronique. Vous n’aurez plus à vous soucier de trier et de gérer votre courrier physiquement. Vous pouvez accéder à vos documents où que vous soyez, à tout moment, simplement en quelques clics. Le règlement de ce service se fait au trimestre, vous offrant ainsi une flexibilité maximale dans la gestion de vos paiements. Vous pouvez profiter de la tranquillité d’esprit en sachant que votre courrier est pris en charge de manière professionnelle et sécurisée.'
  },
  'reception-colis': {
    title: 'Réception colis (3 mois)',
    price: '18,00',
    description: 'Notre service de réception de colis pour une période de 3 mois est conçu pour répondre à vos besoins de réception de petits colis de manière pratique et sécurisée. Que vous soyez un particulier ou une entreprise, notre service vous permet de faire livrer vos petits colis à notre adresse pendant une période de 3 mois. Nous recevons vos colis en votre nom et les conservons en toute sécurité jusqu’à ce que vous veniez les récupérer. Ce service est idéal pour ceux qui ont besoin d’une adresse de livraison temporaire pour recevoir des colis pendant une courte période, que ce soit pour des raisons professionnelles ou personnelles. Profitez dès maintenant de notre service de réception de colis pour une durée de 3 mois et bénéficiez de la tranquillité d’esprit en sachant que vos colis sont entre de bonnes mains.'
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
    description: 'Profitez de notre offre spéciale de domiciliation pour une réservation d’un an et économisez sur vos frais pendant toute la durée de votre engagement! En réservant notre service de domiciliation pour une période d’un an, vous bénéficiez d’une réduction exceptionnelle : 50% de réduction sur les frais des 3 premiers mois. 5% de réduction sur les frais des 9 mois suivants. Cette offre exclusive vous permet d’économiser dès le début de votre engagement, avec une réduction significative sur les 3 premiers mois. En plus, vous continuez à bénéficier d’une réduction supplémentaire de 5% sur les frais pour les 9 mois restants, ce qui représente une économie sur toute l’année. Profitez dès maintenant de cette offre spéciale et donnez à votre entreprise une adresse prestigieuse tout en réalisant des économies sur vos frais de domiciliation.'
  },
  'domiciliation-3mois-entreprise': {
    title: 'Domiciliation 3 mois – Entreprise',
    price: '108,00',
    description: 'Notre service de domiciliation pour société est spécialement conçu pour répondre aux besoins des entreprises de différents types juridiques, y compris les SARL, SAS, EURL et SASU, leur offrant une adresse professionnelle prestigieuse pendant une période de 3 mois. Avec notre service, votre société bénéficie des avantages suivants pendant 3 mois : Une adresse commerciale de qualité pour votre société, vous permettant de présenter une image professionnelle à vos clients, partenaires et autorités. La réception et la gestion de votre courrier pendant la période de domiciliation, assurant que vous ne manquiez aucune communication importante pour votre entreprise. Que vous soyez une petite entreprise en démarrage ou une entreprise établie, notre service de domiciliation vous offre la flexibilité et la commodité nécessaires pour gérer efficacement vos opérations commerciales. Profitez dès maintenant de notre service de domiciliation pour société sur une période de 3 mois et donnez à votre entreprise une adresse professionnelle tout en bénéficiant d’une gestion pratique de votre courrier.'
  },
  'domiciliation-3mois-micro': {
    title: 'Domiciliation 3 mois – Micro Entreprise',
    price: '72,00',
    description: 'Notre service de domiciliation pour micro-entreprise pendant 3 mois est conçu pour répondre aux besoins spécifiques des entrepreneurs individuels et des petites entreprises qui recherchent une adresse professionnelle pour leur activité. Avec notre service, vous bénéficiez d’une adresse prestigieuse pour votre micro-entreprise pendant une période de 3 mois. Cette adresse peut être utilisée sur vos documents officiels, vos cartes de visite et votre correspondance professionnelle, vous permettant de présenter une image professionnelle à vos clients et partenaires. En plus de l’adresse commerciale, notre service comprend la réception et la gestion de votre courrier pendant la période de domiciliation. Nous recevons votre courrier en votre nom et pouvons vous le transférer selon vos instructions. Profitez dès maintenant de notre service de domiciliation pour micro-entreprise pendant 3 mois et donnez à votre activité une image professionnelle et crédible sans les coûts et les engagements à long terme.'
  },
  'domiciliation-6mois-entreprise': {
    title: 'Domiciliation 6 mois – Entreprise',
    price: '162,00',
    originalPrice: '216,00',
    isPromo: true,
    description: 'Profitez de notre offre exclusive de domiciliation d’entreprise avec une promotion spéciale sur les premiers 6 mois! Nous vous offrons une réduction exceptionnelle sur les frais de domiciliation jusqu’au 30 Septembre, vous permettant de bénéficier d’un avantage financier significatif tout en profitant de nos services de qualité. Avec cette promotion, vous bénéficierez d’une réduction de 50% sur les 3 premiers mois de domiciliation lorsque vous vous engagez pour une période de 6 mois. C’est une opportunité unique pour vous d’économiser sur les frais de domiciliation tout en bénéficiant d’une adresse professionnelle prestigieuse pour votre entreprise. Profitez dès maintenant de cette offre spéciale et donnez à votre entreprise une image professionnelle et crédible avec notre service de domiciliation de qualité supérieure.'
  },
  'domiciliation-6mois-micro': {
    title: 'Domiciliation 6 mois – Micro Entreprise',
    price: '108,00',
    originalPrice: '144,00',
    isPromo: true,
    description: 'Profitez de notre offre spéciale de domiciliation pour micro-entreprise sur une période de 6 mois, avec des avantages financiers exceptionnels pour vous aider à démarrer votre activité en toute tranquillité d’esprit. Avec notre service, vous bénéficiez de : 3 mois de domiciliation pour votre micro-entreprise, avec une adresse professionnelle prestigieuse pour vos activités commerciales. Les 3 mois suivants à moins 50%, vous permettant de bénéficier d’une réduction significative sur les frais de domiciliation. Cette offre exclusive vous offre non seulement une adresse commerciale professionnelle pour votre entreprise, mais vous permet également de réaliser des économies substantielles sur les frais de domiciliation pour les 6 premiers mois. Profitez dès maintenant de notre service de domiciliation pour micro-entreprise sur une période de 6 mois et donnez à votre entreprise une image professionnelle sans compromettre votre budget.'
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
    description: "Notre service d’accompagnement pour l’ouverture de votre société VTC est spécialement conçu pour simplifier le processus de création et de lancement de votre entreprise de transport avec chauffeur. En partenariat avec notre expert-comptable spécialisé dans le domaine, nous vous offrons une assistance professionnelle et personnalisée à chaque étape du processus, garantissant une démarche efficace et conforme à toutes les exigences réglementaires. Nous comprenons que le démarrage d’une entreprise VTC peut être complexe, avec de nombreuses démarches administratives et juridiques à suivre. C’est pourquoi notre équipe dédiée est là pour vous guider à travers toutes les étapes, depuis l’enregistrement de votre société jusqu’à l’obtention des licences et des permis nécessaires. Notre objectif est de vous offrir une assistance complète et de qualité, vous permettant de lancer votre entreprise avec confiance et succès. De plus, pour rendre nos services encore plus accessibles, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous. Cette réduction s’applique en plus des frais de service hors frais d’organisme, ce qui vous permet de bénéficier d’un accompagnement professionnel à un tarif avantageux."
  },
  'bank-account': {
    title: 'Accompagnement ouverture de compte bancaire en ligne',
    price: '150,00',
    description: "L’ouverture d’un compte bancaire peut souvent s’avérer complexe et chronophage, surtout lorsqu’il s’agit de répondre aux nombreuses exigences réglementaires. C’est là que notre service d’Accompagnement à l’Ouverture de Compte entre en jeu. Nous offrons un soutien complet pour vous aider à naviguer à travers le processus d’ouverture de compte, en rendant l’expérience aussi fluide et rapide que possible. Nos services incluent : Consultation Initiale : Une évaluation de vos besoins spécifiques pour déterminer le type de compte et l’institution financière la plus adaptée à votre situation. Préparation des Documents : Assistance dans la compilation et la vérification de tous les documents et informations nécessaires pour répondre aux critères d’éligibilité de la banque. Représentation : Si nécessaire, nous pouvons agir en votre nom pour communiquer avec les banques, vous permettant de vous concentrer sur votre activité principale. Suivi Post-Ouverture : Après l’ouverture de votre compte, nous restons à votre disposition pour toute question ou besoin supplémentaire. Que vous lanciez une startup, gériez une entreprise établie cherchant à optimiser ses opérations bancaires, ou soyez un particulier en quête d’une solution bancaire adaptée, notre service d’Accompagnement à l’Ouverture de Compte est la solution idéale pour vous garantir une transition bancaire sans stress et efficace."
  },
  'company-creation': {
    title: 'Accompagnement ouverture de votre société',
    price: '600,00',
    description: "Notre service d’accompagnement à l’ouverture de société est conçu pour vous fournir une assistance professionnelle et complète tout au long du processus de création de votre entreprise. En partenariat avec notre expert-comptable qualifié, nous vous guidons à travers les démarches administratives, fiscales et juridiques nécessaires pour établir votre société avec succès. Les caractéristiques de notre service comprennent : Consultation initiale : Nous commençons par une consultation approfondie pour comprendre vos besoins, vos objectifs et les spécificités de votre projet entrepreneurial. Conseils personnalisés : Sur la base de notre consultation, nous vous fournissons des conseils adaptés à votre situation, notamment sur le choix de la forme juridique la plus appropriée pour votre entreprise. Préparation des documents : Notre équipe vous assiste dans la préparation de tous les documents nécessaires à l’enregistrement de votre société, en veillant à ce que toutes les exigences légales soient respectées. Partenariat avec un expert-comptable : Nous travaillons en partenariat avec un expert-comptable qualifié qui vous apporte son expertise pour assurer la conformité fiscale et comptable de votre entreprise dès sa création. Réduction sur les frais de domiciliation : Nous vous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre société chez nous, ce qui vous permet de bénéficier d’un avantage financier supplémentaire. Notre objectif est de vous fournir le soutien nécessaire pour créer votre société en toute confiance et tranquillité d’esprit, en vous libérant des tracas administratifs et en vous permettant de vous concentrer sur le développement de votre activité."
  },
  'micro-company': {
    title: 'Accompagnement ouverture micro entreprise',
    price: '150,00',
    description: "Notre service d’accompagnement à l’ouverture de micro-entreprise offre une assistance professionnelle et complète pour vous guider à travers toutes les étapes nécessaires pour démarrer votre activité avec succès. Que vous envisagiez de vous lancer en tant qu’entrepreneur individuel, auto-entrepreneur ou dans le cadre d’une autre forme juridique adaptée aux micro-entreprises, notre équipe expérimentée est là pour vous aider à naviguer dans les complexités administratives, fiscales et juridiques du processus de création d’entreprise. Notre service comprend : Consultation initiale : Nous commençons par une consultation approfondie pour comprendre vos besoins spécifiques, vos objectifs commerciaux et les exigences de votre projet entrepreneurial. Conseils personnalisés : Sur la base de notre consultation initiale, nous vous fournissons des conseils personnalisés sur le choix de la forme juridique la mieux adaptée à votre activité, les démarches administratives à suivre et les obligations légales à respecter. Assistance à la constitution du dossier : Nous vous assistons dans la préparation de tous les documents nécessaires à l’immatriculation de votre micro-entreprise, y compris les formulaires administratifs, les statuts, et autres documents juridiques requis. Suivi et support continu : Notre équipe reste à vos côtés tout au long du processus, vous guidant à chaque étape et répondant à toutes vos questions pour garantir que votre ouverture de micro-entreprise se déroule sans accroc. Avec notre service d’accompagnement à l’ouverture de micro-entreprise, vous pouvez démarrer votre activité en toute confiance, sachant que vous bénéficiez d’un soutien professionnel et personnalisé à chaque étape du processus."
  },
  'company-transfer': {
    title: 'Accompagnement transfert de société',
    price: '600,00',
    note: '*hors coûts organismes',
    description: "Notre service d’accompagnement pour le transfert de votre société est conçu pour simplifier et faciliter le processus de transfert de propriété ou de siège social de votre entreprise. En partenariat avec notre expert-comptable expérimenté, nous offrons une assistance professionnelle et personnalisée à chaque étape du processus, garantissant une transition fluide et conforme à toutes les exigences légales. Nous comprenons que le transfert de société peut être un processus complexe, impliquant des aspects juridiques, fiscaux et administratifs délicats à gérer. C’est pourquoi notre équipe dédiée est là pour vous guider à travers toutes les étapes, depuis la préparation de la documentation nécessaire jusqu’à la finalisation du transfert auprès des autorités compétentes. Notre objectif est de vous offrir une assistance complète et de qualité, vous permettant de mener à bien votre transfert d’entreprise en toute confiance. De plus, pour rendre nos services encore plus accessibles, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous. Cette réduction s’applique en plus des frais de service hors frais d’organisme, ce qui vous permet de bénéficier d’un accompagnement professionnel à un tarif avantageux."
  },
  'share-transfer': {
    title: 'Cession de parts',
    price: '200,00',
    description: "Notre service de cession de parts est conçu pour faciliter le processus de transfert de propriété dans les sociétés, en offrant une assistance professionnelle et complète à tous les acteurs impliqués. Que vous soyez un associé désireux de vendre vos parts, un investisseur cherchant à acquérir une participation dans une entreprise existante, ou une société cherchant à gérer efficacement les transitions de propriété, notre équipe expérimentée est là pour vous accompagner à chaque étape du processus. Nous offrons une gamme complète de services, comprenant la consultation sur les aspects juridiques et fiscaux de la cession, la négociation et la rédaction d’accords de cession personnalisés, ainsi que l’assistance dans l’obtention des approbations nécessaires des autres associés ou actionnaires. Notre objectif est de simplifier et d’accélérer le processus de cession de parts, tout en veillant à ce que les intérêts de toutes les parties concernées soient pris en compte. Que vous soyez un particulier, un investisseur institutionnel ou une entreprise, notre service de cession de parts peut vous aider à atteindre vos objectifs de manière efficace et professionnelle."
  },
  'commercial-ad': {
    title: "Création annonce commerciale pour site d'annonces",
    price: '15,00',
    description: "Notre service de création d’annonces commerciales pour sites d’annonces offre une solution complète pour vous aider à maximiser la visibilité et l’efficacité de vos annonces en ligne. Que vous souhaitiez promouvoir un produit, un service ou une offre spéciale, notre équipe expérimentée est là pour vous aider à créer des annonces attrayantes et convaincantes qui captivent l’attention de votre public cible. Nous pensons soigneusement chaque annonce pour qu’elle soit vendeuse et optimisée avec les bons mots-clés, ce qui augmente vos chances d’apparaître en haut des résultats de recherche et de générer plus de trafic vers votre annonce. Notre processus de création d’annonces commence par une analyse approfondie de votre produit ou service, ainsi que de votre public cible et de la plateforme sur laquelle vous souhaitez diffuser votre annonce. Ensuite, nous travaillons à créer un contenu persuasif, accrocheur et pertinent, en utilisant des techniques de copywriting éprouvées pour inciter les utilisateurs à cliquer et à en savoir plus. Que vous utilisiez des sites d’annonces classifiées, des plateformes de commerce électronique ou d’autres types de sites d’annonces en ligne, notre service vous permet de vous démarquer de la concurrence et d’attirer l’attention de clients potentiels."
  },
  'quote-creation': {
    title: 'Création devis ou service',
    price: '15,00',
    description: "Notre service de création de devis et services offre une solution professionnelle pour la conception et la présentation de vos devis et documents de services. Avec votre logo fourni, nous travaillons en étroite collaboration avec vous pour créer des devis personnalisés qui mettent en valeur les avantages de vos produits ou services. Nous nous assurons que chaque devis est clair, complet et professionnel, vous permettant de présenter votre entreprise de manière convaincante à vos clients."
  },
  'annual-accounts': {
    title: 'Dépôt des comptes annuels',
    price: '300,00',
    note: '*hors coûts organismes',
    description: "Le service de dépôt des comptes annuels de notre société offre une assistance complète pour aider les entreprises à respecter leurs obligations légales en matière de transparence financière et de conformité réglementaire. De la préparation des états financiers annuels à la soumission auprès des autorités compétentes, en passant par la gestion de toute correspondance avec les organismes de régulation, notre équipe dévouée est là pour simplifier et faciliter ce processus complexe. Notre objectif est de garantir que le dépôt des comptes annuels se déroule de manière fluide et sans accroc, offrant aux entreprises la tranquillité d’esprit nécessaire pour se concentrer sur leurs activités principales."
  },
  'company-modification': {
    title: 'Modification société',
    price: '900,00',
    note: '*hors coûts organismes',
    description: "Notre service d’accompagnement pour les modifications de société offre une assistance professionnelle et complète pour faciliter les changements au sein de votre entreprise. En partenariat avec notre expert-comptable, nous vous guidons à travers chaque étape du processus, depuis la préparation de la documentation jusqu’à la soumission auprès des autorités compétentes. Notre objectif est de vous offrir une assistance personnalisée et professionnelle, garantissant une transition fluide et conforme à toutes les exigences légales. De plus, nous proposons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous, rendant nos services encore plus accessibles et avantageux."
  }
};

// const reservationPrices: ReservationPrices = {
//   'coworking-space': { hour: 5 },
//   'formation-room': { hour: 10, halfDay: 25, fullDay: 45 },
//   'location-bureau': { halfDay: 125, fullDay: 250 },
// };

// // --- Simuler les réservations existantes (date -> heures prises)
// const reservations = {
//   '2025-05-01': ['09:00', '10:00'],
//   '2025-05-02': ['13:00', '14:00'],
// };

// const hoursAvailable = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

// const ServiceDetail = () => {
//   const { addItem } = useCart();
//   const { id } = useParams();
//   const { toast } = useToast();

//   const service = useMemo(() => {
//     if (!id || !serviceData[id]) return serviceData['coworking-space'];
//     return serviceData[id];
//   }, [id]);

//   const [modeReservation, setModeReservation] = useState<string>('hour');
//   const [dateReservation, setDateReservation] = useState<string>('');
//   const [selectedHours, setSelectedHours] = useState<string[]>([]);
//   const [halfDayPeriod, setHalfDayPeriod] = useState<string>('morning');
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState("description");
//   const [refreshReviews, setRefreshReviews] = useState(false);
//   const [loadingReviews, setLoadingReviews] = useState(true);


//   const toggleHour = (hour: string) => {
//     if (selectedHours.includes(hour)) {
//       setSelectedHours(selectedHours.filter(h => h !== hour));
//     } else {
//       setSelectedHours([...selectedHours, hour]);
//     }
//   };

//   const isHourReserved = (date: string, hour: string) => {
//     return reservations[date]?.includes(hour);
//   };

//   const calculPrix = () => {
//     if (!id) return parseFloat(service.price.replace(',', '.'));

//     // Check if the id is one of our reservation types
//     if (id === 'coworking-space' || id === 'formation-room' || id === 'location-bureau') {
//       // Handle coworking space hourly pricing
//       if (id === 'coworking-space') {
//         return (selectedHours.length || 1) * reservationPrices[id].hour;
//       }
      
//       // Handle formation room pricing
//       if (id === 'formation-room') {
//         if (modeReservation === 'hour') {
//           return (selectedHours.length || 1) * reservationPrices[id].hour;
//         }
//         if (modeReservation === 'halfDay') {
//           return reservationPrices[id].halfDay;
//         }
//         if (modeReservation === 'fullDay') {
//           return reservationPrices[id].fullDay;
//         }
//       }
      
//       // Handle location bureau pricing
//       if (id === 'location-bureau') {
//         if (modeReservation === 'halfDay') {
//           return reservationPrices[id].halfDay;
//         }
//         if (modeReservation === 'fullDay') {
//           return reservationPrices[id].fullDay;
//         }
//       }
//     }
    
//     return parseFloat(service.price.replace(',', '.'));
//   };

//   // Fetch reviews for this service
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         if (id) {
//           const { data, error } = await supabase
//             .from('reviews')
//             .select('*')
//             .eq('product_id', id)
//             .order('created_at', { ascending: false });

//           if (error) throw error;
//           setReviews(data || []);
//         }
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, [id, refreshReviews]);

//   const handleReviewSubmitted = () => {
//     setRefreshReviews(prev => !prev);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 py-16">
//         <div className="container mx-auto px-4">
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <h1 className="text-3xl font-bold mb-6 text-center">{service.title}</h1>
            
//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Left column: Service information */}
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-3xl font-semibold text-lysco-turquoise">{calculPrix().toFixed(2)} €</div>
//                     {service.priceUnit && (
//                       <span className="text-gray-500">{service.priceUnit}</span>
//                     )}
//                     <p className="text-sm text-gray-500">Hors taxes</p>
//                     {service.originalPrice && (
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="text-lg text-gray-400 line-through">{service.originalPrice} €</span>
//                         {service.isPromo && (
//                           <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">Promo</span>
//                         )}
//                       </div>
//                     )}
//                   </div>
                  
//                   {id && (id === 'coworking-space' || id === 'formation-room' || id === 'location-bureau') && (
//                     <div className="flex flex-col items-end">
//                       <div className="flex items-center text-gray-600 mb-1">
//                         <Clock className="h-4 w-4 mr-1" />
//                         <span className="text-sm">Réservation flexible</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <Calendar className="h-4 w-4 mr-1" />
//                         <span className="text-sm">Disponible maintenant</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Reservation form */}
//                 {id && (id === 'coworking-space' || id === 'formation-room' || id === 'location-bureau') && (
//                   <div className="mt-8 space-y-4 p-5 border border-gray-200 rounded-lg">
//                     <h3 className="font-semibold text-lg">Réserver</h3>
                    
//                     {/* Type de réservation */}
//                     {id !== 'coworking-space' && (
//                       <div className="space-y-2">
//                         <label className="font-medium text-gray-700">Type de réservation</label>
//                         <select
//                           value={modeReservation}
//                           onChange={(e) => setModeReservation(e.target.value)}
//                           className="w-full p-2 border rounded focus:ring-2 focus:ring-lysco-turquoise focus:border-transparent"
//                         >
//                           <option value="">Sélectionner une option</option>
//                           {id === 'formation-room' && (
//                             <option value="hour">À l'heure</option>
//                           )}
//                           {(id === 'formation-room' || id === 'location-bureau') && (
//                             <option value="halfDay">Demi-journée</option>
//                           )}
//                           {(id === 'formation-room' || id === 'location-bureau') && (
//                             <option value="fullDay">Journée complète</option>
//                           )}
//                         </select>
//                       </div>
//                     )}
                    
//                     {/* Matin / Après-midi */}
//                     {modeReservation === 'halfDay' && (id === 'location-bureau' || id === 'formation-room') && (
//                       <div className="space-y-2">
//                         <label className="font-medium text-gray-700">Matin ou Après-midi</label>
//                         <select
//                           value={halfDayPeriod}
//                           onChange={(e) => setHalfDayPeriod(e.target.value)}
//                           className="w-full p-2 border rounded focus:ring-2 focus:ring-lysco-turquoise focus:border-transparent"
//                         >
//                           <option value="">Sélectionner</option>
//                           <option value="morning">Matin (9h-12h)</option>
//                           <option value="afternoon">Après-midi (13h-16h)</option>
//                         </select>
//                       </div>
//                     )}
                    
//                     {/* Date */}
//                     <div className="space-y-2">
//                       <label className="font-medium text-gray-700">Choisir une date</label>
//                       <input
//                         type="date"
//                         value={dateReservation}
//                         onChange={(e) => {
//                           setDateReservation(e.target.value);
//                           setSelectedHours([]);
//                         }}
//                         min={new Date().toISOString().split('T')[0]}
//                         className="w-full p-2 border rounded focus:ring-2 focus:ring-lysco-turquoise focus:border-transparent"
//                       />
//                     </div>

//                     {/* Choix des heures */}
//                     {(id === 'coworking-space' || (id === 'formation-room' && modeReservation === 'hour')) && dateReservation && (
//                       <div>
//                         <p className="font-medium text-gray-700 mb-2">Choisir des heures :</p>
//                         <div className="grid grid-cols-4 gap-2">
//                           {hoursAvailable.map((hour) => (
//                             <button
//                               key={hour}
//                               disabled={isHourReserved(dateReservation, hour)}
//                               onClick={() => toggleHour(hour)}
//                               className={`p-2 border rounded text-sm transition-colors ${
//                                 isHourReserved(dateReservation, hour)
//                                   ? 'bg-red-100 text-red-400 cursor-not-allowed'
//                                   : selectedHours.includes(hour)
//                                   ? 'bg-green-100 text-green-700 border-green-300'
//                                   : 'bg-gray-50 hover:bg-gray-100'
//                               }`}
//                             >
//                               {hour}
//                             </button>
//                           ))}
//                         </div>
//                         <p className="text-xs text-gray-400 mt-2">* Les heures en rouge sont déjà réservées.</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
                
//                 <Button
//                   className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90"
//                   disabled={
//                     (id === 'coworking-space' && (!dateReservation || selectedHours.length === 0)) ||
//                     (id === 'formation-room' && (
//                       !modeReservation ||
//                       !dateReservation ||
//                       (modeReservation === 'hour' && selectedHours.length === 0) ||
//                       (modeReservation === 'halfDay' && !halfDayPeriod)
//                     )) ||
//                     (id === 'location-bureau' && (
//                       !modeReservation ||
//                       !dateReservation ||
//                       (modeReservation === 'halfDay' && !halfDayPeriod)
//                     ))
//                   }
//                   onClick={() => {
//                     addItem({
//                       id: `service-${id}`,
//                       title: `${service.title} - ${modeReservation}${halfDayPeriod ? ` (${halfDayPeriod})` : ''} - ${dateReservation} ${selectedHours.join(', ')}`,
//                       price: calculPrix(),
//                       quantity: 1,
//                     });
//                     toast({
//                       title: "Article ajouté au panier",
//                       description: `${service.title} a été ajouté à votre panier.`,
//                       variant: "default",
//                     });
//                   }}
//                 >
//                   <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter au panier
//                 </Button>
                
//                 <div className="pt-4 border-t">
//                   <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
//                     <Lock className="h-4 w-4" />
//                     <span>PAIEMENT SÉCURISÉ GARANTI</span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Right column: Tabs for Description and Reviews */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <Tabs defaultValue="description" onValueChange={setActiveTab} className="w-full">
//                   {/* <TabsList className="grid w-full grid-cols-2 mb-4">
//                     <TabsTrigger value="description">Description</TabsTrigger>
//                     {/* <TabsTrigger value="reviews">Avis ({reviews.length})</TabsTrigger> 
//                   </TabsList> */}
                  
//                   <TabsContent value="description" className="focus-visible:outline-none focus-visible:ring-0">
//                     <h2 className="text-xl font-semibold mb-4">Description</h2>
//                     <div className="prose max-w-none">
//                       <p className="whitespace-pre-line">{service.description}</p>
                      
//                       {service.note && (
//                         <p className="mt-4 italic text-gray-600">{service.note}</p>
//                       )}
//                     </div>
//                   </TabsContent>
                  
//                   <TabsContent value="reviews" className="focus-visible:outline-none focus-visible:ring-0 space-y-6">
//                     {id && (
//                       <>
//                         <ReviewsList reviews={reviews} isLoading={loadingReviews} />
//                         <ReviewForm 
//                           productId={id} 
//                           productName={service.title}
//                           onReviewSubmitted={handleReviewSubmitted}
//                         />
//                       </>
//                     )}
//                   </TabsContent>
//                 </Tabs>
//               </div>
//             </div>
//           </div>
          
//           <ProductDescription />
//           <RelatedProducts />
//         </div>
//       </main>
//       <Footer />
//       <Toaster />
//     </div>
//   );
// };
import { PostgrestResponse } from '@supabase/supabase-js'

// export default ServiceDetail;
interface ReservationRecord {
  reservation_type: 'hour' | 'morning' | 'afternoon' | 'full_day'
  start_time: string | null
  end_time: string | null
}

// Heures proposées à l’appli
const HOURS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

const ServiceDetail = () => {
  const { addItem } = useCart()
  const { id } = useParams()
  const { toast } = useToast()

  // --- États de réservation ---
  const [modeReservation, setModeReservation] = useState<'hour'|'halfDay'|'fullDay'>('hour')
  const [dateReservation, setDateReservation] = useState<string>('')
  const [halfDayPeriod, setHalfDayPeriod] = useState<'morning'|'afternoon'>('morning')
  const [selectedHours, setSelectedHours] = useState<string[]>([])

  // Réservations chargées depuis Supabase pour (espace, date)
  const [reservations, setReservations] = useState<ReservationRecord[]>([])
  const [loadingResa, setLoadingResa] = useState(false)

  // Quand on change de date, on recharge les réservations
useEffect(() => {
  if (!id || !dateReservation) {
    setReservations([])
    return
  }
  setLoadingResa(true)

  supabase
    .from('reservations')
    .select<ReservationRecord>('reservation_type, start_time, end_time')
    .eq('space_id', id)
    .eq('reservation_date', dateReservation)
    .then((response: PostgrestResponse<ReservationRecord>) => {
      if (response.error) {
        console.error(response.error)
        setReservations([])
      } else {
        setReservations(response.data || [])
      }
    })
    .finally(() => setLoadingResa(false))
}, [id, dateReservation])
  // Helpers pour savoir ce qui est déjà pris
  const fullDayBooked = reservations.some(r => r.reservation_type === 'full_day')
  const morningBooked = reservations.some(r => r.reservation_type === 'morning' || r.reservation_type === 'full_day')
  const afternoonBooked = reservations.some(r => r.reservation_type === 'afternoon' || r.reservation_type === 'full_day')
  const hoursBooked = useMemo(() => {
    return reservations
      .filter(r => r.reservation_type === 'hour' && r.start_time && r.end_time)
      .flatMap(r => {
        // assume exact hours slots
        const start = r.start_time!.slice(0,5)
        const end   = r.end_time!.slice(0,5)
        // include all slots between start (inclusive) and end (exclusive)
        const idxStart = HOURS.indexOf(start)
        const idxEnd   = HOURS.indexOf(end)
        return HOURS.slice(idxStart, idxEnd)
      })
  }, [reservations])

  // Vérifie si une heure est indisponible
  const isHourReserved = (hour: string) => fullDayBooked || hoursBooked.includes(hour)

  // Calcul du prix (idem qu'avant)
  const calculPrix = () => {
    // … ta logique existante …
    return 0 // placeholder
  }

  // UI disabled states
  const disableHourMode = fullDayBooked
  const disableHalfDay  = fullDayBooked
  const disableFullDay  = fullDayBooked

  // …

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {/* … titre & prix … */}

            {/* Formulaire de réservation */}
            <div className="mt-8 space-y-4 p-5 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-lg">Réserver</h3>

              {/* Type de réservation */}
              <div className="space-y-2">
                <label className="font-medium">Type</label>
                <select
                  value={modeReservation}
                  onChange={e => setModeReservation(e.target.value as any)}
                  disabled={fullDayBooked}
                  className="w-full p-2 border rounded"
                >
                  <option value="hour">À l'heure</option>
                  <option value="halfDay">Demi-journée</option>
                  <option value="fullDay">Journée complète</option>
                </select>
                {fullDayBooked && <p className="text-xs text-red-500">La journée est déjà réservée.</p>}
              </div>

              {/* Matin / Après-midi */}
              {modeReservation === 'halfDay' && (
                <div className="space-y-2">
                  <label className="font-medium">Matin ou Après-midi</label>
                  <select
                    value={halfDayPeriod}
                    onChange={e => setHalfDayPeriod(e.target.value as any)}
                    disabled={modeReservation!=='halfDay' || (halfDayPeriod==='morning' ? morningBooked : afternoonBooked)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="morning">Matin (9h-12h)</option>
                    <option value="afternoon">Après-midi (13h-16h)</option>
                  </select>
                  {halfDayPeriod==='morning' && morningBooked && (
                    <p className="text-xs text-red-500">Matin déjà réservé</p>
                  )}
                  {halfDayPeriod==='afternoon' && afternoonBooked && (
                    <p className="text-xs text-red-500">Après-midi déjà réservé</p>
                  )}
                </div>
              )}

              {/* Date */}
              <div className="space-y-2">
                <label className="font-medium">Date</label>
                <input
                  type="date"
                  value={dateReservation}
                  onChange={e => {
                    setDateReservation(e.target.value)
                    setSelectedHours([])
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Choix des heures */}
              {modeReservation === 'hour' && dateReservation && (
                <div>
                  <p className="font-medium mb-2">Heures disponibles :</p>
                  <div className="grid grid-cols-4 gap-2">
                    {HOURS.map(hour => (
                      <button
                        key={hour}
                        disabled={isHourReserved(hour)}
                        onClick={() => {
                          if (selectedHours.includes(hour)) {
                            setSelectedHours(s => s.filter(h => h !== hour))
                          } else {
                            setSelectedHours(s => [...s, hour])
                          }
                        }}
                        className={`p-2 border rounded text-sm ${
                          isHourReserved(hour)
                            ? 'bg-red-100 text-red-400 cursor-not-allowed'
                            : selectedHours.includes(hour)
                            ? 'bg-green-100 text-green-800'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {hour}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    * Heures en rouge déjà réservées.
                  </p>
                </div>
              )}

              {/* Bouton Ajouter */}
              <Button
                className="w-full bg-lysco-turquoise"
                disabled={
                  !dateReservation ||
                  (modeReservation==='hour'    && selectedHours.length===0) ||
                  (modeReservation==='halfDay' && (halfDayPeriod!=='morning' && halfDayPeriod!=='afternoon')) 
                }
                onClick={() => {
                  // compose le titre dynamique
                  const label = `${id} – ${modeReservation}${modeReservation==='halfDay' ? ` (${halfDayPeriod})` : ''} – ${dateReservation} ${selectedHours.join(', ')}`
                  addItem({ id:`${id}-${dateReservation}`, title:label, price:calculPrix(), quantity:1 })
                  toast({ title:'Ajouté au panier', description:label })
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter
              </Button>
            </div>

            {/* … barre PAIEMENT SÉCURISÉ … */}
          </div>

          {/* … Tabs Description & Avis … */}
          <ProductDescription />
          <RelatedProducts />
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default ServiceDetail