import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductDescription from "@/components/services/ProductDescription";
import RelatedProducts from "@/components/services/RelatedProducts";

const Domiciliation6MoisEntreprise = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: "domiciliation-6mois-entreprise",
      title: "Domiciliation 6 mois – Entreprise",
      price: 162.0,
      quantity: 1,
    });

    toast({
      title: "Produit ajouté au panier",
      description:
        "Domiciliation 6 mois – Entreprise a été ajouté à votre panier.",
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
                <BreadcrumbLink to="/domiciliation">
                  Domiciliation
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="">
                  Domiciliation 6 mois – Entreprise
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8">
            <Link
              to="/domiciliation"
              className="flex items-center text-lysco-turquoise hover:underline"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Retour aux services de
              domiciliation
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                Promo !
              </div>
              <h1 className="text-3xl font-bold">
                Domiciliation 6 mois – Entreprise
              </h1>
              <div>
                <div className="flex items-center">
                  <span className="text-lg line-through text-gray-500 mr-2">
                    216,00 €
                  </span>
                  <span className="text-2xl font-semibold text-lysco-turquoise">
                    162,00 €
                  </span>
                </div>
                <p className="text-sm text-gray-500">Hors taxes</p>
              </div>

              <div className="prose max-w-none">
                <p>
                  Notre offre spéciale de domiciliation d'entreprise vous permet
                  de bénéficier d'une réduction exceptionnelle sur les frais de
                  domiciliation pour les 6 premiers mois. Jusqu'au 30 Septembre,
                  vous pouvez profiter d'une réduction de 50% sur les 3 premiers
                  mois de domiciliation lorsque vous vous engagez pour une
                  période de 6 mois. C'est une occasion à ne pas manquer pour
                  économiser sur les frais tout en bénéficiant d'une adresse
                  professionnelle prestigieuse pour votre entreprise.
                </p>
              </div>

              <div className="flex space-x-4">
                {/* <Button 
                  className="bg-lysco-turquoise hover:bg-opacity-90 flex items-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter au panier
                </Button> */}
                {session ? (
                  <Button
                    className="bg-lysco-turquoise hover:bg-opacity-90 flex items-center"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter au panier
                  </Button>
                ) : (
                  <Button
                    className="bg-gray-400 flex items-center"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Connectez-vous
                  </Button>
                )}
                <Link to="/demande-devis">
                  <Button variant="outline">Devis</Button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <div className="prose">
                <p>
                  Profitez de notre offre exclusive de domiciliation
                  d'entreprise avec une promotion spéciale sur les premiers 6
                  mois! Nous vous offrons une réduction exceptionnelle sur les
                  frais de domiciliation jusqu'au 30 Septembre, vous permettant
                  de bénéficier d'un avantage financier significatif tout en
                  profitant de nos services de qualité.
                </p>
                <p>
                  Avec cette promotion, vous bénéficierez d'une réduction de 50%
                  sur les 3 premiers mois de domiciliation lorsque vous vous
                  engagez pour une période de 6 mois. C'est une opportunité
                  unique pour vous d'économiser sur les frais de domiciliation
                  tout en bénéficiant d'une adresse professionnelle prestigieuse
                  pour votre entreprise.
                </p>
                <p>
                  Profitez dès maintenant de cette offre spéciale et donnez à
                  votre entreprise une image professionnelle et crédible avec
                  notre service de domiciliation de qualité supérieure.
                </p>
              </div>
            </div>
          </div>
          <ProductDescription />
          <RelatedProducts
            currentId="domiciliation-6mois-entreprise"
            currentCategory="domiciliation"
          />
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Domiciliation6MoisEntreprise;
