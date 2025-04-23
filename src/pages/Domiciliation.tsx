
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DomiciliationPricing from '@/components/domiciliation/DomiciliationPricing';
import DomiciliationServices from '@/components/domiciliation/DomiciliationServices';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Domiciliation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Domiciliation d'Entreprise à Paris</h1>
              <p className="text-xl text-gray-600 mb-8">
                Depuis 2010, Lys&Co est votre partenaire de confiance pour la domiciliation d'entreprises.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                    Demander un devis
                  </Button>
                </Link>
                <a href="#pricing">
                  <Button variant="outline" className="flex items-center">
                    Voir nos tarifs <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <Card>
                <CardHeader>
                  <CardTitle>Pourquoi se domicilier chez Lys&Co ?</CardTitle>
                  <CardDescription>Une solution flexible et sans engagement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Vous n'avez pas encore de locaux pour votre entreprise et vous ne souhaitez pas divulguer votre adresse personnelle ? 
                    Domiciliez-vous chez Lys&Co en donnant à votre entreprise une adresse sûre et une boîte aux lettres ouverte du lundi au vendredi !
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Offre flexible et sans engagement</li>
                    <li>Mise en place rapide et sans tracas</li>
                    <li>Paiement sécurisé en ligne</li>
                    <li>Pas de dépôt de garantie ni frais de dossier</li>
                    <li>-5% sur l'abonnement annuel pour tout paiement anticipé de 12 mois</li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 font-medium">
                      -50% sur vos 3 premiers mois pour tout engagement de 6 mois !
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Pack Exclusif Section */}
              <Card className="bg-gradient-to-r from-lysco-turquoise/5 to-lysco-pink/5">
                <CardHeader>
                  <CardTitle>Pack domicilié à 1514,00€</CardTitle>
                  <CardDescription>Pack Exclusif pour Nouveaux Domiciliés : Boostez votre entreprise !</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <span className="text-lysco-turquoise">✓</span>
                      <span>Site Internet sur Mesure : Conception professionnelle incluse (hébergement à part)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lysco-turquoise">✓</span>
                      <span>100 Cartes de Visite Professionnelles personnalisées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lysco-turquoise">✓</span>
                      <span>Création et optimisation de pages Instagram et LinkedIn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lysco-turquoise">✓</span>
                      <span>3 Mois de Domiciliation Gratuite (engagement 6 mois)</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/service/pack-exclusif">
                      <Button className="w-full flex items-center justify-center">
                        Je profite de l'offre <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Section */}
              <div id="pricing" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Nos Tarifs</h2>
                  <p className="text-gray-600 mb-8">
                    Des solutions adaptées à chaque type d'entreprise
                  </p>
                </div>
                <DomiciliationPricing />
              </div>

              {/* Services Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Nos Services Complémentaires</h2>
                  <p className="text-gray-600 mb-8">
                    Optimisez votre temps avec nos services supplémentaires !
                  </p>
                </div>
                <DomiciliationServices />
              </div>

              {/* Location de bureaux Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Nos espaces de travail à Deuil-la-Barre</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-bold mb-2">Espace Coworking</h3>
                      <p className="text-gray-600 mb-2">Capacité : 8 personnes</p>
                      <p className="text-2xl font-bold">5€<span className="text-base font-normal">/heure</span></p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Salle de Formation</h3>
                      <p className="text-gray-600 mb-2">Capacité : 10 personnes</p>
                      <ul className="space-y-1">
                        <li>10€/heure</li>
                        <li>25€/demi-journée</li>
                        <li>45€/journée</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Location de Bureau (2 places)</h3>
                    <ul className="space-y-1">
                      <li>125€/mois (demi-journée)</li>
                      <li>250€/mois (journée complète)</li>
                    </ul>
                  </div>
                  <Link to="/service/location-bureau">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      Réserver un espace <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Domiciliation;
