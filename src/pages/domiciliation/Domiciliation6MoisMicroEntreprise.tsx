
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

const Domiciliation6MoisMicroEntreprise = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addItem({
      id: 'domiciliation-6mois-micro',
      title: 'Domiciliation 6 mois – Micro Entreprise',
      price: 108.00,
      quantity: 1
    });

    toast({
      title: "Produit ajouté au panier",
      description: "Domiciliation 6 mois – Micro Entreprise a été ajouté à votre panier.",
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
                <BreadcrumbLink>Domiciliation 6 mois – Micro Entreprise</BreadcrumbLink>
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
              <h1 className="text-3xl font-bold">Domiciliation 6 mois – Micro Entreprise</h1>
              <div>
                <div className="flex items-center">
                  <span className="text-lg line-through text-gray-500 mr-2">144,00 €</span>
                  <span className="text-2xl font-semibold text-lysco-turquoise">108,00 €</span>
                </div>
                <p className="text-sm text-gray-500">Hors taxes</p>
              </div>

              <div className="prose max-w-none">
                <p>Notre offre spéciale de domiciliation pour micro-entreprise sur 6 mois vous offre une adresse commerciale professionnelle et des économies sur les frais de domiciliation. Vous bénéficiez de 3 premiers mois de domiciliation, suivis de 3 mois supplémentaires à moins 50%. Profitez de tous les avantages d'une adresse professionnelle pour votre entreprise tout en réalisant des économies substantielles sur les frais de domiciliation.</p>
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
                <p>Profitez de notre offre spéciale de domiciliation pour micro-entreprise sur une période de 6 mois, avec des avantages financiers exceptionnels pour vous aider à démarrer votre activité en toute tranquillité d'esprit.</p>
                <p>Avec notre service, vous bénéficiez de :</p>
                <ul>
                  <li>3 mois de domiciliation pour votre micro-entreprise, avec une adresse professionnelle prestigieuse pour vos activités commerciales.</li>
                  <li>Les 3 mois suivants à moins 50%, vous permettant de bénéficier d'une réduction significative sur les frais de domiciliation.</li>
                </ul>
                <p>Cette offre exclusive vous offre non seulement une adresse commerciale professionnelle pour votre entreprise, mais vous permet également de réaliser des économies substantielles sur les frais de domiciliation pour les 6 premiers mois.</p>
                <p>Profitez dès maintenant de notre service de domiciliation pour micro-entreprise sur une période de 6 mois et donnez à votre entreprise une image professionnelle sans compromettre votre budget.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Domiciliation6MoisMicroEntreprise;
