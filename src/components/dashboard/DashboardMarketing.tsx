
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DashboardMarketing = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Communication & Marketing</CardTitle>
          <CardDescription>Gérez votre présence en ligne et vos campagnes marketing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Réseaux sociaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Dernière publication: 22/04/2025
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Gérer les publications
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Site web</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Dernière mise à jour: 20/04/2025
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Modifier le site
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Prochaine newsletter: 01/05/2025
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Gérer la newsletter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques de communication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Réseaux sociaux</h4>
              <p className="text-2xl font-bold text-lysco-turquoise">1,234</p>
              <p className="text-sm text-gray-600">Abonnés</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Site web</h4>
              <p className="text-2xl font-bold text-lysco-pink">5,678</p>
              <p className="text-sm text-gray-600">Visites/mois</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Newsletter</h4>
              <p className="text-2xl font-bold text-lysco-turquoise">892</p>
              <p className="text-sm text-gray-600">Abonnés</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMarketing;
