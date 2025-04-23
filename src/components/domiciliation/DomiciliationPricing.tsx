
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const DomiciliationPricing = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Sociétés - Artisans - Commerçants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-3xl font-bold">36€<span className="text-base font-normal">/mois</span></p>
            <p className="text-sm text-gray-600">Pour un engagement de plus de 6 mois, bénéficiez de 50% de réduction sur votre premier trimestre.</p>
            <p className="font-medium text-green-600">Soit 18€ vos 3 premiers mois !</p>
            <Link to="/service/domiciliation-societe">
              <Button className="w-full flex items-center justify-center">
                Souscrire <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auto-Entrepreneurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-3xl font-bold">24€<span className="text-base font-normal">/mois</span></p>
            <p className="text-sm text-gray-600">Pour un engagement de plus de 6 mois, bénéficiez de 50% de réduction sur votre premier trimestre.</p>
            <p className="font-medium text-green-600">Soit 12€ vos 3 premiers mois !</p>
            <Link to="/service/domiciliation-auto-entrepreneur">
              <Button className="w-full flex items-center justify-center">
                Souscrire <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Associations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-3xl font-bold">15€<span className="text-base font-normal">/mois</span></p>
            <p className="text-sm text-gray-600">Tarif spécial pour les associations.</p>
            <Link to="/service/domiciliation-association">
              <Button className="w-full flex items-center justify-center">
                Souscrire <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomiciliationPricing;
