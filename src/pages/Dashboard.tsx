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

  // useEffect(() => {
  //   const fetchStripeData = async () => {
  //     if (!profile?.id) return;

  //     const { data: profileData, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("stripe_customer_id")
  //       .eq("id", profile.id)
  //       .maybeSingle();

  //     if (profileError) {
  //       console.error("Erreur lors de la récupération du profil :", profileError);
  //       return;
  //     }

  //     if (!profileData?.stripe_customer_id) return;

  //     try {
  //       const res = await fetch("/api/get-stripe-data", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ stripeCustomerId: profileData.stripe_customer_id }),
  //       });

  //       const stripeData = await res.json();
  //       setStripeSubscriptions(stripeData.subscriptions || []);
  //       setStripeInvoices(stripeData.invoices || []);
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des données Stripe :", error);
  //     }
  //   };

  //   fetchStripeData();
  // }, [profile]);
useEffect(() => {
  const fetchStripeData = async () => {
    if (!profile?.id) {
      console.log("⛔ Aucun ID de profil trouvé, on quitte.");
      console.log("📋 Profil :", profile);
console.log("📋 Domiciliation :", domiciliation);
console.log("📋 Services utilisateur :", userServices);

      return;
    }

    console.log("🔍 Profil ID détecté :", profile.id);

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", profile.id)
      .maybeSingle();

    if (profileError) {
      console.error("❌ Erreur Supabase lors de la récupération du profil :", profileError);
      console.log("📋 Profil :", profile);
console.log("📋 Domiciliation :", domiciliation);
console.log("📋 Services utilisateur :", userServices);

      return;
    }

    console.log("📦 Donnée du profil récupérée :", profileData);

    if (!profileData?.stripe_customer_id) {
      console.warn("⚠️ Pas de stripe_customer_id pour ce profil.");
      console.log("📋 Profil :", profile);
console.log("📋 Domiciliation :", domiciliation);
console.log("📋 Services utilisateur :", userServices);

      return;
    }

    try {
      console.log("📡 Envoi de requête à l'API /api/get-stripe-data avec ID :", profileData.stripe_customer_id);
      const res = await fetch("https://mon-backend-node.vercel.app/api/get-stripe-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripeCustomerId: profileData.stripe_customer_id }),
      });

      const stripeData = await res.json();
      console.log("✅ Données Stripe reçues :", stripeData);
      setStripeSubscriptions(stripeData.subscriptions || []);
      setStripeInvoices(stripeData.invoices || []);
    } catch (error) {
      console.error("❌ Erreur lors de l'appel à Stripe :", error);
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
      .maybeSingle();

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
      const data = await res.json();
      console.log("🎯 Réponse de l'API portail Stripe :", data);
      if (!data.url) {
  toast({
    title: "Erreur",
    description: "Impossible d'obtenir l'URL du portail Stripe.",
    variant: "destructive",
  });
  return;
}
      window.location.href = url;
    } catch (error) {
      console.error("Erreur lors de l'ouverture du portail client Stripe :", error);
    }
  };

  const formatDate = (dateInput: string | number): string => {
    try {
      const date = new Date(dateInput);
      return format(date, "dd/MM/yyyy", { locale: fr });
    } catch (e) {
      return String(dateInput);
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
    console.log("⏳ Chargement en cours :", loading, " / Erreur : ", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lysco-turquoise"></div>
      </div>
    );
  }

  if (error) {
    console.log("⏳ Chargement en cours :", loading, " / Erreur : ", error);

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
          {/* {stripeSubscriptions.length > 0 && (
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
          )} */}
          {/* Abonnements Stripe */}
         {stripeSubscriptions.length > 0 && (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl font-semibold flex items-center gap-2">
        <List className="w-5 h-5 text-lysco-turquoise" />
        Mes abonnements
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-2 gap-4">
        {stripeSubscriptions.map((sub) => (
          <div key={sub.id} className="border rounded-xl p-4 shadow-sm bg-white">
            <p className="text-sm text-gray-500 mb-1">
              ID : <span className="font-mono break-all">{sub.id}</span>
            </p>
            <p className="mb-1">Statut : {getStatusBadge(sub.status)}</p>
            <p className="mb-1">Début : {formatDate(sub.start_date * 1000)}</p>
            {sub.cancel_at && (
              <p className="mb-1">Fin prévue : {formatDate(sub.cancel_at * 1000)}</p>
            )}
            {sub.items?.data?.length > 0 && sub.items.data.map((item) => (
              <p key={item.id} className="mb-1">
                📦 Produit : <span className="font-medium">{item.product_name || 'Nom inconnu'}</span>
              </p>
            ))}
          </div>
        ))}
      </div>
      <Button className="mt-4" onClick={handleOpenStripePortal}>
        Gérer mes abonnements
      </Button>
    </CardContent>
  </Card>
)}
          {/* Factures Stripe */}
          {stripeInvoices.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-lysco-turquoise" />
                  Mes factures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {stripeInvoices.map((invoice) => (
                    <div key={invoice.id} className="border rounded-xl p-4 shadow-sm bg-white">
                      <p className="mb-1">
                        💳 Montant payé : <strong>{(invoice.amount_paid / 100).toFixed(2)} €</strong>
                      </p>
                      <p className="mb-1">🗓 Date : {formatDate(invoice.created * 1000)}</p>
                      {invoice.lines?.data?.length > 0 && invoice.lines.data.map((line) => (
                        <p key={line.id} className="mb-1">
                          🏷 Produit : <span className="font-medium">{line.product_name || 'Nom inconnu'}</span>
                        </p>
                      ))}
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
                </div>
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
 
