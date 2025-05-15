
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ClipboardCheck, Receipt, Calculator, BookOpen, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminServiceOffers = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Nos Services Administratifs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des solutions complètes pour la gestion administrative de votre entreprise, adaptées à vos besoins spécifiques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-lysco-turquoise" />
              </div>
              <CardTitle>Formalités de création</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Accompagnement complet dans toutes les démarches administratives pour la création de votre entreprise, du choix du statut juridique au dépôt de dossier.
              </CardDescription>
              <Link to="/service/formalites-creation">
                <Button variant="outline" className="w-full border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white">
                  En savoir plus
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-lysco-pink/10 flex items-center justify-center mb-4">
                <ClipboardCheck className="h-6 w-6 text-lysco-pink" />
              </div>
              <CardTitle>Assistance administrative</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Gestion quotidienne de vos tâches administratives : courriers, factures, devis, relances clients et fournisseurs, classement et archivage de documents.
              </CardDescription>
              <Link to="/service/assistance-administrative">
                <Button variant="outline" className="w-full border-lysco-pink text-lysco-pink hover:bg-lysco-pink hover:text-white">
                  En savoir plus
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
                <Receipt className="h-6 w-6 text-lysco-turquoise" />
              </div>
              <CardTitle>Facturation et devis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Création et gestion professionnelle de vos factures et devis, suivi des paiements et relances clients pour optimiser votre trésorerie.
              </CardDescription>
              <Link to="/service/facturation-devis">
                <Button variant="outline" className="w-full border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white">
                  En savoir plus
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-lysco-pink/10 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-lysco-pink" />
              </div>
              <CardTitle>Comptabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Tenue de votre comptabilité, préparation des déclarations fiscales et sociales, et accompagnement par notre expert-comptable partenaire.
              </CardDescription>
              <Link to="/service/comptabilite">
                <Button variant="outline" className="w-full border-lysco-pink text-lysco-pink hover:bg-lysco-pink hover:text-white">
                  En savoir plus
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-lysco-turquoise/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-lysco-turquoise" />
              </div>
              <CardTitle>Secrétariat juridique</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Gestion complète de vos obligations juridiques : tenue des registres légaux, préparation des assemblées générales et rédaction des procès-verbaux.
              </CardDescription>
              <Link to="/service/secretariat-juridique">
                <Button variant="outline" className="w-full border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white">
                  En savoir plus
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-lysco-pink/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-lysco-pink" />
              </div>
              <CardTitle>Modifications statutaires</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Accompagnement pour toutes modifications de votre structure : changement d'adresse, de dirigeants, augmentation de capital ou cession de parts.
              </CardDescription>
              <Link to="/service/modifications-statutaires">
                <Button variant="outline" className="w-full border-lysco-pink text-lysco-pink hover:bg-lysco-pink hover:text-white">
                  En savoir plus
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdminServiceOffers;
