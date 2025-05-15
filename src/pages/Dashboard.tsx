
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardDomiciliation from '@/components/dashboard/DashboardDomiciliation';
import DashboardAdmin from '@/components/dashboard/DashboardAdmin';
import DashboardMarketing from '@/components/dashboard/DashboardMarketing';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Accès non autorisé",
            description: "Veuillez vous connecter pour accéder à votre tableau de bord",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }
        
        setUser(session.user);
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/login');
        } else if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lysco-turquoise"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue sur votre espace personnel Lys&Co, {user?.user_metadata?.first_name || user?.email}</p>
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
