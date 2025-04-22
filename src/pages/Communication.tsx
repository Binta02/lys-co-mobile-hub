import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Share2, BarChart, Megaphone } from 'lucide-react';
import CommunicationFAQ from '@/components/communication/CommunicationFAQ';

const Communication = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Communication & Marketing</h1>
              <p className="text-xl text-gray-600 mb-8">
                Développez votre visibilité et renforcez votre image de marque
              </p>
              <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                Nos solutions
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-lysco-turquoise" />
                  </div>
                  <CardTitle>Réseaux Sociaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Gestion de vos réseaux sociaux, création de contenu engageant et analyse des performances.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-lysco-pink/10 flex items-center justify-center mb-4">
                    <Share2 className="h-6 w-6 text-lysco-pink" />
                  </div>
                  <CardTitle>Marketing Digital</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Stratégie digitale, campagnes publicitaires, référencement naturel et payant.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-lysco-turquoise" />
                  </div>
                  <CardTitle>Analyse & Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Suivi des performances, analyses statistiques et rapports personnalisés.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Notre approche stratégique</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Megaphone className="h-6 w-6 text-lysco-turquoise flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Communication ciblée</h3>
                  <p className="text-gray-600">
                    Stratégies personnalisées selon votre secteur d'activité et vos objectifs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CommunicationFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Communication;
