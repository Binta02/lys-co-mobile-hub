import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationCreations = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Créations</h2>
        <p className="text-gray-600 mb-4">
          Nous concevons des supports de communication sur mesure pour valoriser votre image de marque. De la création de logos à la réalisation de brochures, notre équipe vous accompagne dans tous vos projets créatifs.
        </p>
        <Link to="/contact">
          <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
            Contactez-nous
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CommunicationCreations;
