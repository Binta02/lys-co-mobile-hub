import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationCreations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Nos Créations</h1>

          {/* Logos */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Logos</h2>
            <p className="text-gray-600 mb-4">
              Nous concevons des logos uniques et mémorables qui reflètent l'identité de votre entreprise.
            </p>
            {/* Intégration d'une galerie d'images de logos */}
            {/* Exemple :
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="/images/logo1.jpg" alt="Logo 1" className="w-full h-auto" />
              <img src="/images/logo2.jpg" alt="Logo 2" className="w-full h-auto" />
              <img src="/images/logo3.jpg" alt="Logo 3" className="w-full h-auto" />
            </div>
            */}
          </section>

          {/* Sites Web */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Sites Web</h2>
            <p className="text-gray-600 mb-4">
              Découvrez quelques-uns des sites que nous avons réalisés :
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>
                Praticienne :{' '}
                <a
                  href="https://www.nid-hypnose.com"
                  className="text-lysco-turquoise hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.nid-hypnose.com
                </a>
              </li>
              <li>
                Coiffeur :{' '}
                <a
                  href="https://incantohairstudio.com"
                  className="text-lysco-turquoise hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  incantohairstudio.com
                </a>
              </li>
              <li>
                Construction de maison :{' '}
                <a
                  href="https://maisonsjltconstruction.com"
                  className="text-lysco-turquoise hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  maisonsjltconstruction.com
                </a>
              </li>
            </ul>
            {/* Intégration d'une galerie d'images des sites web */}
            {/* Exemple :
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="/images/site1.jpg" alt="Site 1" className="w-full h-auto" />
              <img src="/images/site2.jpg" alt="Site 2" className="w-full h-auto" />
              <img src="/images/site3.jpg" alt="Site 3" className="w-full h-auto" />
            </div>
            */}
          </section>

          {/* Photographies */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Photographies</h2>
            <p className="text-gray-600 mb-4">
              Nous réalisons des séances photo professionnelles pour mettre en valeur vos produits, vos locaux et votre équipe.
            </p>
            {/* Organisation des photos en catégories : Objet, Portrait, Métiers de bouche, Locaux */}
            {/* Exemple :
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img src="/images/photo1.jpg" alt="Photo 1" className="w-full h-auto" />
              <img src="/images/photo2.jpg" alt="Photo 2" className="w-full h-auto" />
            </div>
            */}
          </section>

          {/* Créations Print */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Créations Print</h2>
            <p className="text-gray-600 mb-4">
              Nous concevons une variété de supports imprimés pour répondre à vos besoins en communication :
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Cartes de visite</li>
              <li>Présentoirs</li>
              <li>Posts pour les réseaux sociaux</li>
              {/* Ajoutez d'autres éléments si nécessaire */}
            </ul>
            {/* Intégration d'une galerie d'images des créations print */}
            {/* Exemple :
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="/images/print1.jpg" alt="Print 1" className="w-full h-auto" />
              <img src="/images/print2.jpg" alt="Print 2" className="w-full h-auto" />
              <img src="/images/print3.jpg" alt="Print 3" className="w-full h-auto" />
            </div>
            */}
          </section>

          <div className="text-center">
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

export default CommunicationCreations;
