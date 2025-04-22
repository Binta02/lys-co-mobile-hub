
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Mail, FileText, ClipboardList } from 'lucide-react';

const Domiciliation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Domiciliation Commerciale à Paris</h1>
              <p className="text-xl text-gray-600 mb-8">
                Une adresse professionnelle prestigieuse pour votre entreprise au cœur de Paris
              </p>
              <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                Demander un devis
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-lysco-turquoise" />
                  </div>
                  <CardTitle>Adresse Professionnelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Bénéficiez d'une adresse commerciale prestigieuse à Paris pour votre entreprise, idéale pour vos documents officiels et votre image professionnelle.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-lysco-pink/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-lysco-pink" />
                  </div>
                  <CardTitle>Gestion du Courrier</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Réception, tri et numérisation de votre courrier. Transmission selon vos préférences : scan, transfert ou conservation.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-lysco-turquoise" />
                  </div>
                  <CardTitle>Service juridique</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Assistance pour vos formalités juridiques et administratives, modifications statutaires et changements d'adresse.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir notre service de domiciliation ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <ClipboardList className="h-6 w-6 text-lysco-turquoise flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Conformité légale</h3>
                  <p className="text-gray-600">
                    Service agréé par la Préfecture de Police de Paris, en conformité avec la législation en vigueur.
                  </p>
                </div>
              </div>
              {/* More features... */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Domiciliation;
