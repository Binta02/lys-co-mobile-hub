// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useUserData } from "@/hooks/useUserData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileEditForm from "@/components/dashboard/ProfileEditForm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, User, ShoppingCart, List } from "lucide-react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [stripeSubscriptions, setStripeSubscriptions] = useState<any[]>([]);
  const [stripeInvoices, setStripeInvoices] = useState<any[]>([]);

  const {
    profile,
    domiciliation,
    userServices,
    loading: userDataLoading,
    updateProfile,
    error,
  } = useUserData();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          toast({
            title: "Accès non autorisé",
            description:
              "Veuillez vous connecter pour accéder à votre tableau de bord",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/login");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const fetchStripeData = async () => {
      if (!profile?.id) return;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", profile.id)
        .single();

      if (profileError) {
        console.error("Erreur lors de la récupération du profil :", profileError);
        return;
      }

      if (!profileData?.stripe_customer_id) return;

      try {
        const res = await fetch("/api/get-stripe-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stripeCustomerId: profileData.stripe_customer_id }),
        });

        const stripeData = await res.json();
        setStripeSubscriptions(stripeData.subscriptions || []);
        setStripeInvoices(stripeData.invoices || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des données Stripe :", error);
      }
    };

    fetchStripeData();
  }, [profile]);

  const handleOpenStripePortal = async () => {
    if (!profile?.id) return;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", profile.id)
      .single();

    if (profileError) {
      console.error("Erreur lors de la récupération du profil :", profileError);
      return;
    }

    if (!profileData?.stripe_customer_id) return;

    try {
      const res = await fetch("https://mon-backend-node.vercel.app/api/create-stripe-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripeCustomerId: profileData.stripe_customer_id }),
      });

      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      console.error("Erreur lors de l'ouverture du portail client Stripe :", error);
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy", { locale: fr });
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Actif</Badge>;
      case "option":
        return <Badge className="bg-amber-500">En option</Badge>;
      case "pending":
        return <Badge className="bg-blue-500">En attente</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  if (loading || userDataLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lysco-turquoise"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl mb-4">
          Une erreur est survenue lors du chargement de vos données
        </p>
        <Button onClick={() => navigate("/login")}>
          Retourner à l'accueil
        </Button>
      </div>
    );
  }

  if (isEditingProfile) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <ProfileEditForm
            profile={profile}
            onUpdate={updateProfile}
            onCancel={() => setIsEditingProfile(false)}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Filtrer les services par catégorie
  const domiciliationServices = userServices.filter(
    (service) => service.category === "domiciliation"
  );
  const adminServices = userServices.filter(
    (service) => service.category === "admin"
  );
  const marketingServices = userServices.filter(
    (service) => service.category === "marketing"
  );
  const complementaryServices = userServices.filter(
    (service) => service.category === "complementary"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">
            Bienvenue sur votre espace personnel Lys&Co,{" "}
            {profile?.first_name || profile?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Profil utilisateur */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center">
                <User className="mr-2 h-5 w-5 text-lysco-turquoise" />
                Mon Profil
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingProfile(true)}
              >
                Modifier mon profil
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Nom</p>
                    <p className="font-medium">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Entreprise</p>
                    <p className="font-medium">
                      {profile?.company_name || "Non renseigné"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">
                      {profile?.phone || "Non renseigné"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Domiciliation */}
          {domiciliation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-lysco-turquoise" />
                  Domiciliation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                                    <p className="text-sm text-gray-600">Adresse</p>
                  <p className="font-medium">{domiciliation.address}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Statut</p>
                      <p className={`font-medium ${
                        domiciliation.status === "active"
                          ? "text-green-600"
                          : domiciliation.status === "pending"
                          ? "text-amber-600"
                          : "text-gray-600"
                      }`}>
                        {domiciliation.status === "active"
                          ? "Actif"
                          : domiciliation.status === "pending"
                          ? "En attente"
                          : "Inactif"}
                      </p>
                    </div>
                    {domiciliation.renewal_date && (
                      <div>
                        <p className="text-sm text-gray-600">Renouvellement</p>
                        <p className="font-medium">{formatDate(domiciliation.renewal_date)}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    {domiciliation.plan_type && (
                      <div>
                        <p className="text-sm text-gray-600">Type de plan</p>
                        <p className="font-medium">{domiciliation.plan_type}</p>
                      </div>
                    )}
                    {domiciliation.duration && (
                      <div>
                        <p className="text-sm text-gray-600">Durée</p>
                        <p className="font-medium">{domiciliation.duration}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Services achetés */}
          {[domiciliationServices, adminServices, marketingServices, complementaryServices].map((services, index) => {
            const titles = ["Services de domiciliation", "Services administratifs", "Services marketing", "Services complémentaires"];
            if (services.length === 0) return null;
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{titles[index]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Prix</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>{service.name}</TableCell>
                          <TableCell>{getStatusBadge(service.status)}</TableCell>
                          <TableCell>{service.price ? `${service.price} €` : "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            );
          })}

          {/* Abonnements Stripe */}
          {stripeSubscriptions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Mes abonnements</CardTitle>
              </CardHeader>
              <CardContent>
                {stripeSubscriptions.map((sub) => (
                  <div key={sub.id} className="mb-4 border-b pb-4">
                    <p className="font-medium">ID : {sub.id}</p>
                    <p>Status : {getStatusBadge(sub.status)}</p>
                    <p>Début : {formatDate(String(sub.start_date * 1000))}</p>
                    {sub.cancel_at && <p>Fin prévue : {formatDate(String(sub.cancel_at * 1000))}</p>}
                  </div>
                ))}
                <Button onClick={handleOpenStripePortal}>Gérer mes abonnements</Button>
              </CardContent>
            </Card>
          )}

          {/* Factures Stripe */}
          {stripeInvoices.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Mes factures</CardTitle>
              </CardHeader>
              <CardContent>
                {stripeInvoices.map((invoice) => (
                  <div key={invoice.id} className="mb-4 border-b pb-4">
                    <p>Montant payé : {(invoice.amount_paid / 100).toFixed(2)} €</p>
                    <p>Date : {formatDate(String(invoice.created * 1000))}</p>
                    <a
                      href={invoice.invoice_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Télécharger la facture
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
 
