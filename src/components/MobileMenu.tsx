import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
interface MobileMenuProps {
  onClose: () => void;
}
const MobileMenu: React.FC<MobileMenuProps> = ({
  onClose
}) => {
  return <div className="md:hidden fixed inset-0 z-50 bg-white animate-fade-in" onClick={onClose}>
      <div className="container mx-auto px-4 py-6 flex flex-col space-y-6 bg-slate-50">
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
            <Button className="w-full bg-lysco-pink text-white hover:bg-opacity-90">
              Inscription
            </Button>
          </Link>
        </div>
      </div>
    </div>;
};
export default MobileMenu;