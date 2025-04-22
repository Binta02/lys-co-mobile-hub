
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Mail, Bell, FileText, MessageCircle } from 'lucide-react';

const DashboardOverview = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Home className="mr-2 h-5 w-5 text-lysco-turquoise" />
              Domiciliation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Statut: <span className="font-medium text-green-600">Actif</span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Adresse: 14 Avenue de l'Opéra, 75001 Paris
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/domiciliation">Gérer la domiciliation</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Mail className="mr-2 h-5 w-5 text-lysco-pink" />
              Courrier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Nouveaux courriers: <span className="font-medium">5</span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Dernière réception: <span className="font-medium">23/04/2025</span>
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Gérer le courrier
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="mr-2 h-5 w-5 text-lysco-turquoise" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Vous avez <span className="font-medium">3</span> nouvelles notifications
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Voir les notifications
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="w-8 h-8 rounded-full bg-lysco-turquoise/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-lysco-turquoise" />
              </div>
              <div>
                <p className="font-medium">Nouveau courrier reçu</p>
                <p className="text-sm text-gray-600">Impôts - Déclaration TVA</p>
                <p className="text-xs text-gray-500">Aujourd'hui, 11:30</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="w-8 h-8 rounded-full bg-lysco-pink/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-lysco-pink" />
              </div>
              <div>
                <p className="font-medium">Document numérisé</p>
                <p className="text-sm text-gray-600">Contrat_Prestation_2025.pdf</p>
                <p className="text-xs text-gray-500">Hier, 15:20</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-lysco-turquoise/10 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-lysco-turquoise" />
              </div>
              <div>
                <p className="font-medium">Message de votre assistant</p>
                <p className="text-sm text-gray-600">Mise à jour de vos documents légaux</p>
                <p className="text-xs text-gray-500">22/04/2025, 09:45</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardOverview;
