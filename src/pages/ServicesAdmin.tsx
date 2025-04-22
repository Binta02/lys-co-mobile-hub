
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ClipboardCheck, Calculator, Clock } from 'lucide-react';

const ServicesAdmin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lysco-pink/10 to-lysco-turquoise/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Services Administratifs</h1>
              <p className="text-xl text-gray-600 mb-8">
                Externalisez vos tâches administratives et concentrez-vous sur votre cœur de métier
              </p>
              <Button className="bg-lysco-pink hover:bg-lysco-pink/90 text-white">
                Découvrir nos offres
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
                  <div className="w-12 h-12 rounded-full bg-lysco-pink/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-lysco-pink" />
                  </div>
                  <CardTitle>Gestion Administrative</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Traitement du courrier, classement et archivage de documents, suivi des échéances administratives.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
                    <ClipboardCheck className="h-6 w-6 text-lysco-turquoise" />
                  </div>
                  <CardTitle>Conformité Réglementaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Veille juridique, mise en conformité RGPD, suivi des obligations légales et réglementaires.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-lysco-pink/10 flex items-center justify-center mb-4">
                    <Calculator className="h-6 w-6 text-lysco-pink" />
                  </div>
                  <CardTitle>Gestion Comptable</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Saisie comptable, rapprochements bancaires, préparation des documents comptables.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Les avantages de nos services administratifs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Clock className="h-6 w-6 text-lysco-pink flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gain de temps</h3>
                  <p className="text-gray-600">
                    Libérez du temps pour vous concentrer sur le développement de votre activité.
                  </p>
                </div>
              </div>
              {/* More benefits... */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesAdmin;
