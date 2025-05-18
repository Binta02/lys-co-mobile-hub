// src/components/dashboard/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Calendar, User, ShoppingCart } from "lucide-react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const {
    profile,
    domiciliation,
    userServices,
    loading: userDataLoading,
    updateProfile,
    error,
  } = useUserData();

  // Vérification de session Supabase
  useEffect(() => {
    const checkUser = async () => {
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
      }
      setLoading(false);
    };
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/login");
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading || userDataLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lysco-turquoise" />
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
          Retourner à l’accueil
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: fr });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Actif</Badge>;
      case "pending":
        return <Badge className="bg-blue-500">En attente</Badge>;
      case "option":
        return <Badge className="bg-amber-500">En option</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

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

  // Catégorisation des services
  const domiciliationServices = userServices.filter(
    (s) => s.category === "domiciliation"
  );
  const adminServices = userServices.filter((s) => s.category === "admin");
  const marketingServices = userServices.filter(
    (s) => s.category === "marketing"
  );
  const complementaryServices = userServices.filter(
    (s) => s.category === "complementary"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* 1. Section Vue d'ensemble interactive */}
        <DashboardOverview />

        {/* 2. Profil utilisateur */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                {/* Correction: Utiliser profile.avatarUrl si c'est le bon champ, sinon retirez l'image */}
                {profile?.avatarUrl ? (
                  <AvatarImage
                    src={profile.avatarUrl}
                    alt="Avatar utilisateur"
                  />
                ) : (
                  <AvatarFallback>
                    {profile?.first_name?.[0] || "?"}
                  </AvatarFallback>
                )}
              </Avatar>
              <CardTitle className="text-xl flex items-center">
                <User className="mr-2 h-5 w-5 text-lysco-turquoise" />
                Mon Profil
              </CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingProfile(true)}
            >
              Modifier
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <p className="text-sm text-gray-600">Entreprise</p>
              <p className="font-medium">
                {profile?.company_name || "Non renseigné"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Téléphone</p>
              <p className="font-medium">{profile?.phone || "Non renseigné"}</p>
            </div>
          </CardContent>
        </Card>

        {/* 3. Domiciliation */}
        {domiciliation && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-lysco-turquoise" />
                Domiciliation
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Adresse</p>
                <p className="font-medium">{domiciliation.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Statut</p>
                <div className="font-medium">
                  {getStatusBadge(domiciliation.status)}
                </div>
              </div>
              {domiciliation.renewal_date && (
                <div>
                  <p className="text-sm text-gray-600">Renouvellement</p>
                  <p className="font-medium">
                    {formatDate(domiciliation.renewal_date)}
                  </p>
                </div>
              )}
              {domiciliation.plan_type && (
                <div>
                  <p className="text-sm text-gray-600">Type de plan</p>
                  <p className="font-medium">{domiciliation.plan_type}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 4. Services achetés */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 text-lysco-turquoise" />
              Services achetés
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {userServices.length > 0 ? (
              <>
                {[
                  { title: "Domiciliation", data: domiciliationServices },
                  { title: "Admin", data: adminServices },
                  { title: "Marketing", data: marketingServices },
                  { title: "Complémentaires", data: complementaryServices },
                ].map(({ title, data }) =>
                  data.length > 0 ? (
                    <div key={title}>
                      <h3 className="font-medium mb-2">{title}</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.map((s) => (
                            <TableRow key={s.id}>
                              <TableCell>{s.name}</TableCell>
                              <TableCell>{getStatusBadge(s.status)}</TableCell>
                              <TableCell>
                                {s.price != null ? `${s.price} €` : "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : null
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">
                  Aucun service actif pour le moment.
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <a href="/domiciliation">Voir nos offres</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
