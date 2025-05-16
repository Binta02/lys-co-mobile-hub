
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DomiciliationServices from '@/components/domiciliation/DomiciliationServices';
import DomiciliationPricing from '@/components/domiciliation/DomiciliationPricing';
import DomiciliationOffers from '@/components/domiciliation/DomiciliationOffers';
import ComplementaryServices from '@/components/domiciliation/ComplementaryServices';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Domiciliation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="/domiciliation">Domiciliation</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <section className="mb-16">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Domiciliation d'entreprise à Béthune</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Domiciliez votre entreprise à Béthune et bénéficiez de nombreux services pour faciliter votre gestion administrative.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 rounded-lg p-8 text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Nos formules d'abonnement mensuel</h2>
              <p className="mb-8">Choisissez la formule qui correspond le mieux à votre statut et à vos besoins</p>
              
              <DomiciliationPricing />
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Nos offres prépayées</h2>
              <p className="mb-8">Pour plus de flexibilité, optez pour nos forfaits prépayés de 3 mois, 6 mois ou 1 an</p>
              
              <DomiciliationOffers />
            </div>
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
                    <Link to="/domiciliation/pack-domicilie">
                      <Button className="w-full flex items-center justify-center">
                        Je profite de l'offre <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            <div className="bg-gradient-to-r from-lysco-pink/10 to-lysco-turquoise/10 rounded-lg p-8 text-center mb-8">
              <ComplementaryServices />
            </div>
            
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold mb-6">Vous avez des questions ?</h2>
              <div className="flex justify-center flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
                    Contactez-nous
                  </Button>
                </Link>
                <Link to="/services-complementaires">
                  <Button variant="outline" className="border-lysco-pink text-lysco-pink hover:bg-lysco-pink/10">
                    En savoir plus sur nos services
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          {/* Location de bureaux Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Nos espaces de travail à Deuil-la-Barre</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Link to="/service/coworking-space" className="block hover:bg-gray-50 p-4 rounded transition">
                      <h3 className="font-bold mb-2">Espace Coworking</h3>
                      <p className="text-gray-600 mb-2">Capacité : 8 personnes</p>
                      <p className="text-2xl font-bold">5€<span className="text-base font-normal">/heure</span></p>
                    </Link>

                    <Link to="/service/formation-room" className="block hover:bg-gray-50 p-4 rounded transition">
                      <h3 className="font-bold mb-2">Salle de Formation</h3>
                      <p className="text-gray-600 mb-2">Capacité : 10 personnes</p>
                      <ul className="space-y-1">
                        <li>10€/heure</li>
                        <li>25€/demi-journée</li>
                        <li>45€/journée</li>
                      </ul>
                    </Link>
                  </div>

                  <Link to="/service/location-bureau" className="block hover:bg-gray-50 p-4 rounded transition">
                    <h3 className="font-bold mb-2">Location de Bureau (2 places)</h3>
                    <ul className="space-y-1">
                      <li>125€/mois (demi-journée)</li>
                      <li>250€/mois (journée complète)</li>
                    </ul>
                  </Link>

                  <div className="text-center">
                    <Link to="/espaces-travail">
                      <Button variant="outline" className="flex items-center justify-center mx-auto">
                        Plus d'infos ou réserver <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
          {/* <DomiciliationServices /> */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Domiciliation;
