
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceProps {
  id: string;
  title: string;
  price: string;
  note?: string;
}

const services: ServiceProps[] = [
  {
    id: 'vtc-creation',
    title: 'Accompagnement création VTC – Driel',
    price: '900,00',
    note: '*hors coûts organismes'
  },
  {
    id: 'bank-account',
    title: 'Accompagnement ouverture de compte bancaire en ligne',
    price: '150,00'
  },
  {
    id: 'company-creation',
    title: 'Accompagnement ouverture de votre société',
    price: '600,00'
  },
  {
    id: 'micro-company',
    title: 'Accompagnement ouverture micro entreprise',
    price: '150,00'
  },
  {
    id: 'company-transfer',
    title: 'Accompagnement transfert de société',
    price: '600,00',
    note: '*hors coûts organismes'
  },
  {
    id: 'share-transfer',
    title: 'Cession de parts',
    price: '200,00'
  },
  {
    id: 'commercial-ad',
    title: "Création annonce commerciale pour site d'annonces",
    price: '15,00'
  },
  {
    id: 'quote-creation',
    title: 'Création devis ou service',
    price: '15,00'
  },
  {
    id: 'annual-accounts',
    title: 'Dépôt des comptes annuels',
    price: '300,00',
    note: '*hors coûts organismes'
  },
  {
    id: 'company-modification',
    title: 'Modification société',
    price: '900,00',
    note: '*hors coûts organismes'
  }
];

const AdminServiceOffers = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Services administratifs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-lysco-turquoise">{service.price} €</p>
                  {service.note && <p className="text-sm text-gray-500">{service.note}</p>}
                </div>
                <Link to={`/service/${service.id}`} className="w-full">
                  <Button className="mt-4 w-full flex items-center justify-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Ajouter au panier
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminServiceOffers;

