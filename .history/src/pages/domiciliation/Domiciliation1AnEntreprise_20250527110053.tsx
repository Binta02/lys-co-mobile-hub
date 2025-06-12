
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

const Domiciliation1AnEntreprise = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addItem({
      id: 'domiciliation-1an-entreprise',
      title: 'Domiciliation 1 an – Entreprise',
      price: 361.80,
      quantity: 1
    });

    toast({
      title: "Produit ajouté au panier",
      description: "Domiciliation 1 an – Entreprise a été ajouté à votre panier.",
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
                <BreadcrumbLink to="">Domiciliation 1 an – Entreprise</BreadcrumbLink>
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
              <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                Promo !
              </div>
              <h1 className="text-3xl font-bold">Domiciliation 1 an – Entreprise</h1>
              <div>
                <div className="flex items-center">
                  <span className="text-lg line-through text-gray-500 mr-2">432,00 €</span>
                  <span className="text-2xl font-semibold text-lysco-turquoise">361,80 €</span>
                </div>
                <p className="text-sm text-gray-500">Hors taxes</p>
              </div>

              <div className="prose max-w-none">
                <p>Notre offre spéciale de domiciliation annuelle vous permet de bénéficier de réductions sur les frais pour toute la durée de votre engagement. Avec une réservation d'un an, vous bénéficiez d'une réduction de 50% sur les frais des 3 premiers mois, suivie d'une réduction supplémentaire de 5% sur les frais pour les 9 mois suivants. Cette offre vous permet d'économiser sur vos frais de domiciliation tout en bénéficiant d'une adresse professionnelle prestigieuse pour votre entreprise.</p>
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
                <p>Profitez de notre offre spéciale de domiciliation pour une réservation d'un an et économisez sur vos frais pendant toute la durée de votre engagement!</p>
                <p>En réservant notre service de domiciliation pour une période d'un an, vous bénéficiez d'une réduction exceptionnelle :</p>
                <ul>
                  <li>50% de réduction sur les frais des 3 premiers mois</li>
                  <li>5% de réduction sur les frais des 9 mois suivants</li>
                </ul>
                <p>Cette offre exclusive vous permet d'économiser dès le début de votre engagement, avec une réduction significative sur les 3 premiers mois. En plus, vous continuez à bénéficier d'une réduction supplémentaire de 5% sur les frais pour les 9 mois restants, ce qui représente une économie sur toute l'année.</p>
                <p>Profitez dès maintenant de cette offre spéciale et donnez à votre entreprise une adresse prestigieuse tout en réalisant des économies sur vos frais de domiciliation.</p>
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

export default Domiciliation1AnEntreprise;
