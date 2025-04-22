import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationSiteInternet = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Site Internet</h2>
        <p className="text-gray-600 mb-4">
          Un site internet est comparable à une vitrine d’une enseigne. Plus cette vitrine est jolie, plus le potentiel acheteur se rend sur le site. Nous concevons des sites internet avec un bon UX Design, adaptés à tous les terminaux et optimisés pour le SEO.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Création site vitrine : à partir de 1000€</li>
          <li>Création site e-commerce : à partir de 1500€</li>
          <li>Refonte et référencement naturel : à partir de 50€/heure</li>
        </ul>
        <Link to="/contact">
          <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
            Contactez-nous
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CommunicationSiteInternet;
