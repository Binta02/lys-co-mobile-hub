
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
          
          <DomiciliationServices />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Domiciliation;
