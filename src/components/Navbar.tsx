
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Erreur lors de la déconnexion', {
          description: error.message
        });
        return;
      }
      
      toast.success('Déconnexion réussie');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Une erreur inattendue est survenue');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-lysco-turquoise to-lysco-pink bg-clip-text text-transparent">
            Lys&Co
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-lysco-turquoise transition-colors">
            Accueil
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-lysco-turquoise transition-colors">
            Services
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-lysco-turquoise transition-colors">
            Contact
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white">
              Connexion
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-lysco-pink text-white hover:bg-opacity-90">
              Inscription
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-gray-700 hover:text-lysco-turquoise"
          >
            Déconnexion
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </nav>
  );
};

export default Navbar;
