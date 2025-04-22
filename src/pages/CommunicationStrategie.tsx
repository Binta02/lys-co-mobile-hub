import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationStrategie = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Stratégie</h2>
        <p className="text-gray-600 mb-4">
          Vous avez plein d’idées d’entrepreneuriat mais êtes perdue dans vos choix ? Ou votre entreprise stagne ? Ne restez pas seule et faites-vous accompagner par Lys Conseil. Nous réalisons un audit pour déterminer ce qui ne convient pas et vous proposons un coaching personnalisé.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Audit communication : 300€</li>
          <li>Audit commercial : 300€</li>
          <li>Organisation : 60€/heure</li>
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

export default CommunicationStrategie;
