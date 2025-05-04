import React, { useMemo, useState } from 'react';
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
              
              {/* Right column: Description */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{service.description}</p>
                  
                  {service.note && (
                    <p className="mt-4 italic text-gray-600">{service.note}</p>
                  )}
                </div>
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
