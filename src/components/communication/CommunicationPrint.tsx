import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationPrint = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Communication Print</h2>
        <p className="text-gray-600 mb-4">
          Faites de la communication print une alliée ! Elle vous permettra de vous démarquer de vos concurrents et d’attirer ou de fidéliser votre clientèle. Nous créons tous vos supports print sous tout type de format.
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

export default CommunicationPrint;
