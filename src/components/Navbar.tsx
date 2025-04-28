import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Session } from '@supabase/supabase-js';
import { CartDrawer } from "@/components/cart/CartDrawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Erreur lors de la déconnexion', { description: error.message });
    } else {
      toast.success('Déconnexion réussie');
      navigate('/login');
    }
  };

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

          {session && <CartDrawer />} {/* ✅ Affiche le panier uniquement si connecté */}

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5 text-lysco-turquoise" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white">
                Connexion
              </Button>
            </Link>
          )}
        </div>

        {/* <button
          className="md:hidden text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button> */}
        <button 
        className="md:hidden text-black"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen 
          ? <X size={24} className="text-black" />
          : <Menu size={24} className="text-black" />
        }
      </button>


      </div>

      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} session={session} />}
    </nav>
  );
};

export default Navbar;
