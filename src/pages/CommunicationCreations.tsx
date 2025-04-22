import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationCreations = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-lysco-turquoise mb-16">
            Nos Créations
          </h1>

          {/* Logos */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Logos</h2>
            <p className="text-gray-600 mb-6">
              Nous concevons des logos uniques et mémorables qui reflètent l'identité de votre entreprise.
            </p>
            {/* Galerie (si images disponibles) */}
          </section>

          {/* Sites Web */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sites Web</h2>
            <p className="text-gray-600 mb-4">
              Découvrez quelques-uns des sites que nous avons réalisés :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>
                Praticienne : <a href="https://www.nid-hypnose.com" target="_blank" rel="noopener noreferrer" className="text-lysco-turquoise underline">www.nid-hypnose.com</a>
              </li>
              <li>
                Coiffeur : <a href="https://incantohairstudio.com" target="_blank" rel="noopener noreferrer" className="text-lysco-turquoise underline">incantohairstudio.com</a>
              </li>
              <li>
                Constructeur : <a href="https://maisonsjltconstruction.com" target="_blank" rel="noopener noreferrer" className="text-lysco-turquoise underline">maisonsjltconstruction.com</a>
              </li>
            </ul>
          </section>

          {/* Photographies */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Photographies</h2>
            <p className="text-gray-600">
              Nous réalisons des séances photo professionnelles pour mettre en valeur vos produits, vos locaux et votre équipe.
            </p>
          </section>

          {/* Créations Print */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Créations Print</h2>
            <p className="text-gray-600 mb-4">
              Nous concevons une variété de supports imprimés pour répondre à vos besoins en communication :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Cartes de visite</li>
              <li>Présentoirs</li>
              <li>Posts pour les réseaux sociaux</li>
            </ul>
          </section>

          <div className="text-center mt-16">
            <Link to="/contact">
              <Button className="bg-lysco-turquoise text-white px-8 py-4 text-lg hover:bg-lysco-turquoise/90 rounded-xl shadow">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunicationCreations;
