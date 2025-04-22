import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationCreations = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-lysco-turquoise mb-16">
            Les créations de Lys&Co
          </h1>

          {/* Logos */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-lysco-turquoise mb-4">Les logos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105723.png" alt="Logo 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105730.png" alt="Logo 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105710.png" alt="Logo 3" />
            </div>
          </section>

          {/* Sites web */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-lysco-turquoise mb-4">Les sites web</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105754-1.png" alt="Site 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/Capture-decran-2025-03-04-105810-1.png" alt="Site 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/IMG_1221.jpg" alt="Site 3" />
            </div>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Praticienne : <a href="https://www.nid-hypnose.com" className="text-lysco-turquoise underline" target="_blank">www.nid-hypnose.com</a></li>
              <li>Coiffeur : <a href="https://incantohairstudio.com" className="text-lysco-turquoise underline" target="_blank">incantohairstudio.com</a></li>
              <li>Construction de maison : <a href="https://maisonsjltconstruction.com" className="text-lysco-turquoise underline" target="_blank">maisonsjltconstruction.com</a></li>
            </ul>
          </section>

          {/* Photos */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-lysco-turquoise mb-6">Les photos</h2>

            {/* Objet */}
            <h3 className="text-xl font-medium mb-4 text-pink-600">Objet</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/montre1.png" alt="Objet 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/montre2.png" alt="Objet 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/montre3.png" alt="Objet 3" />
            </div>

            {/* Portrait */}
            <h3 className="text-xl font-medium mb-4 text-pink-600">Portrait</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/portrait1.png" alt="Portrait 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/portrait2.png" alt="Portrait 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/portrait3.png" alt="Portrait 3" />
            </div>

            {/* Métiers de bouches */}
            <h3 className="text-xl font-medium mb-4 text-pink-600">Métiers de bouches</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/food1.png" alt="Food 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/food2.png" alt="Food 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/food3.png" alt="Food 3" />
            </div>

            {/* Locaux */}
            <h3 className="text-xl font-medium mb-4 text-pink-600">Locaux</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/locaux1.png" alt="Locaux 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/locaux2.png" alt="Locaux 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/locaux3.png" alt="Locaux 3" />
            </div>
          </section>

          {/* Créations Print */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-lysco-turquoise mb-4">Créations Prints</h2>

            {/* Métiers divers */}
            <h3 className="text-lg font-medium mb-2">Métiers de divers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/menu1.png" alt="Menu 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/menu2.png" alt="Menu 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/menu3.png" alt="Menu 3" />
            </div>

            {/* Cartes de visite */}
            <h3 className="text-lg font-medium mb-2">Cartes de visite</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/carte1.png" alt="Carte 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/carte2.png" alt="Carte 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/carte3.png" alt="Carte 3" />
            </div>

            {/* Présentoirs */}
            <h3 className="text-lg font-medium mb-2">Présentoirs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/presentoir.png" alt="Présentoir" />
            </div>

            {/* Réseaux sociaux */}
            <h3 className="text-lg font-medium mb-2">Post réseaux sociaux</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/reseaux1.png" alt="Réseau 1" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/reseaux2.png" alt="Réseau 2" />
              <img src="https://lys-and-co.com/wp-content/uploads/2025/03/reseaux3.png" alt="Réseau 3" />
            </div>
          </section>

          <div className="text-center mt-20">
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
