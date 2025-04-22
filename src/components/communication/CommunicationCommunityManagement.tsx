// components/communication/CommunicationCommunityManagement.jsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationCommunityManagement = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Community Management</h2>
        <p className="text-gray-600 mb-4">
          Notre agence de communication 360° vous aidera à gérer au mieux votre présence sur les réseaux sociaux ! Elle vous aidera à bâtir et à fédérer une communauté autour de votre image de marque.
        </p>
        <p className="text-gray-600 mb-4">
          En quelques mots : votre communauté est vivante ! Elle se construit dans le temps ! Les Community manager tisseront des liens avec vos followers, encourageront des discussions. Aussi, Lys Conseil connaît toutes les ficelles pour créer du contenu engageant, répondre aux commentaires et aux messages des internautes. Vous bénéficierez donc d’une présence active sur Facebook, Instagram et autres plateformes de réseaux sociaux.
        </p>
        <p className="text-gray-600 mb-4">
          La réputation de votre entreprise est notre priorité ! Nous veillerons à ce que votre image de marque ne soit pas ternie par des commentaires négatifs ou à cause d’un problème potentiel. Notre but est la communication et l’engagement de votre communauté à travers de nombreux événements en ligne, la promotion de vos produits et bien plus encore. Nous serons bien sûr à l’affût des dernières tendances du moment ! Pour ce faire, nous opérerons une veille concurrentielle.
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

export default CommunicationCommunityManagement;
