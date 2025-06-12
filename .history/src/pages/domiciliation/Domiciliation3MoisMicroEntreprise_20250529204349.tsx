import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, Star } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import ReviewForm from "@/components/services/ReviewForm";
import ReviewsList from "@/components/services/ReviewsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RelatedProducts from "@/components/services/RelatedProducts";

const Domiciliation3MoisMicroEntreprise = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const productName = "Domiciliation 3 mois – Micro Entreprise";
  const productId = "domiciliation-3mois-micro";

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_name", productName)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews(data || []);
      }
      setIsLoading(false);
    };

    fetchReviews();

    // Check auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCurrentUserId(session?.user?.id || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCurrentUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: "domiciliation-3mois-micro",
      title: "Domiciliation 3 mois – Micro Entreprise",
      price: 72.0,
      quantity: 1,
    });

    toast({
      title: "Produit ajouté au panier",
      description:
        "Domiciliation 3 mois – Micro Entreprise a été ajouté à votre panier.",
    });
  };

  const handleReviewSubmitted = () => {
    // Recharger les avis après l'ajout d'un nouvel avis
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_name", productName)
        .order("created_at", { ascending: false });

      if (!error) {
        setReviews(data || []);
      }
    };

    fetchReviews();
  };

  // Fonction pour supprimer un avis
  const handleDeleteReview = async (reviewId) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId)
        .eq("user_id", currentUserId); // S'assurer que l'utilisateur ne peut supprimer que ses propres avis

      if (error) throw error;

      toast({
        title: "Avis supprimé",
        description: "Votre avis a été supprimé avec succès",
      });

      // Recharger les avis après la suppression
      handleReviewSubmitted();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'avis",
        variant: "destructive",
      });
    }
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
                  Domiciliation 3 mois – Micro Entreprise
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
              <h1 className="text-3xl font-bold">
                Domiciliation 3 mois – Micro Entreprise
              </h1>
              <div>
                <span className="text-2xl font-semibold text-lysco-turquoise">
                  72,00 €
                </span>
                <p className="text-sm text-gray-500">Hors taxes</p>
              </div>

              <div className="prose max-w-none">
                <p>
                  Notre service de domiciliation pour micro-entreprise pendant 3
                  mois offre une adresse professionnelle prestigieuse pour les
                  entrepreneurs individuels et les petites entreprises. Avec
                  notre service, vous bénéficiez d'une adresse commerciale pour
                  votre activité, ainsi que de la réception et de la gestion de
                  votre courrier. Profitez de tous les avantages d'une adresse
                  professionnelle sans les coûts et les engagements à long
                  terme.
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
                    Se connecter pour ajouter au panier
                  </Button>
                )}
                <Link to="/demande-devis">
                  <Button variant="outline">Demander un devis</Button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <div className="prose">
                <p>
                  Notre service de domiciliation pour micro-entreprise pendant 3
                  mois est conçu pour répondre aux besoins spécifiques des
                  entrepreneurs individuels et des petites entreprises qui
                  recherchent une adresse professionnelle pour leur activité.
                </p>
                <p>
                  Avec notre service, vous bénéficiez d'une adresse prestigieuse
                  pour votre micro-entreprise pendant une période de 3 mois.
                  Cette adresse peut être utilisée sur vos documents officiels,
                  vos cartes de visite et votre correspondance professionnelle,
                  vous permettant de présenter une image professionnelle à vos
                  clients et partenaires.
                </p>
                <p>
                  En plus de l'adresse commerciale, notre service comprend la
                  réception et la gestion de votre courrier pendant la période
                  de domiciliation. Nous recevons votre courrier en votre nom et
                  pouvons vous le transférer selon vos instructions.
                </p>
                <p>
                  Profitez dès maintenant de notre service de domiciliation pour
                  micro-entreprise pendant 3 mois et donnez à votre activité une
                  image professionnelle et crédible sans les coûts et les
                  engagements à long terme.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">
                  Description complète
                </TabsTrigger>
                <TabsTrigger value="avis">Avis clients</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <ProductDescription />
                <RelatedProducts
                  currentId="domiciliation-3mois-entreprise"
                  currentCategory="domiciliation"
                />
              </TabsContent>

              <TabsContent value="avis">
                <div className="space-y-8 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">Avis clients</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-5 w-5 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {reviews.length} avis
                      </span>
                    </div>
                  </div>

                  {reviews.length > 0 && (
                    <ReviewsList
                      reviews={reviews}
                      isLoading={isLoading}
                      currentUserId={currentUserId}
                      onDeleteReview={handleDeleteReview}
                    />
                  )}

                  {session ? (
                    <ReviewForm
                      productName={productName}
                      productId={productId}
                      onReviewSubmitted={handleReviewSubmitted}
                    />
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                      <p className="mb-4">
                        Connectez-vous pour laisser un avis
                      </p>
                      <Link to="/login">
                        <Button>Se connecter</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="faq">
                <div className="space-y-4 py-4">
                  <h3 className="text-2xl font-semibold">
                    Questions fréquentes
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium">
                        Qu'est-ce qu'une domiciliation d'entreprise ?
                      </h4>
                      <p className="text-gray-600 mt-2">
                        La domiciliation d'entreprise est un service qui permet
                        à une entreprise d'établir son siège social à une
                        adresse différente de celle de son dirigeant. C'est une
                        solution idéale pour les entrepreneurs qui travaillent
                        depuis leur domicile mais souhaitent avoir une adresse
                        professionnelle.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium">
                        Quels documents sont nécessaires pour une domiciliation
                        ?
                      </h4>
                      <p className="text-gray-600 mt-2">
                        Pour une domiciliation, vous aurez besoin de votre pièce
                        d'identité, d'un justificatif de domicile personnel, et
                        des documents relatifs à votre entreprise (statuts,
                        extrait Kbis si disponible). Nous vous guidons tout au
                        long du processus.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium">
                        Puis-je renouveler mon contrat après les 3 mois ?
                      </h4>
                      <p className="text-gray-600 mt-2">
                        Absolument, vous pouvez renouveler votre contrat après
                        la période initiale de 3 mois. Nous proposons également
                        des offres pour 6 mois ou 1 an avec des tarifs
                        préférentiels pour les engagements plus longs.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Domiciliation3MoisMicroEntreprise;
