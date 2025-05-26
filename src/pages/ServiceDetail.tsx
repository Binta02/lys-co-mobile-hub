
import React, { useMemo, useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Lock, Calendar, Clock } from 'lucide-react'
import RelatedProducts from '@/components/services/RelatedProducts'
import ProductDescription from '@/components/services/ProductDescription'
import { useCart } from '@/components/cart/CartContext'
import { useParams } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import ReviewForm from '@/components/services/ReviewForm'
import ReviewsList from '@/components/services/ReviewsList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/integrations/supabase/client'
import { ServiceData, ReservationPrices } from '@/types/database'


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
const reservationPrices: ReservationPrices = {
  'coworking-space': { hour: 5 },
  'formation-room': { hour: 10, halfDay: 25, fullDay: 45 },
  'location-bureau': { halfDay: 125, fullDay: 250 },
}

const HOURS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']

const ServiceDetail: React.FC = () => {
  const { addItem } = useCart()
  const { id } = useParams<{id:string}>()
  const { toast } = useToast()

  const service = useMemo(() => {
    return id ? serviceData[id] : serviceData['coworking-space']
  }, [id])

  const [modeReservation, setModeReservation] = useState<'hour'|'halfDay'|'fullDay'>('hour')
  const [dateReservation, setDateReservation] = useState('')
  const [selectedHours, setSelectedHours] = useState<string[]>([])
  const [halfDayPeriod, setHalfDayPeriod] = useState<'morning'|'afternoon'>('morning')
  const [reservedPeriods, setReservedPeriods] = useState<string[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [refreshReviews, setRefreshReviews] = useState(false)
  const [activeTab, setActiveTab] = useState<'description'|'reviews'>('description')

// ...existing code...
const getReservationType = (id) => {
  if (id === 'coworking-space') return 'coworking';
  if (id === 'formation-room') return 'formation';
  if (id === 'location-bureau') return 'bureau';
  return id;
};

// Fonction pour vérifier si une plage est réservée
const isRangeReserved = (range: string): boolean => {
  const result = reservedPeriods.some(reservedRange => {
    console.log('[isRangeReserved] Test:', { reservedRange, range });
    // Convertir les plages en dates pour comparaison
    const extractDates = (rangeStr: string) => {
  // Pour [2025-05-28 09:00:00+00,2025-05-28 16:00:00+00)
  const match = rangeStr.match(/\[(.+?),(.+?)\)/);
  return match ? [new Date(match[1].trim()), new Date(match[2].trim())] : [null, null];
};

    const [reservedStart, reservedEnd] = extractDates(reservedRange);
    const [checkStart, checkEnd] = extractDates(range);

    if (!reservedStart || !reservedEnd || !checkStart || !checkEnd) return false;

    // Vérifier si les plages se chevauchent
    return (
      (checkStart >= reservedStart && checkStart < reservedEnd) ||
      (checkEnd > reservedStart && checkEnd <= reservedEnd) ||
      (checkStart <= reservedStart && checkEnd >= reservedEnd)
    );
  });
    console.log('[isRangeReserved] Résultat pour', range, ':', result);
  return result;
};

// Fonctions pour générer les plages de temps
const getHalfDayRange = (period: 'morning' | 'afternoon'): string => {
  if (!dateReservation) return '';
  const range = period === 'morning'
    ? `[${dateReservation} 09:00:00+00,${dateReservation} 12:00:00+00)`
    : `[${dateReservation} 13:00:00+00,${dateReservation} 16:00:00+00)`;
  console.log('[getHalfDayRange]', period, ':', range);
  return range;

};

const getFullDayRange = (): string => {
  if (!dateReservation) return '';
  const range = `[${dateReservation} 09:00:00+00,${dateReservation} 16:00:00+00)`;
  console.log('[getFullDayRange] :', range);
  return range;

};

// Vérifications des réservations existantes
const isMorningReserved = isRangeReserved(getHalfDayRange('morning'));
console.log('[isMorningReserved]', isMorningReserved);
const isAfternoonReserved = isRangeReserved(getHalfDayRange('afternoon'));
console.log('[isAfternoonReserved]', isAfternoonReserved);
const isFullDayReserved = isRangeReserved(getFullDayRange());
console.log('[isFullDayReserved]', isFullDayReserved);

useEffect(() => {
  const fetchReservedPeriods = async () => {
    console.log('Début récupération des plages réservées');
    if (!dateReservation || !id) {
      console.log('Aucune date ou ID fourni, annulation de la requête');
      return;
    }

    const reservationType = getReservationType(id);

    console.log('Requête Supabase avec:', { reservation_type: reservationType, reservation_date: dateReservation });

    const { data, error } = await supabase
      .from('reservations')
      .select('period')
      .like('reservation_type', `${reservationType}%`)
      .eq('reservation_date', dateReservation);

    if (error) {
      console.error('Erreur récupération des réservations :', error);
      setReservedPeriods([]);
    } else {
      // Uniformisation du format des périodes récupérées
      const periods = data.map((r: any) => {
        if (typeof r.period === 'string' && r.period.startsWith('["')) {
          const match = r.period.match(/\["(.+?)","(.+?)"\)/);
          if (match) {
            const formatted = `[${match[1]},${match[2]})`;
            console.log('[fetchReservedPeriods] Formaté:', formatted);
            return formatted;
          }
        }
        console.log('[fetchReservedPeriods] Déjà formaté:', r.period);
        return r.period;
      });
      console.log('Plages extraites :', periods);
      setReservedPeriods(periods);
    }
  };

  fetchReservedPeriods();
}, [dateReservation, id]);
// useEffect(() => {
//   const fetchReservedPeriods = async () => {
//     console.log('Début récupération des plages réservées')
//     if (!dateReservation || !id) {
//       console.log('Aucune date ou ID fourni, annulation de la requête')
//       return
//     }

//     const reservationType = getReservationType(id)

//     console.log('Requête Supabase avec:', { reservation_type: reservationType, reservation_date: dateReservation })

//     const { data, error } = await supabase
//       .from('reservations')
//       .select('period')
//       .like('reservation_type', `${reservationType}%`)
//       .eq('reservation_date', dateReservation)

//     if (error) {
//       console.error('Erreur récupération des réservations :', error)
//       setReservedPeriods([])
//     } else {
//       // Uniformisation du format des périodes récupérées
//       const periods = data.map((r: any) => {
//         // Si period est au format JSON PostgreSQL : '["2025-05-28 09:00:00+00","2025-05-28 10:00:00+00")'
//         if (typeof r.period === 'string' && r.period.startsWith('["')) {
//           const match = r.period.match(/\["(.+?)","(.+?)"\)/)
//           if (match) {
//             // On remet au format utilisé dans le code : [start,end)
//             return `[${match[1]},${match[2]})`
//           }
//         }
//         // Sinon, on suppose que c'est déjà au bon format
//         return r.period
//       })
//       console.log('Plages extraites :', periods)
//       setReservedPeriods(periods)
//     }
//   }
 
//   fetchReservedPeriods()
// }, [dateReservation, id])

// const isHourDisabled = (hour: string): boolean => {
//   // Génère la période au format de la base : [YYYY-MM-DD HH:MM:SS+00,YYYY-MM-DD HH:MM:SS+00)
//   const start = `${dateReservation} ${hour}:00+00`
//   const endHour = String(Number(hour.split(':')[0]) + 1).padStart(2, '0')
//   const end = `${dateReservation} ${endHour}:00:00+00`
//   const rangeToCheck = `[${start},${end})`

//   // Vérification stricte de l'inclusion
//   const match = reservedPeriods.includes(rangeToCheck)
//   // console.log('Vérification de la plage :', rangeToCheck, '=>', match)
//   return match
// }
// Fonction pour vérifier si une heure est réservée
// Pour la désactivation des heures
const isHourDisabled = (hour: string): boolean => {
  if (!dateReservation) return false;
  const start = `${dateReservation} ${hour}:00+00`;
  const endHour = String(Number(hour.split(':')[0]) + 1).padStart(2, '0');
  const end = `${dateReservation} ${endHour}:00:00+00`;
  const rangeToCheck = `[${start},${end})`;
  const disabled = isRangeReserved(rangeToCheck);
  console.log('[isHourDisabled]', hour, rangeToCheck, '=>', disabled);
  return disabled;
};


// Logique pour désactiver les options selon les règles
const isFullDayOptionDisabled = isFullDayReserved;
const isHalfDayOptionDisabled = (period: 'morning' | 'afternoon') => {
  const disabled = isFullDayReserved || (period === 'morning' ? isMorningReserved : isAfternoonReserved);
  console.log('[isHalfDayOptionDisabled]', period, ':', disabled);
  return disabled;
};

// Pour la désactivation de la journée complète
console.log('[isFullDayOptionDisabled]', isFullDayReserved);

  const calculPrix = () => {
    const base = parseFloat(service.price.replace(',', '.'))
    if (id === 'coworking-space') {
      return (selectedHours.length || 1) * reservationPrices[id].hour
    }
    if (id === 'formation-room') {
      if (modeReservation === 'hour') return (selectedHours.length || 1) * reservationPrices[id].hour
      if (modeReservation === 'halfDay') return reservationPrices[id].halfDay
      if (modeReservation === 'fullDay') return reservationPrices[id].fullDay
    }
    if (id === 'location-bureau') {
      if (modeReservation === 'halfDay') return reservationPrices[id].halfDay
      if (modeReservation === 'fullDay') return reservationPrices[id].fullDay
    }
    return base
  }

  const toggleHour = (hour: string) => {
    setSelectedHours(s =>
      s.includes(hour) ? s.filter(h => h !== hour) : [...s, hour]
    )
  }

  const getRange = (start: string, end: string) => `[${start},${end})`

  const isRangeOverlapping = (range: string): boolean => {
    return reservedPeriods.some(existing => existing === range)
  }

  const generateRange = (): string => {
    if (!dateReservation) return ''
    if (modeReservation === 'hour') {
      if (!selectedHours.length) return ''
      const start = `${dateReservation}T${selectedHours[0]}:00+00:00`
      const endHour = Number(selectedHours[0].split(':')[0]) + 1
      const end = `${dateReservation}T${String(endHour).padStart(2, '0')}:00+00:00`
      return getRange(start, end)
    }
    if (modeReservation === 'halfDay') {
      const start = `${dateReservation}T${halfDayPeriod === 'morning' ? '09:00:00' : '13:00:00'}+00:00`
      const end = `${dateReservation}T${halfDayPeriod === 'morning' ? '12:00:00' : '16:00:00'}+00:00`
      return getRange(start, end)
    }
    if (modeReservation === 'fullDay') {
      return getRange(`${dateReservation}T09:00:00+00:00`, `${dateReservation}T16:00:00+00:00`)
    }
    return ''
  }

  const currentRange = generateRange()
  const isReserved = currentRange && isRangeOverlapping(currentRange)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold mb-6 text-center">{service.title}</h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-semibold text-lysco-turquoise">{calculPrix().toFixed(2)} €</div>
                    {service.priceUnit && <span className="text-gray-500">{service.priceUnit}</span>}
                    <p className="text-sm text-gray-500">Hors taxes</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4 p-5 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-lg">Réserver</h3>
                  <div className="space-y-2">
                    <label className="font-medium">Type</label>
                    <select 
                      value={modeReservation} 
                      onChange={e => setModeReservation(e.target.value as any)} 
                      className="w-full p-2 border rounded"
                    >
                      <option value="hour">À l'heure</option>
                      <option 
                        value="halfDay" 
                        disabled={isFullDayReserved} // Désactiver si journée complète réservée
                      >
                        Demi-journée {isFullDayReserved && '(indisponible)'}
                      </option>
                      <option 
                        value="fullDay" 
                        disabled={isFullDayReserved}
                      >
                        Journée complète {isFullDayReserved && '(réservée)'}
                      </option>
                    </select>
                  </div>

                  {isRangeReserved(getFullDayRange()) && dateReservation && (
                    <div className="mt-4 text-red-600 font-medium text-center">
                      La journée entière est déjà réservée à cette date.
                    </div>
                  )}
                  {/* Pour la sélection de demi-journée */}
                  {modeReservation === 'halfDay' && (
                    <div className="space-y-2">
                      <label className="font-medium">Matin ou Après-midi</label>
                      <select
                        value={halfDayPeriod}
                        onChange={e => setHalfDayPeriod(e.target.value as any)}
                        className="w-full p-2 border rounded"
                      >
                        <option 
                          value="morning" 
                          disabled={isHalfDayOptionDisabled('morning')}
                        >
                          Matin (9h-12h) {isHalfDayOptionDisabled('morning') && '(indisponible)'}
                        </option>
                        <option 
                          value="afternoon" 
                          disabled={isHalfDayOptionDisabled('afternoon')}
                        >
                          Après-midi (13h-16h) {isHalfDayOptionDisabled('afternoon') && '(indisponible)'}
                        </option>
                      </select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="font-medium">Date</label>
                    <input
                      type="date"
                      value={dateReservation}
                      onChange={e => {
                        setDateReservation(e.target.value)
                        setSelectedHours([]) // <-- Ajoute ceci pour vider la sélection
                      }}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {modeReservation === 'hour' && dateReservation && (
                    <div>
                      <p className="font-medium mb-2">Heures disponibles :</p>
                      <div className="grid grid-cols-4 gap-2">
                        {HOURS.map(hour => {
                          const isDisabled = isHourDisabled(hour)
                          return (
                            <button
                              key={hour}
                              disabled={isDisabled}
                              onClick={() => toggleHour(hour)}
                              className={`p-2 border rounded text-sm ${selectedHours.includes(hour) ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
                            >
                              {hour}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Pour le bouton d'ajout au panier */}
<Button
  className="w-full bg-lysco-turquoise"
  disabled={
    !dateReservation ||
    (modeReservation === 'hour' && selectedHours.length === 0) ||
    (modeReservation === 'halfDay' && isHalfDayOptionDisabled(halfDayPeriod)) ||
    (modeReservation === 'fullDay' && isFullDayReserved)
  }
  onClick={() => {
    const label = `${service.title} — ${modeReservation}${
      modeReservation === 'halfDay' ? ` (${halfDayPeriod})` : ''
    } — ${dateReservation} ${selectedHours.join(', ')}`;
    addItem({ 
      id: `${id}-${dateReservation}`, 
      title: label, 
      price: calculPrix(), 
      quantity: 1 
    });
    toast({ title: 'Ajouté au panier', description: label });
  }}
>
  <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter au panier
</Button>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Lock className="h-4 w-4" />
                      <span>PAIEMENT SÉCURISÉ GARANTI</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <Tabs
                  defaultValue="description"
                  onValueChange={(value) => setActiveTab(value as 'description' | 'reviews')}
                  className="w-full"
                >
                  <TabsContent value="description">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line">{service.description}</p>
                      {service.note && <p className="mt-4 italic text-gray-600">{service.note}</p>}
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews">
                    <ReviewsList reviews={reviews} isLoading={loadingReviews} />
                    <ReviewForm productId={id!} productName={service.title} onReviewSubmitted={() => setRefreshReviews(r => !r)} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
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
