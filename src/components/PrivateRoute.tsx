
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Accès non autorisé", {
          description: "Veuillez vous connecter pour accéder à cette page"
        });
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
