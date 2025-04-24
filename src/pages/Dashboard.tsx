
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardDomiciliation from '@/components/dashboard/DashboardDomiciliation';
import DashboardAdmin from '@/components/dashboard/DashboardAdmin';
import DashboardMarketing from '@/components/dashboard/DashboardMarketing';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue sur votre espace personnel Lys&Co</p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px] mb-8">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="domiciliation">Domiciliation</TabsTrigger>
            <TabsTrigger value="admin">Services admin</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>
          
          <TabsContent value="domiciliation">
            <DashboardDomiciliation />
          </TabsContent>
          
          <TabsContent value="admin">
            <DashboardAdmin />
          </TabsContent>
          
          <TabsContent value="marketing">
            <DashboardMarketing />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
