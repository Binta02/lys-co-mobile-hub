
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const EspacesTravail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Nos espaces de travail</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Nos espaces de travail</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-lysco-turquoise">Espace de coworking moderne</h2>
              <p className="text-gray-600 mb-4">
                Notre espace de coworking offre un environnement moderne et stimulant pour les entrepreneurs et les équipes. 
                Avec des espaces de travail flexibles, une connexion internet haut débit, et toutes les commodités nécessaires, 
                vous pourrez travailler efficacement dans un cadre professionnel.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Postes de travail ergonomiques</li>
                <li>Salles de réunion équipées</li>
                <li>Coin café et détente</li>
                <li>Connexion internet haut débit sécurisée</li>
                <li>Imprimantes et scanners accessibles</li>
              </ul>
              <Link to="/contact">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                  Réserver un espace
                </Button>
              </Link>
            </div>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              <p className="text-gray-500">Image de l'espace de coworking</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="order-2 md:order-1 bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              <p className="text-gray-500">Image des bureaux privés</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-semibold mb-4 text-lysco-pink">Bureaux privés</h2>
              <p className="text-gray-600 mb-4">
                Pour ceux qui recherchent plus de confidentialité et d'espace dédié, nos bureaux privés offrent 
                l'environnement parfait pour les équipes et les professionnels. Entièrement équipés et personnalisables, 
                ces espaces vous permettent de vous concentrer pleinement sur votre activité.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Espaces sécurisés et privés</li>
                <li>Mobilier de qualité</li>
                <li>Accès 24/7</li>
                <li>Services de réception</li>
                <li>Forfaits flexibles : journalier, hebdomadaire ou mensuel</li>
              </ul>
              <Link to="/contact">
                <Button className="bg-lysco-pink hover:bg-lysco-pink/90 text-white">
                  Demander un devis
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-lysco-turquoise">Salles de réunion</h2>
              <p className="text-gray-600 mb-4">
                Organisez vos réunions, formations ou événements dans nos salles parfaitement équipées. 
                Disponibles à l'heure ou à la journée, nos salles de réunion sont conçues pour répondre 
                à tous vos besoins professionnels.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Capacité de 2 à 20 personnes</li>
                <li>Équipement audiovisuel moderne</li>
                <li>Tableaux blancs et paperboards</li>
                <li>Service de restauration sur demande</li>
                <li>Assistance technique disponible</li>
              </ul>
              <Link to="/contact">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                  Réserver une salle
                </Button>
              </Link>
            </div>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              <p className="text-gray-500">Image des salles de réunion</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-6">Vous cherchez une solution adaptée à vos besoins ?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white px-8">
                  Nous contacter
                </Button>
              </Link>
              <Link to="/tarifs">
                <Button variant="outline" className="border-lysco-pink text-lysco-pink hover:bg-lysco-pink hover:text-white px-8">
                  Voir nos tarifs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EspacesTravail;
