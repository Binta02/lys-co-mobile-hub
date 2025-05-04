
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Lys&Co</h3>
            <p className="text-gray-600 mb-4">
              Des solutions de domiciliation et de communication pour entrepreneurs et entreprises.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/domiciliation" className="text-gray-600 hover:text-lysco-turquoise transition-colors">
                  Domiciliation commerciale
                </Link>
              </li>
              <li>
                <Link to="/services-admin" className="text-gray-600 hover:text-lysco-turquoise transition-colors">
                  Services administratifs
                </Link>
              </li>
              <li>
                <Link to="/communication" className="text-gray-600 hover:text-lysco-turquoise transition-colors">
                  Communication & Marketing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/espaces-travail" className="text-gray-600 hover:text-lysco-turquoise transition-colors">
                  Nos espaces de travail
                </Link>
              </li>
              <li>
                <Link to="/tarifs" className="text-gray-600 hover:text-lysco-turquoise transition-colors">
                  Nos Tarifs
                </Link>
              </li>
              <li>
                <Link to="/services-complementaires" className="text-gray-600 hover:text-lysco-turquoise transition-colors">
                  Nos Services Complémentaires
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600 mb-2">
              contact@lys-and-co.com
            </p>
            <p className="text-gray-600">
              +33 (0)1 23 45 67 89
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Lys&Co. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
