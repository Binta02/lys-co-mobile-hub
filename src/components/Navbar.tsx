
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Session } from '@supabase/supabase-js';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
          <Link to="/domiciliation" className="text-gray-700 hover:text-lysco-turquoise transition-colors">
            Domiciliation
          </Link>
          <Link to="/services-admin" className="text-gray-700 hover:text-lysco-turquoise transition-colors">
            Services Admin
          </Link>
          <Link to="/communication" className="text-gray-700 hover:text-lysco-turquoise transition-colors">
            Communication
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-lysco-turquoise transition-colors">
            Contact
          </Link>
          
          {session ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" className="border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-gray-700 hover:text-lysco-turquoise"
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white">
                Connexion
              </Button>
            </Link>
          )}
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
      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} session={session} />}
    </nav>
  );
};

export default Navbar;
