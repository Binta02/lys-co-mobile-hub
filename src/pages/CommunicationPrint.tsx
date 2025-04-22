import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationPrint = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Communication Print</h1>

        <div className="space-y-6 text-gray-700">
          <p>
            Faites de la communication print une alliée ! Elle vous permettra de vous démarquer de vos concurrents et d’attirer ou de fidéliser votre clientèle. Nous créons tous vos supports print sous tout type de format.
          </p>

          <p>
            Nous réalisons pour vous :
          </p>

          <ul className="list-disc list-inside text-gray-700">
            <li>Cartes de visite</li>
            <li>Flyers</li>
            <li>Affiches</li>
            <li>Brochures</li>
            <li>Dépliants</li>
            <li>Catalogues</li>
            <li>Menus</li>
            <li>Stickers</li>
            <li>Packaging</li>
            <li>Signalétique</li>
            <li>Roll-up</li>
            <li>PLV (Publicité sur le Lieu de Vente)</li>
          </ul>

          <p>
            Chaque support est conçu sur mesure pour refléter l'identité de votre marque et répondre à vos objectifs de communication.
          </p>
        </div>

        <div className="text-center mt-12">
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

export default CommunicationPrint;
