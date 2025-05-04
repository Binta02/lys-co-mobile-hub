
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

const Domiciliation3MoisEntreprise = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addItem({
      id: 'domiciliation-3mois-entreprise',
      title: 'Domiciliation 3 mois – Entreprise',
      price: 108.00,
      quantity: 1
    });

    toast({
      title: "Produit ajouté au panier",
      description: "Domiciliation 3 mois – Entreprise a été ajouté à votre panier.",
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
                <BreadcrumbLink to="">Domiciliation 3 mois – Entreprise</BreadcrumbLink>
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
              <h1 className="text-3xl font-bold">Domiciliation 3 mois – Entreprise</h1>
              <div>
                <span className="text-2xl font-semibold text-lysco-turquoise">108,00 €</span>
                <p className="text-sm text-gray-500">Hors taxes</p>
              </div>

              <div className="prose max-w-none">
                <p>Notre service de domiciliation pour société offre une adresse professionnelle prestigieuse pour les entreprises de différents types juridiques, y compris les SARL, SAS, EURL et SASU, sur une période de 3 mois. Avec notre service, vous bénéficiez d'une adresse commerciale de qualité et de la réception de votre courrier pendant la période de domiciliation. Profitez de la flexibilité et de la commodité de notre service de domiciliation pour gérer efficacement vos opérations commerciales pendant 3 mois.</p>
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
                <p>Notre service de domiciliation pour société est spécialement conçu pour répondre aux besoins des entreprises de différents types juridiques, y compris les SARL, SAS, EURL et SASU, leur offrant une adresse professionnelle prestigieuse pendant une période de 3 mois.</p>
                <p>Avec notre service, votre société bénéficie des avantages suivants pendant 3 mois :</p>
                <ul>
                  <li>Une adresse commerciale de qualité pour votre société, vous permettant de présenter une image professionnelle à vos clients, partenaires et autorités.</li>
                  <li>La réception et la gestion de votre courrier pendant la période de domiciliation, assurant que vous ne manquiez aucune communication importante pour votre entreprise.</li>
                </ul>
                <p>Que vous soyez une petite entreprise en démarrage ou une entreprise établie, notre service de domiciliation vous offre la flexibilité et la commodité nécessaires pour gérer efficacement vos opérations commerciales.</p>
                <p>Profitez dès maintenant de notre service de domiciliation pour société sur une période de 3 mois et donnez à votre entreprise une adresse professionnelle tout en bénéficiant d'une gestion pratique de votre courrier.</p>
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

export default Domiciliation3MoisEntreprise;
