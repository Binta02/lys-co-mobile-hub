import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationCreations = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Nos Créations</h1>

        {/* Logos */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Logos</h2>
          <p className="text-gray-600 mb-4">
            Nous concevons des logos uniques et mémorables qui reflètent l'identité de votre entreprise.
          </p>
          {/* Ici, tu peux intégrer une galerie d'images de logos */}
        </div>

        {/* Sites Web */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Sites Web</h2>
          <p className="text-gray-600 mb-4">
            Découvrez quelques-uns des sites que nous avons réalisés :
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>
              Praticienne : <a href="https://www.nid-hypnose.com" className="text-lysco-turquoise hover:underline" target="_blank" rel="noopener noreferrer">www.nid-hypnose.com</a>
            </li>
            <li>
              Coiffeur : <a href="https://incantohairstudio.com" className="text-lysco-turquoise hover:underline" target="_blank" rel="noopener noreferrer">incantohairstudio.com</a>
            </li>
            <li>
              Construction de maison : <a href="https://maisonsjltconstruction.com" className="text-lysco-turquoise hover:underline" target="_blank" rel="noopener noreferrer">maisonsjltconstruction.com</a>
            </li>
          </ul>
          {/* Intègre ici une galerie d'images des sites web */}
        </div>

        {/* Photographies */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Photographies</h2>
          <p className="text-gray-600 mb-4">
            Nous réalisons des séances photo professionnelles pour mettre en valeur vos produits, vos locaux et votre équipe.
          </p>
          {/* Tu peux organiser les photos en catégories : Objet, Portrait, Métiers de bouche, Locaux */}
        </div>

        {/* Créations Print */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Créations Print</h2>
          <p className="text-gray-600 mb-4">
            Nous concevons une variété de supports imprimés pour répondre à vos besoins en communication :
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Cartes de visite</li>
            <li>Présentoirs</li>
            <li>Posts pour les réseaux sociaux</li>
            {/* Ajoute d'autres éléments si nécessaire */}
          </ul>
          {/* Intègre ici une galerie d'images des créations print */}
        </div>

        <div className="text-center">
          <Link to="/contact">
            <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
              Contactez-nous
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunicationCreations;
