import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationPacks = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Nos Packs de Communication</h1>

        <p className="text-gray-700 mb-8">
          Lys Conseil met à votre disposition trois packs complets, spécialement conçus pour répondre efficacement à vos besoins en matière de communication, tout en tenant compte de votre budget. Chaque pack offre une flexibilité maximale, y compris dans les modalités de paiement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pack Starter */}
          <div className="border p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Pack Starter</h2>
            <p className="text-gray-600 mb-4">Lancez-vous</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Création de logo</li>
              <li>Identité visuelle</li>
              <li>1 création de carte de visite (hors impression)</li>
              <li>1 site web one page</li>
            </ul>
            <p className="text-gray-800 font-bold">À partir de 1500€</p>
          </div>

          {/* Pack Moyen */}
          <div className="border p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Pack Moyen</h2>
            <p className="text-gray-600 mb-4">Repensez votre image</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Création de logo</li>
              <li>Identité visuelle</li>
              <li>1 création de carte de visite (hors impression)</li>
              <li>1 site internet vitrine 3 pages</li>
              <li>Photos professionnelles (10 inclus)</li>
              <li>Création d’une page réseau social</li>
            </ul>
            <p className="text-gray-800 font-bold">À partir de 2000€</p>
          </div>

          {/* Pack Pro */}
          <div className="border p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Pack Pro</h2>
            <p className="text-gray-600 mb-4">La solution pour performer</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Création de logo</li>
              <li>Identité visuelle</li>
              <li>1 flyer recto</li>
              <li>1 création de carte de visite (hors impression)</li>
              <li>1 site vitrine 5 pages</li>
              <li>Création de pages réseaux sociaux (3 pages)</li>
            </ul>
            <p className="text-gray-800 font-bold">À partir de 2600€</p>
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
    </section>
  );
};

export default CommunicationPacks;
