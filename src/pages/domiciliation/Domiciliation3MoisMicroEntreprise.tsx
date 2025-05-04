
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProductDescription from '@/components/services/ProductDescription';

const Domiciliation3MoisMicroEntreprise = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addItem({
      id: 'domiciliation-3mois-micro',
      title: 'Domiciliation 3 mois – Micro Entreprise',
      price: 72.00,
      quantity: 1
    });

    toast({
      title: "Produit ajouté au panier",
      description: "Domiciliation 3 mois – Micro Entreprise a été ajouté à votre panier.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="/domiciliation">Domiciliation</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="">Domiciliation 3 mois – Micro Entreprise</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8">
            <Link to="/domiciliation" className="flex items-center text-lysco-turquoise hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" /> Retour aux services de domiciliation
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Domiciliation 3 mois – Micro Entreprise</h1>
              <div>
                <span className="text-2xl font-semibold text-lysco-turquoise">72,00 €</span>
                <p className="text-sm text-gray-500">Hors taxes</p>
              </div>

              <div className="prose max-w-none">
                <p>Notre service de domiciliation pour micro-entreprise pendant 3 mois offre une adresse professionnelle prestigieuse pour les entrepreneurs individuels et les petites entreprises. Avec notre service, vous bénéficiez d'une adresse commerciale pour votre activité, ainsi que de la réception et de la gestion de votre courrier. Profitez de tous les avantages d'une adresse professionnelle sans les coûts et les engagements à long terme.</p>
              </div>

              <div className="flex space-x-4">
                <Button 
                  className="bg-lysco-turquoise hover:bg-opacity-90 flex items-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter au panier
                </Button>
                <Link to="/demande-devis">
                  <Button variant="outline">
                    Demander un devis
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <div className="prose">
                <p>Notre service de domiciliation pour micro-entreprise pendant 3 mois est conçu pour répondre aux besoins spécifiques des entrepreneurs individuels et des petites entreprises qui recherchent une adresse professionnelle pour leur activité.</p>
                <p>Avec notre service, vous bénéficiez d'une adresse prestigieuse pour votre micro-entreprise pendant une période de 3 mois. Cette adresse peut être utilisée sur vos documents officiels, vos cartes de visite et votre correspondance professionnelle, vous permettant de présenter une image professionnelle à vos clients et partenaires.</p>
                <p>En plus de l'adresse commerciale, notre service comprend la réception et la gestion de votre courrier pendant la période de domiciliation. Nous recevons votre courrier en votre nom et pouvons vous le transférer selon vos instructions.</p>
                <p>Profitez dès maintenant de notre service de domiciliation pour micro-entreprise pendant 3 mois et donnez à votre activité une image professionnelle et crédible sans les coûts et les engagements à long terme.</p>
              </div>
            </div>
          </div>

          <ProductDescription />
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Domiciliation3MoisMicroEntreprise;
