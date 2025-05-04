
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProductDescription = () => {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Fonction pour déterminer le nom et l'ID du produit en fonction de l'URL
  const determineProductInfo = () => {
    const path = location.pathname;
    let name = '';
    let id = '';
    
    if (path.includes('/domiciliation/3-mois-entreprise')) {
      name = 'Domiciliation 3 mois – Entreprise';
      id = 'domiciliation-3mois-entreprise';
    } else if (path.includes('/domiciliation/3-mois-micro-entreprise')) {
      name = 'Domiciliation 3 mois – Micro Entreprise';
      id = 'domiciliation-3mois-micro';
    } else if (path.includes('/domiciliation/6-mois-entreprise')) {
      name = 'Domiciliation 6 mois – Entreprise';
      id = 'domiciliation-6mois-entreprise';
    } else if (path.includes('/domiciliation/6-mois-micro-entreprise')) {
      name = 'Domiciliation 6 mois – Micro Entreprise';
      id = 'domiciliation-6mois-micro';
    } else if (path.includes('/domiciliation/1-an-entreprise')) {
      name = 'Domiciliation 1 an – Entreprise';
      id = 'domiciliation-1an-entreprise';
    } else if (path.includes('/domiciliation/pack-domicilie')) {
      name = 'Pack domicilié';
      id = 'pack-domicilie';
    } else {
      // Fallback pour les autres pages
      const pathParts = path.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      name = lastPart.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      id = lastPart;
    }
    
    return { name, id };
  };

  // Fonction pour charger les avis
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const { name, id } = determineProductInfo();
      
      if (!id) return;

      // First, fetch reviews without joining profiles
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Then for each review, fetch the profile separately if needed
      const formattedReviews = await Promise.all(data.map(async (review) => {
        let userName = 'Client';
        
        if (review.user_id) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', review.user_id)
            .single();
          
          if (!profileError && profileData) {
            const firstName = profileData.first_name || '';
            const lastName = profileData.last_name || '';
            if (firstName || lastName) {
              userName = `${firstName} ${lastName}`.trim();
            }
          }
        }
        
        return {
          ...review,
          user_name: userName
        };
      }));
      
      setReviews(formattedReviews);
    } catch (error) {
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
    const { name, id } = determineProductInfo();
    setProductName(name);
    setProductId(id);
    
    fetchReviews();
  }, [location.pathname]);

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
              <p>Notre service d'accompagnement pour l'ouverture de votre société est spécialement conçu pour simplifier le processus de création et de lancement de votre entreprise. En partenariat avec notre expert-comptable spécialisé dans le domaine, nous vous offrons une assistance professionnelle et personnalisée à chaque étape du processus, garantissant une démarche efficace et conforme à toutes les exigences réglementaires.</p>
              <p>Nous comprenons que le démarrage d'une entreprise peut être complexe, avec de nombreuses démarches administratives et juridiques à suivre. C'est pourquoi notre équipe dédiée est là pour vous guider à travers toutes les étapes, depuis l'enregistrement de votre société jusqu'à l'obtention des licences et des permis nécessaires. Notre objectif est de vous offrir une assistance complète et de qualité, vous permettant de lancer votre entreprise avec confiance et succès.</p>
              <p>De plus, pour rendre nos services encore plus accessibles, nous offrons des options de domiciliation pour votre entreprise, vous permettant d'établir une adresse professionnelle prestigieuse sans les coûts d'un espace commercial traditionnel.</p>
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
                    productId={productId} 
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
                    <Link to={`/login?redirect=${encodeURIComponent(location.pathname)}`}>Se connecter</Link>
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
