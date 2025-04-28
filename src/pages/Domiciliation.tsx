import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import DomiciliationPricing from '@/components/domiciliation/DomiciliationPricing';
import DomiciliationServices from '@/components/domiciliation/DomiciliationServices';
import DomiciliationOffers from '@/components/domiciliation/DomiciliationOffers';

interface WordPressPage {
  title: { rendered: string };
  content: { rendered: string };
}

const Domiciliation = () => {
  const [pageData, setPageData] = useState<WordPressPage | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get('https://lys-and-co.com/wp-json/wp/v2/pages?slug=domiciliation');
        setPageData(response.data[0]);
      } catch (error) {
        console.error('Erreur de récupération WordPress:', error);
      }
    };

    fetchPage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {pageData ? pageData.title.rendered : "Domiciliation d'Entreprise à Paris"}
              </h1>
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
              
              {/* Offres */}
              <DomiciliationOffers />

              {/* Pourquoi se domicilier */}
              <Card>
                <CardHeader>
                  <CardTitle>Pourquoi se domicilier chez Lys&Co ?</CardTitle>
                  <CardDescription>Une solution flexible et sans engagement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 prose max-w-none">
                  {pageData ? (
                    <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
                  ) : (
                    <p>Chargement du contenu...</p>
                  )}
                </CardContent>
              </Card>

              {/* Pack Exclusif */}
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

              {/* Pricing */}
              <div id="pricing" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Nos Tarifs</h2>
                  <p className="text-gray-600 mb-8">Des solutions adaptées à chaque type d'entreprise</p>
                </div>
                <DomiciliationPricing />
              </div>

              {/* Services Complémentaires */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Nos Services Complémentaires</h2>
                  <p className="text-gray-600 mb-8">Optimisez votre temps avec nos services supplémentaires !</p>
                </div>
                <DomiciliationServices />
              </div>

              {/* Location Bureaux */}
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
                    <Link to="/contact">
                      <Button variant="outline" className="flex items-center justify-center mx-auto">
                        Plus d’infos ou réserver <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
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
