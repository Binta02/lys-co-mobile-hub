import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
interface MobileMenuProps {
  onClose: () => void;
}
const MobileMenu: React.FC<MobileMenuProps> = ({
  onClose
}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const {
        error
      } = await supabase.auth.signOut();
      if (error) {
        toast.error('Erreur lors de la déconnexion', {
          description: error.message
        });
        return;
      }
      toast.success('Déconnexion réussie');
      navigate('/login');
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Une erreur inattendue est survenue');
    }
  };
  return <div className="md:hidden fixed inset-0 z-50 bg-white animate-fade-in" onClick={onClose}>
      <div className="container mx-auto px-4 py-6 flex flex-col space-y-6 bg-white">
        <Link to="/" className="text-lg font-medium text-gray-700 hover:text-lysco-turquoise py-2" onClick={onClose}>
          Accueil
        </Link>
        <Link to="/services" className="text-lg font-medium text-gray-700 hover:text-lysco-turquoise py-2" onClick={onClose}>
          Services
        </Link>
        <Link to="/contact" className="text-lg font-medium text-gray-700 hover:text-lysco-turquoise py-2" onClick={onClose}>
          Contact
        </Link>
        <div className="flex flex-col space-y-3 pt-4">
          <Link to="/login" onClick={onClose}>
            <Button variant="outline" className="w-full border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white">
              Connexion
            </Button>
          </Link>
          <Link to="/register" onClick={onClose}>
            
          </Link>
          <Button variant="ghost" onClick={handleLogout} className="w-full text-gray-700 hover:text-lysco-turquoise">
            Déconnexion
          </Button>
        </div>
      </div>
    </div>;
};
export default MobileMenu;