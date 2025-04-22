import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationCommunityManagement = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Community Management</h1>

        <div className="space-y-6 text-gray-700">
          <p>
            Notre agence de communication 360° vous aidera à gérer au mieux votre présence sur les réseaux sociaux ! Elle vous aidera à bâtir et à fédérer une communauté autour de votre image de marque.
          </p>

          <p>
            En quelques mots : votre communauté est vivante ! Elle se construit dans le temps ! Les Community manager tisseront des liens avec vos followers, encourageront des discussions. Aussi, Lys Conseil connaît toutes les ficelles pour créer du contenu engageant, répondre aux commentaires et aux messages des internautes. Vous bénéficierez donc d’une présence active sur Facebook, Instagram et autres plateformes de réseaux sociaux.
          </p>

          <p>
            La réputation de votre entreprise est notre priorité ! Nous veillerons à ce que votre image de marque ne soit pas ternie par des commentaires négatifs ou à cause d’un problème potentiel. Notre but est la communication et l’engagement de votre communauté à travers de nombreux événements en ligne, la promotion de vos produits et bien plus encore. Nous serons bien sûr à l’affût des dernières tendances du moment ! Pour ce faire, nous opérerons une veille concurrentielle.
          </p>

          <p>
            Pour finir, vos campagnes seront examinées au millimètre avec des outils d’analyse puissants qui ont prouvé leur efficacité.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Création de pages réseaux */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Création de pages réseaux</h3>
            <p className="text-gray-600 mb-2">
              Création de pages de vos réseaux sociaux. Nous verrons ensemble les réseaux les plus adéquats pour vous. Des pages vendeuses à vos images. Des pages pensées pour vous.
            </p>
            <p className="text-gray-600 font-medium">À partir de 99 euros la page</p>
          </div>

          {/* Gestion des pages réseaux */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Gestion des pages réseaux</h3>
            <p className="text-gray-600 mb-2">
              Vos pages sont déjà créées, vous n’avez pas le temps ou l’envie de gérer vos pages. Vous ne savez pas comment fédérer une communauté. On s’en occupe.
            </p>
            <p className="text-gray-600 font-medium">Sur devis</p>
          </div>

          {/* Refonte des pages réseaux */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Refonte des pages réseaux</h3>
            <p className="text-gray-600 mb-2">
              Vos pages sont déjà créées, mais ne sont pas regardées. Nous les retravaillons pour changer cela.
            </p>
            <p className="text-gray-600 font-medium">À partir de 99 euros la page</p>
          </div>

          {/* Création de page Google */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Création de page Google</h3>
            <p className="text-gray-600 mb-2">
              Google Business notre chouchou. C’est un incontournable pour votre visibilité. On vous crée votre page pour être bien visible et donner envie de vous joindre.
            </p>
            <p className="text-gray-600 font-medium">À partir de 99 euros la page</p>
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

export default CommunicationCommunityManagement;
