import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';

interface WordPressPage {
  title: { rendered: string };
  content: { rendered: string };
}

const Domiciliation = () => {
  const [pageData, setPageData] = useState<WordPressPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(
          'https://lys-and-co.com/wp-json/wp/v2/pages?slug=domiciliation'
        );
        setPageData(response.data[0]);
      } catch (error) {
        console.error('Erreur de récupération WordPress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-lg font-semibold">Chargement...</p>
          </div>
        ) : pageData ? (
          <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageData.title.rendered}</h1>
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

            {/* Main Content */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-12">

                  {/* Contenu principal WordPress */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pourquoi se domicilier chez Lys&Co ?</CardTitle>
                      <CardDescription>Une solution flexible et sans engagement</CardDescription>
                    </CardHeader>
                    <CardContent className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
                    </CardContent>
                  </Card>

                  {/* Autres sections comme ton ancienne page */}
                  {/* Exemples : DomiciliationOffers, DomiciliationPricing, DomiciliationServices */}

                  <div id="pricing" className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold mb-4">Nos Tarifs</h2>
                      <p className="text-gray-600 mb-8">Des solutions adaptées à chaque type d'entreprise</p>
                    </div>
                    {/* Ici tu peux intégrer DomiciliationPricing si tu veux */}
                  </div>

                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold mb-4">Nos Services Complémentaires</h2>
                      <p className="text-gray-600 mb-8">Optimisez votre temps avec nos services supplémentaires !</p>
                    </div>
                    {/* Ici tu peux intégrer DomiciliationServices si tu veux */}
                  </div>

                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p className="text-lg text-red-600">Impossible de charger la page.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Domiciliation;
