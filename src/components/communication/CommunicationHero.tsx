
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationHero = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">NOS PRESTATIONS DE COMMUNICATION</h1>
          <div className="space-y-4 mb-8 text-gray-600">
            <p>
              Spécialisés dans la communication des TPE et PME, nous vous proposons de vous accompagner dans tous les aspects de votre communication et ceci à des prix abordables.
            </p>
            <p>
              La communication digitale/print de votre entreprise, votre propre communication orale, la mise en avant de vos produits, le souci d'améliorer votre image et celle de votre société : tout va être judicieusement analysé par notre équipe d'experts et partenaires.
            </p>
            <p>
              Faites confiance à notre équipe et à nos partenaires spécialistes : rédacteurs, graphistes, webmaster, photographes, vidéastes, spécialistes du motion design… Nous serons en mesure de bien piloter votre projet de A à Z !
            </p>
          </div>
          <Link to="/contact">
            <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
              Prenez RDV !
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunicationHero;
