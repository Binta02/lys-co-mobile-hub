
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Mail, FileText, MessageCircle, Bell } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue sur votre espace personnel Lys&Co</p>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="domiciliation">Domiciliation</TabsTrigger>
            <TabsTrigger value="admin">Services admin</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
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
                    Adresse: 123 Avenue des Affaires, 75001 Paris
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Gérer
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
                    Nouveaux courriers: <span className="font-medium">3</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Dernière réception: <span className="font-medium">23/04/2025</span>
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Voir les courriers
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
                    Vous avez <span className="font-medium">2</span> nouvelles notifications
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Voir toutes les notifications
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Historique de vos actions et notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="w-8 h-8 rounded-full bg-lysco-turquoise/10 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-lysco-turquoise" />
                    </div>
                    <div>
                      <p className="font-medium">Nouveau courrier reçu</p>
                      <p className="text-sm text-gray-600">Expéditeur: URSSAF</p>
                      <p className="text-xs text-gray-500">Aujourd'hui, 10:23</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="w-8 h-8 rounded-full bg-lysco-pink/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-lysco-pink" />
                    </div>
                    <div>
                      <p className="font-medium">Document numérisé</p>
                      <p className="text-sm text-gray-600">Facture_EDF_Avril2025.pdf</p>
                      <p className="text-xs text-gray-500">Hier, 16:45</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-lysco-turquoise/10 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-lysco-turquoise" />
                    </div>
                    <div>
                      <p className="font-medium">Nouveau message</p>
                      <p className="text-sm text-gray-600">De: Service client Lys&Co</p>
                      <p className="text-xs text-gray-500">20/04/2025, 14:30</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="domiciliation">
            <Card>
              <CardHeader>
                <CardTitle>Domiciliation commerciale</CardTitle>
                <CardDescription>Gérez votre adresse commerciale et vos services de domiciliation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Contenu de la section domiciliation à venir...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Services administratifs</CardTitle>
                <CardDescription>Gestion de vos documents et tâches administratives</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Contenu de la section services administratifs à venir...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="marketing">
            <Card>
              <CardHeader>
                <CardTitle>Communication & Marketing</CardTitle>
                <CardDescription>Gérez vos campagnes et stratégies de communication</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Contenu de la section marketing à venir...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
                <CardDescription>Gérez les informations de votre compte et vos préférences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Contenu de la section paramètres à venir...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
