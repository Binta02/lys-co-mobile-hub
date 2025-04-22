import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunicationSiteInternet = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Site Internet</h1>

        <div className="space-y-6 text-gray-700">
          <p>
            Un site internet est comparable à une vitrine d’une enseigne. Plus cette vitrine est attrayante, plus le potentiel acheteur se rend sur le site. Lys Conseil conçoit des sites internet avec un bon UX Design, adaptés à tous les terminaux et optimisés pour le SEO.
          </p>

          <p>
            Nous travaillons ensemble sur un site internet avec un bon UX Design, pour une bonne expérience client. En fonction de votre activité, il pourra s’agir soit d’un site e-commerce (avec différents produits ou services) ou d’un site vitrine. Bien sûr, nous ferons en sorte que le site soit responsive, c’est-à-dire adapté à l’ensemble des terminaux ou interfaces (ordinateurs, tablette, téléphone). Aussi, afin que votre site soit référencé sur les moteurs de recherche comme Google, nous rédigerons du contenu optimisé pour le SEO (référencement naturel). Vous l’aurez compris, un site internet est un travail de longue haleine. Confiez votre nouveau site internet ou la refonte de ce dernier aux mains de Lys Conseil.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Création site vitrine */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Création site vitrine</h3>
            <p className="text-gray-600 mb-2">
              Son but est de présenter vos services. Un site avec peu de pages, mais des pages percutantes, efficaces pour donner envie à vos prospects.
            </p>
            <p className="text-gray-600 font-medium">À partir de 1000 euros</p>
          </div>

          {/* Création site e-commerce */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Création site e-commerce</h3>
            <p className="text-gray-600 mb-2">
              Un site plus élaboré avec plus de pages et le catalogue de tous vos produits. Avec ou sans boutique selon vos besoins et votre budget.
            </p>
            <p className="text-gray-600 font-medium">À partir de 1500 euros</p>
          </div>

          {/* Refonte et référencement naturel */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Refonte et référencement naturel</h3>
            <p className="text-gray-600 mb-2">
              Votre site est fait mais pas bien visible. L’UX Design n’est pas bien travaillé, ou le référencement pas fait. Nous pouvons travailler cela.
            </p>
            <p className="text-gray-600 font-medium">À partir de 50 euros de l’heure</p>
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

export default CommunicationSiteInternet;
