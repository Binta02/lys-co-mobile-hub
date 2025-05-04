
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProductDescription = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState("Produit");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction pour charger les avis
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      if (!id) return;

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setReviews(data || []);
    } catch (error: any) {
      console.error('Erreur lors du chargement des avis:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les avis",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    checkAuthStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Charger les détails du produit et les avis
  useEffect(() => {
    if (id) {
      // On pourrait charger les détails du produit ici si nécessaire
      // Pour l'instant, on utilise juste l'ID comme nom
      setProductName(id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
      
      fetchReviews();
    }
  }, [id]);

  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  return (
    <div className="mt-16">
      <Tabs defaultValue="description" className="space-y-4">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">
            Avis ({reviews.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="description">
          <Card>
            <CardContent className="prose max-w-none p-6">
              <h3>Description</h3>
              <p>Notre service d'accompagnement pour l'ouverture de votre société VTC est spécialement conçu pour simplifier le processus de création et de lancement de votre entreprise de transport avec chauffeur. En partenariat avec notre expert-comptable spécialisé dans le domaine, nous vous offrons une assistance professionnelle et personnalisée à chaque étape du processus, garantissant une démarche efficace et conforme à toutes les exigences réglementaires.</p>
              <p>Nous comprenons que le démarrage d'une entreprise VTC peut être complexe, avec de nombreuses démarches administratives et juridiques à suivre. C'est pourquoi notre équipe dédiée est là pour vous guider à travers toutes les étapes, depuis l'enregistrement de votre société jusqu'à l'obtention des licences et des permis nécessaires. Notre objectif est de vous offrir une assistance complète et de qualité, vous permettant de lancer votre entreprise avec confiance et succès.</p>
              <p>De plus, pour rendre nos services encore plus accessibles, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous. Cette réduction s'applique en plus des frais de service hors frais d'organisme, ce qui vous permet de bénéficier d'un accompagnement professionnel à un tarif avantageux.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6">
              <ReviewsList reviews={reviews} isLoading={isLoading} />
              
              {isLoggedIn ? (
                <div className="mt-8 border-t pt-6">
                  <ReviewForm 
                    productName={productName} 
                    onReviewSubmitted={handleReviewSubmitted} 
                  />
                </div>
              ) : (
                <div className="mt-8 border-t pt-6 text-center">
                  <p className="text-gray-600">Vous devez être connecté pour laisser un avis.</p>
                  <Button 
                    className="mt-4 bg-lysco-turquoise hover:bg-lysco-turquoise/90" 
                    asChild
                  >
                    <Link to="/login?redirect=back">Se connecter</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDescription;
