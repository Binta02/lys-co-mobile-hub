// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/table";
import { useUserData } from "@/hooks/useUserData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileEditForm from "@/components/dashboard/ProfileEditForm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, User, ShoppingCart, List } from "lucide-react";
import { humanizeReservationType } from "@/utils/humanize";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [stripeSubscriptions, setStripeSubscriptions] = useState<any[]>([]);
  const [stripeInvoices, setStripeInvoices] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);

  const {
    profile,
    // domiciliation,
    // userServices,
    loading: userDataLoading,
    updateProfile,
    error,
  } = useUserData();
  const [reservations, setReservations] = useState<any[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!profile?.id) {
        return;
      }
      setLoadingReservations(true);
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("user_id", profile.id)
        .order("reservation_date", { ascending: false });
      if (error) {
        console.error("❌ Erreur lors du fetch reservations :", error);
      } else {
        // console.log("✅ Réservations récupérées :", data);
      }
      setReservations(data || []);
      setLoadingReservations(false);
    };
    fetchReservations();
  }, [profile]);

  useEffect(() => {
    console.log("🟡 useEffect déclenché - Email du profil :", profile?.email);

    if (!profile?.email) {
      console.warn("⚠️ Aucun email de profil disponible, on annule le fetch.");
      return;
    }

    const fetchDocuments = async () => {
      console.log("🔄 Début du fetch des documents Axonaut...");
      setLoadingDocuments(true);

      try {
        const url = `https://mon-backend-node.vercel.app/api/axonaut/documents?client_id=${profile.email}`;
        console.log("📡 URL de la requête :", url);

        const res = await fetch(url);
        console.log("✅ Réponse brute de l'API :", res);

        const data = await res.json();
        console.log("📦 Données JSON récupérées :", data);

        if (!res.ok) {
          console.error("❌ Erreur HTTP :", res.status);
          throw new Error(data.error || "Erreur API Axonaut");
        }

        setDocuments(data);
        console.log("📁 Documents stockés dans le state :", data);
      } catch (err: any) {
        console.error("🚨 Erreur récupération documents :", err);
        toast({
          title: "Erreur",
          description: err.message || "Impossible de récupérer les documents.",
          variant: "destructive",
        });
      } finally {
        console.log("🛑 Fin du fetch des documents.");
        setLoadingDocuments(false);
      }
    };

    fetchDocuments();
  }, [profile?.email]);

  const canCancel = (reservationDate: string, startTime: string) => {
    // Combine date and time, compare with now + 48h
    const dateTime = new Date(`${reservationDate}T${startTime || "09:00:00"}`);
    const now = new Date();
    const diff = dateTime.getTime() - now.getTime();
    return diff > 48 * 60 * 60 * 1000; // 48h en ms
  };

  const handleCancelReservation = async (
    id: string,
    paymentIntentId?: string,
    userEmail?: string,
    reservationDate?: string,
    reservationType?: string
  ) => {
    console.log("handleCancelReservation called with:", {
      id,
      paymentIntentId,
      userEmail,
      reservationDate,
      reservationType,
    });

    if (!window.confirm("Confirmer l'annulation de cette réservation ?")) {
      console.log("Annulation non confirmée par l'utilisateur");
      return;
    }

    // 1) Remboursement Stripe + envois de mails
    if (paymentIntentId && userEmail) {
      try {
        console.log("Envoi requête refund-stripe-payment", {
          paymentIntentId,
          userEmail,
          reservationDate,
          reservationType,
        });
        const res = await fetch(
          "https://mon-backend-node.vercel.app/api/refund-stripe-payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentIntentId,
              userEmail,
              reservationDate,
              reservationType,
            }),
          }
        );
        console.log("Réponse brute refund-stripe-payment:", res);
        const data = await res.json();
        console.log("Réponse JSON refund-stripe-payment:", data);
        if (!res.ok || !data.success) {
          console.error("Erreur refund/mails côté backend:", data);
          toast({
            title: "Erreur",
            description: "Le remboursement ou l'envoi de mails a échoué.",
            variant: "destructive",
          });
          return;
        }
      } catch (err) {
        console.error("Erreur refund/mails (catch):", err);
        toast({
          title: "Erreur",
          description: "Erreur lors du remboursement ou de l'envoi de mails.",
          variant: "destructive",
        });
        return;
      }
    } else {
      console.log("Pas de paymentIntentId ou userEmail, skip refund/mails");
    }

    // 2) Suppression directe en base
    console.log("Suppression réservation dans Supabase, id:", id);
    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (error) {
      console.error("Erreur suppression Supabase :", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la réservation en base.",
        variant: "destructive",
      });
      return;
    }

    // 3) Mise à jour de l'affichage
    console.log("Suppression locale de la réservation, id:", id);
    setReservations((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Réservation annulée et remboursée" });
  };

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
        console.error(
          "Erreur lors de la vérification de l'authentification :",
          error
        );
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
    if (!profile?.id) return;
    const fetchStripeData = async () => {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", profile.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "❌ Erreur Supabase lors de la récupération du profil :",
          profileError
        );
        return;
      }

      // console.log("📦 Donnée du profil récupérée :", profileData);

      if (!profileData?.stripe_customer_id) {
        console.warn("⚠️ Pas de stripe_customer_id pour ce profil.");
        // console.log("📋 Profil :", profile);
        // console.log("📋 Domiciliation :", domiciliation);
        // console.log("📋 Services utilisateur :", userServices);
        return;
      }

      try {
        // console.log("📡 Envoi de requête à l'API /api/get-stripe-data avec ID :", profileData.stripe_customer_id);
        const res = await fetch(
          "https://mon-backend-node.vercel.app/api/get-stripe-data",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              stripeCustomerId: profileData.stripe_customer_id,
            }),
          }
        );

        const stripeData = await res.json();
        // console.log("✅ Données Stripe reçues :", stripeData);
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
      const res = await fetch(
        "https://mon-backend-node.vercel.app/api/create-stripe-portal-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stripeCustomerId: profileData.stripe_customer_id,
          }),
        }
      );

      const data = await res.json(); // ✅ lire UNE SEULE FOIS

      console.log("🎯 Réponse de l'API portail Stripe :", data);

      if (!data.url) {
        toast({
          title: "Erreur",
          description: "Impossible d'obtenir l'URL du portail Stripe.",
          variant: "destructive",
        });
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(
        "Erreur lors de l'ouverture du portail client Stripe :",
        error
      );
      toast({
        title: "Erreur",
        description: "Une erreur est survenue avec le portail client.",
        variant: "destructive",
      });
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
    // console.log("⏳ Chargement en cours :", loading, " / Erreur : ", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lysco-turquoise"></div>
      </div>
    );
  }

  if (error) {
    // console.log("⏳ Chargement en cours :", loading, " / Erreur : ", error);
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

          {/* Documents Axonaut */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                📄 Mes documents scannés
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingDocuments ? (
                <p>Chargement des documents...</p>
              ) : documents.length === 0 ? (
                <p>Aucun document trouvé.</p>
              ) : (
                <ul className="space-y-2">
                  {documents.map((doc) => (
                    <li key={doc.id} className="border p-4 rounded bg-white">
                      <p className="font-medium">
                        {doc.name || "Document sans nom"}
                      </p>
                      {doc.download_url && (
                        <a
                          href={doc.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          Télécharger
                        </a>
                      )}
                      <p className="text-sm text-gray-500">
                        Créé le : {formatDate(doc.created_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-lysco-turquoise" />
                Mes réservations de salles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingReservations ? (
                <div>Chargement…</div>
              ) : reservations.length === 0 ? (
                <div>Aucune réservation trouvée.</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {reservations.map((res) => (
                    <div
                      key={res.id}
                      className="border rounded-xl p-4 shadow-sm bg-white"
                    >
                      <p className="mb-1">
                        Date : {formatDate(res.reservation_date)}
                      </p>
                      <p className="mb-1">
                        Heure :{" "}
                        {res.start_time
                          ? `${res.start_time} - ${res.end_time}`
                          : "Journée/Demi-journée"}
                      </p>
                      <p className="mb-1">
                        Type : {humanizeReservationType(res.reservation_type)}
                      </p>
                      <div className="mb-1 flex items-center gap-2">
                        <span>Statut :</span>
                        {getStatusBadge(res.status)}
                      </div>
                      {res.status !== "cancelled" &&
                        canCancel(res.reservation_date, res.start_time) && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleCancelReservation(
                                res.id,
                                res.payment_intent_id,
                                profile?.email, // ← userEmail
                                res.reservation_date, // ← reservationDate
                                res.reservation_type // ← reservationType
                              )
                            }
                          >
                            Annuler
                          </Button>
                        )}
                      {res.status !== "cancelled" &&
                        !canCancel(res.reservation_date, res.start_time) && (
                          <span className="text-xs text-gray-500">
                            Annulation impossible (moins de 48h)
                          </span>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

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
                    <div
                      key={sub.id}
                      className="border rounded-xl p-4 shadow-sm bg-white"
                    >
                      {/* <p className="text-sm text-gray-500 mb-1">
                        ID : <span className="font-mono break-all">{sub.id}</span>
                      </p> */}
                      <div className="mb-1 flex items-center gap-2">
                        <span>Statut :</span>
                        {getStatusBadge(sub.status)}
                      </div>
                      <p className="mb-1">
                        Début : {formatDate(sub.start_date * 1000)}
                      </p>
                      {sub.cancel_at && (
                        <p className="mb-1">
                          Fin prévue : {formatDate(sub.cancel_at * 1000)}
                        </p>
                      )}
                      {sub.items?.data?.length > 0 &&
                        sub.items.data.map((item) => (
                          <p key={item.id} className="mb-1">
                            Produit :{" "}
                            <span className="font-medium">
                              {item.product_name || "Nom inconnu"}
                            </span>
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
                    <div
                      key={invoice.id}
                      className="border rounded-xl p-4 shadow-sm bg-white"
                    >
                      <p className="mb-1">
                        💳 Montant payé :{" "}
                        <strong>
                          {(invoice.amount_paid / 100).toFixed(2)} €
                        </strong>
                      </p>
                      <p className="mb-1">
                        🗓 Date : {formatDate(invoice.created * 1000)}
                      </p>
                      {invoice.lines?.data?.length > 0 &&
                        invoice.lines.data.map((line) => (
                          <p key={line.id} className="mb-1">
                            🏷 Produit :{" "}
                            <span className="font-medium">
                              {line.product_name || "Nom inconnu"}
                            </span>
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
