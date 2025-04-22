import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationMediaTraining = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Media Training</h2>
        <p className="text-gray-600 mb-4">
          Vous souhaitez améliorer votre prise de parole en public, que ce soit pour des présentations, des interviews ou des conférences ? Lys Conseil vous accompagne avec des coachs spécialisés pour :
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Communiquer efficacement vos messages, assurant qu’ils soient clairs et percutants.</li>
          <li>Optimiser vos techniques de vente, pour transformer vos présentations en opportunités concrètes.</li>
          <li>Renforcer votre pouvoir de persuasion, afin de convaincre avec aisance et impact.</li>
          <li>Stimuler l’intérêt de vos clients, les incitant à choisir vos produits ou services.</li>
          <li>Exprimer votre perspective, en garantissant qu’elle soit comprise et appréciée à sa juste valeur.</li>
        </ul>
        <p className="text-gray-600 mb-4">
          Un oral se prépare pour communiquer clairement ! Nous vous apprendrons à gérer votre stress, bien communiquer oralement et travailler votre langage corporel.
        </p>
        <h3 className="text-xl font-semibold mb-2">Tarifs :</h3>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>60€ de l’heure</li>
          <li>90€ de l’heure si déplacement</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Mini formation 3 heures :</h3>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>160€ par personne dans nos locaux (minimum 2 personnes)</li>
          <li>250€ par personne dans vos locaux (minimum 2 personnes)</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Formation en ligne :</h3>
        <p className="text-gray-600 mb-4">
          Vous recevez 3 vidéos expliquant comment bien préparer et bien communiquer pour différentes situations, accompagnées d'exercices pratiques.
        </p>
        <p className="text-gray-600 mb-4">99€</p>
        <Link to="/contact">
          <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
            Contactez-nous
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CommunicationMediaTraining;
