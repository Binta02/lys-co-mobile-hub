
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

const PackDomicilie = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addItem({
      id: 'pack-domicilie',
      title: 'Pack domicilié',
      price: 1514.00,
      quantity: 1
    });

    toast({
      title: "Produit ajouté au panier",
      description: "Pack domicilié a été ajouté à votre panier.",
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
                <BreadcrumbLink to="">Pack domicilié</BreadcrumbLink>
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
              <h1 className="text-3xl font-bold">Pack domicilié</h1>
              <div>
                <span className="text-2xl font-semibold text-lysco-turquoise">1514,00 €</span>
                <p className="text-sm text-gray-500">Hors taxes</p>
              </div>

              <div className="prose max-w-none">
                <p>Notre Pack pour Nouveaux Domiciliés est une solution complète et clé en main destinée aux entreprises naissantes, incluant un site internet personnalisé (hors hébergement), 100 cartes de visite professionnelles, la création de pages sur Instagram et LinkedIn, et 3 mois de domiciliation gratuite pour un engagement de six mois. Ce pack offre tout le nécessaire pour établir efficacement la présence en ligne et physique de votre société, favorisant ainsi un démarrage réussi et professionnel.</p>
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
                <p>Découvrez notre Pack Exclusif dédié aux Nouveaux Domiciliés, conçu spécifiquement pour offrir à votre entreprise un démarrage sur les chapeaux de roues. Ce pack complet englobe tout ce dont vous avez besoin pour établir une présence solide et professionnelle dès le début.</p>
                <p>Contenu du Pack pour Nouveaux Domiciliés :</p>
                <ul>
                  <li><strong>Site Internet sur Mesure :</strong> Lancez-vous en ligne avec un site internet personnalisé, prêt à captiver vos clients (hébergement non inclus). Notre équipe se charge de la conception, vous offrant une vitrine professionnelle sur le web.</li>
                  <li><strong>Cartes de Visite Professionnelles :</strong> Faites bonne impression dès le premier contact avec 100 cartes de visite haut de gamme, conçues sur mesure pour refléter l'identité de votre marque.</li>
                  <li><strong>Présence sur les Réseaux Sociaux :</strong> Établissez votre marque sur les plateformes clés avec la création de pages Instagram et LinkedIn. Nous vous aidons à construire votre réseau et à engager votre audience dès le départ.</li>
                  <li><strong>3 Mois de Domiciliation Gratuite :</strong> Pour toute souscription à un engagement de 6 mois, bénéficiez de 3 mois de domiciliation sans frais. Une offre exclusive réservée aux sociétés, vous permettant d'établir une adresse prestigieuse pour votre entreprise sans coût supplémentaire.</li>
                </ul>
                <p>Ce pack est l'opportunité idéale pour les entrepreneurs souhaitant lancer leur activité avec tous les outils nécessaires pour réussir. Profitez de notre expertise et de nos services sur mesure pour donner à votre entreprise l'élan qu'elle mérite.</p>
                <p>N'attendez plus pour donner à votre entreprise le lancement qu'elle mérite. Contactez-nous dès aujourd'hui pour en savoir plus sur notre Pack pour Nouveaux Domiciliés et commencer votre voyage vers le succès.</p>
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

export default PackDomicilie;
