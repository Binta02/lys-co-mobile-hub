import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunicationStrategie = () => {
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Stratégie</h1>

        <div className="space-y-6 text-gray-700">
          <p>
            Vous avez plein d’idées d’entrepreneuriat mais êtes perdue dans vos choix ? Ou votre entreprise stagne ? Ne restez pas seule et faites-vous accompagner par Lys Conseil. Nous réalisons un audit pour déterminer ce qui ne convient pas et vous proposons un coaching personnalisé.
          </p>

          <p>
            Nous vous proposons d’être coachée et guidée sur les éléments suivants :
          </p>

          <ul className="list-disc list-inside text-gray-700">
            <li>L’organisation de votre temps de travail afin de pouvoir consacrer également du temps à vos proches</li>
            <li>La communication de votre image de marque</li>
            <li>Un accompagnement d’un point de vue commercial</li>
          </ul>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Audit communication */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Audit communication</h3>
            <p className="text-gray-600 mb-2">
              Voyons ensemble la communication la plus adéquate.
            </p>
            <p className="text-gray-600 font-medium">300 euros le dossier</p>
          </div>

          {/* Audit commercial */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Audit commercial</h3>
            <p className="text-gray-600 mb-2">
              Nous verrons ensemble une stratégie en béton pour rendre votre société vendeuse.
            </p>
            <p className="text-gray-600 font-medium">300 euros le dossier</p>
          </div>

          {/* Organisation */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Organisation</h3>
            <p className="text-gray-600 mb-2">
              L’organisation est une partie importante de la réussite d’une entreprise. On vous conseille pour avancer chaque jour avec la bonne boussole.
            </p>
            <p className="text-gray-600 font-medium">60 euros de l’heure</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/contact">
            <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
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

export default CommunicationStrategie;
