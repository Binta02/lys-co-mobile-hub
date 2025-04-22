import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationPhotos = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Service Photos</h1>

        <div className="space-y-6 text-gray-700">
          <p>
            La satisfaction de ses clients est le leitmotiv de Lys Conseil. Être au plus proche de vos attentes et vous proposer des services de qualité au meilleur prix est l’une des devises phares de la société. Aussi, Lys Conseil souhaite vous proposer un service de photographie complet. Vous voulez soigner votre image au sens propre du terme ? Ou encore mettre en avant vos produits ? Alors faites confiance à Lys Conseil et son service photos. Vous pourrez vous mettre en valeur et assurer une mise en avant de vos produits afin de vous démarquer de la concurrence.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Service de portraits</h2>
          <p>
            Dans nos locaux ou directement chez vous, nous pourrons réaliser des portraits pour vos réseaux sociaux, vos cartes de visite. Du plan serré à la prise de vue en activité, vous aurez une image qui vous ressemble et qui vous met en valeur.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Photos de produits</h2>
          <p>
            Vos clients attendent de vous le meilleur. Pour mettre en avant la qualité de vos produits et susciter l’acte d’achat, il vous est essentiel d’avoir recours à des images qui apportent la preuve visuelle de l’intérêt de vos produits. Nous vous proposons donc de les mettre en avant pour vous en organisant une séance photo.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Tarifs</h2>
          <p>
            <strong>Sur devis</strong><br />
            <em>Prestations disponibles en Île-de-France, Guadeloupe et Orléans</em>
          </p>
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

export default CommunicationPhotos;
