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
    description: "Notre service d’accompagnement pour l’ouverture de votre société VTC offre une assistance professionnelle et personnalisée pour simplifier le processus de création et de lancement de votre entreprise. En partenariat avec notre expert-comptable spécialisé, nous vous guidons à travers toutes les étapes, depuis l’enregistrement de votre société jusqu’à l’obtention des licences nécessaires. De plus, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous, rendant nos services encore plus accessibles et avantageux."
  },
  'bank-account': {
    title: 'Accompagnement ouverture de compte bancaire en ligne',
    price: '150,00',
    description: "Notre service d’Accompagnement à l’Ouverture de Compte est conçu pour faciliter et accélérer le processus d’ouverture de compte bancaire pour les entreprises et les particuliers. Grâce à une assistance personnalisée, nous guidons nos clients à travers chaque étape, depuis la préparation des documents nécessaires jusqu’à l’obtention de leur nouveau compte bancaire, en veillant à simplifier les démarches et à répondre à toutes les exigences des institutions financières."
  },
  'company-creation': {
    title: 'Accompagnement ouverture de votre société',
    price: '600,00',
    description: "Notre service d’accompagnement à l’ouverture de société vous offre une assistance professionnelle et complète en partenariat avec notre expert-comptable qualifié. Nous vous guidons à travers toutes les étapes de création de votre entreprise, en veillant à ce que toutes les exigences légales soient respectées. De plus, nous vous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre société chez nous, ce qui vous permet de bénéficier d’un avantage financier supplémentaire. Avec notre service, vous pouvez démarrer votre entreprise en toute confiance, sachant que vous bénéficiez du soutien nécessaire pour réussir."
  },
  'micro-company': {
    title: 'Accompagnement ouverture micro entreprise',
    price: '150,00',
    description: "Notre service d’accompagnement à l’ouverture de micro-entreprise offre une assistance professionnelle et complète pour vous guider à travers toutes les étapes nécessaires pour démarrer votre activité avec succès. De la consultation initiale à l’assistance à la constitution du dossier et au suivi continu, notre équipe expérimentée est là pour vous fournir les conseils, les ressources et le soutien dont vous avez besoin pour lancer votre micro-entreprise en toute confiance"
  },
  'company-transfer': {
    title: 'Accompagnement transfert de société',
    price: '600,00',
    note: '*hors coûts organismes',
    description: "Notre service d’accompagnement pour le transfert de votre société offre une assistance professionnelle et personnalisée pour simplifier le processus de transfert de propriété ou de siège social de votre entreprise. En partenariat avec notre expert-comptable expérimenté, nous vous guidons à travers toutes les étapes, depuis la préparation de la documentation jusqu’à la finalisation du transfert. De plus, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous, rendant nos services encore plus accessibles et avantageux."
  },
  'share-transfer': {
    title: 'Cession de parts',
    price: '200,00',
    description: "Le service de cession de parts de notre société offre une assistance professionnelle et complète pour faciliter le transfert de propriété dans les sociétés. De la consultation sur les aspects juridiques et fiscaux à la négociation d’accords personnalisés et à l’obtention des approbations nécessaires, notre équipe expérimentée est là pour accompagner les associés, les investisseurs et les entreprises tout au long du processus de cession. Notre objectif est de simplifier et d’accélérer le processus, tout en veillant à ce que les intérêts de toutes les parties concernées soient pris en compte de manière équitable et professionnelle."
  },
  'commercial-ad': {
    title: "Création annonce commerciale pour site d'annonces",
    price: '15,00',
    description: "Notre service de création d’annonces commerciales pour sites d’annonces vous aide à maximiser la visibilité et l’efficacité de vos annonces en ligne. Nous pensons soigneusement chaque annonce pour qu’elle soit vendeuse et optimisée avec les bons mots-clés, ce qui augmente vos chances d’attirer l’attention de votre public cible. Avec notre équipe expérimentée, vous pouvez être sûr que vos annonces seront convaincantes et captivantes, vous permettant de générer plus de trafic et de prospects pour votre entreprise."
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
};

// --- Simuler les réservations existantes (date -> heures prises)
const reservations = {
  '2025-05-01': ['09:00', '10:00'],
  '2025-05-02': ['13:00', '14:00'],
};

const hoursAvailable = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const ServiceDetail = () => {
  const { addItem } = useCart();
  const { id } = useParams();
  const { toast } = useToast();

  const service = useMemo(() => {
    if (!id || !serviceData[id]) return serviceData['coworking-space'];
    return serviceData[id];
  }, [id]);

  const [modeReservation, setModeReservation] = useState<string>('hour');
  const [dateReservation, setDateReservation] = useState<string>('');
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [halfDayPeriod, setHalfDayPeriod] = useState<string>('morning');
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("description");
  const [refreshReviews, setRefreshReviews] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);


  const toggleHour = (hour: string) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter(h => h !== hour));
    } else {
      setSelectedHours([...selectedHours, hour]);
    }
  };

  const isHourReserved = (date: string, hour: string) => {
    return reservations[date]?.includes(hour);
  };

  const calculPrix = () => {
    if (!id) return parseFloat(service.price.replace(',', '.'));

    // Check if the id is one of our reservation types
    if (id === 'coworking-space' || id === 'formation-room' || id === 'location-bureau') {
      // Handle coworking space hourly pricing
      if (id === 'coworking-space') {
        return (selectedHours.length || 1) * reservationPrices[id].hour;
      }
      
      // Handle formation room pricing
      if (id === 'formation-room') {
        if (modeReservation === 'hour') {
          return (selectedHours.length || 1) * reservationPrices[id].hour;
        }
        if (modeReservation === 'halfDay') {
          return reservationPrices[id].halfDay;
        }
        if (modeReservation === 'fullDay') {
          return reservationPrices[id].fullDay;
        }
      }
      
      // Handle location bureau pricing
      if (id === 'location-bureau') {
        if (modeReservation === 'halfDay') {
          return reservationPrices[id].halfDay;
        }
        if (modeReservation === 'fullDay') {
          return reservationPrices[id].fullDay;
        }
      }
    }
    
    return parseFloat(service.price.replace(',', '.'));
  };

  // Fetch reviews for this service
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('product_id', id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setReviews(data || []);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id, refreshReviews]);

  const handleReviewSubmitted = () => {
    setRefreshReviews(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold mb-6 text-center">{service.title}</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left column: Service information */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-semibold text-lysco-turquoise">{calculPrix().toFixed(2)} €</div>
                    {service.priceUnit && (
                      <span className="text-gray-500">{service.priceUnit}</span>
                    )}
                    <p className="text-sm text-gray-500">Hors taxes</p>
                    {service.originalPrice && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg text-gray-400 line-through">{service.originalPrice} €</span>
                        {service.isPromo && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">Promo</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {id && (id === 'coworking-space' || id === 'formation-room' || id === 'location-bureau') && (
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">Réservation flexible</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">Disponible maintenant</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reservation form */}
                {id && (id === 'coworking-space' || id === 'formation-room' || id === 'location-bureau') && (
                  <div className="mt-8 space-y-4 p-5 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-lg">Réserver</h3>
                    
                    {/* Type de réservation */}
                    {id !== 'coworking-space' && (
                      <div className="space-y-2">
                        <label className="font-medium text-gray-700">Type de réservation</label>
                        <select
                          value={modeReservation}
                          onChange={(e) => setModeReservation(e.target.value)}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-lysco-turquoise focus:border-transparent"
                        >
                          <option value="">Sélectionner une option</option>
                          {id === 'formation-room' && (
                            <option value="hour">À l'heure</option>
                          )}
                          {(id === 'formation-room' || id === 'location-bureau') && (
                            <option value="halfDay">Demi-journée</option>
                          )}
                          {(id === 'formation-room' || id === 'location-bureau') && (
                            <option value="fullDay">Journée complète</option>
                          )}
                        </select>
                      </div>
                    )}
                    
                    {/* Matin / Après-midi */}
                    {modeReservation === 'halfDay' && (id === 'location-bureau' || id === 'formation-room') && (
                      <div className="space-y-2">
                        <label className="font-medium text-gray-700">Matin ou Après-midi</label>
                        <select
                          value={halfDayPeriod}
                          onChange={(e) => setHalfDayPeriod(e.target.value)}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-lysco-turquoise focus:border-transparent"
                        >
                          <option value="">Sélectionner</option>
                          <option value="morning">Matin (9h-12h)</option>
                          <option value="afternoon">Après-midi (13h-16h)</option>
                        </select>
                      </div>
                    )}
                    
                    {/* Date */}
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700">Choisir une date</label>
                      <input
                        type="date"
                        value={dateReservation}
                        onChange={(e) => {
                          setDateReservation(e.target.value);
                          setSelectedHours([]);
                        }}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-lysco-turquoise focus:border-transparent"
                      />
                    </div>

                    {/* Choix des heures */}
                    {(id === 'coworking-space' || (id === 'formation-room' && modeReservation === 'hour')) && dateReservation && (
                      <div>
                        <p className="font-medium text-gray-700 mb-2">Choisir des heures :</p>
                        <div className="grid grid-cols-4 gap-2">
                          {hoursAvailable.map((hour) => (
                            <button
                              key={hour}
                              disabled={isHourReserved(dateReservation, hour)}
                              onClick={() => toggleHour(hour)}
                              className={`p-2 border rounded text-sm transition-colors ${
                                isHourReserved(dateReservation, hour)
                                  ? 'bg-red-100 text-red-400 cursor-not-allowed'
                                  : selectedHours.includes(hour)
                                  ? 'bg-green-100 text-green-700 border-green-300'
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                            >
                              {hour}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">* Les heures en rouge sont déjà réservées.</p>
                      </div>
                    )}
                  </div>
                )}
                
                <Button
                  className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90"
                  disabled={
                    (id === 'coworking-space' && (!dateReservation || selectedHours.length === 0)) ||
                    (id === 'formation-room' && (
                      !modeReservation ||
                      !dateReservation ||
                      (modeReservation === 'hour' && selectedHours.length === 0) ||
                      (modeReservation === 'halfDay' && !halfDayPeriod)
                    )) ||
                    (id === 'location-bureau' && (
                      !modeReservation ||
                      !dateReservation ||
                      (modeReservation === 'halfDay' && !halfDayPeriod)
                    ))
                  }
                  onClick={() => {
                    addItem({
                      id: `service-${id}`,
                      title: `${service.title} - ${modeReservation}${halfDayPeriod ? ` (${halfDayPeriod})` : ''} - ${dateReservation} ${selectedHours.join(', ')}`,
                      price: calculPrix(),
                      quantity: 1,
                    });
                    toast({
                      title: "Article ajouté au panier",
                      description: `${service.title} a été ajouté à votre panier.`,
                      variant: "default",
                    });
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
              
              {/* Right column: Tabs for Description and Reviews */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <Tabs defaultValue="description" onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    {/* <TabsTrigger value="reviews">Avis ({reviews.length})</TabsTrigger> */}
                  </TabsList>
                  
                  <TabsContent value="description" className="focus-visible:outline-none focus-visible:ring-0">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line">{service.description}</p>
                      
                      {service.note && (
                        <p className="mt-4 italic text-gray-600">{service.note}</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="focus-visible:outline-none focus-visible:ring-0 space-y-6">
                    {id && (
                      <>
                        <ReviewsList reviews={reviews} isLoading={loadingReviews} />
                        <ReviewForm 
                          productId={id} 
                          productName={service.title}
                          onReviewSubmitted={handleReviewSubmitted}
                        />
                      </>
                    )}
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
  );
};

export default ServiceDetail;
