import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunicationMediaTraining = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Media Training</h1>

        <div className="space-y-6 text-gray-700">
          <p>
            Vous souhaitez améliorer votre prise de parole en public, que ce soit pour des présentations, des interviews ou des conférences ? Lys Conseil vous accompagne avec des coachs spécialisés pour :
          </p>

          <ul className="list-disc list-inside">
            <li>Communiquer efficacement vos messages, assurant qu’ils soient clairs et percutants.</li>
            <li>Optimiser vos techniques de vente, pour transformer vos présentations en opportunités concrètes.</li>
            <li>Renforcer votre pouvoir de persuasion, afin de convaincre avec aisance et impact.</li>
            <li>Stimuler l’intérêt de vos clients, les incitant à choisir vos produits ou services.</li>
            <li>Exprimer votre perspective, en garantissant qu’elle soit comprise et appréciée à sa juste valeur.</li>
          </ul>

          <p>
            Un oral se prépare pour communiquer clairement ! Nous vous apprendrons à gérer votre stress, bien communiquer oralement et travailler votre langage corporel.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Tarifs</h2>
          <ul className="list-disc list-inside">
            <li>60€ de l’heure</li>
            <li>90€ de l’heure si déplacement</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">Mini formation 3 heures</h2>
          <ul className="list-disc list-inside">
            <li>160€ par personne dans nos locaux (minimum 2 personnes)</li>
            <li>250€ par personne dans vos locaux (minimum 2 personnes)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">Formation en ligne</h2>
          <p>
            Vous recevez 3 vidéos expliquant comment bien préparer et bien communiquer pour différentes situations, accompagnées d'exercices pratiques.
          </p>
          <p>99€</p>
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

export default CommunicationMediaTraining;
