<<<<<<< HEAD
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
import { Calendar, User, ShoppingCart, List } from "lucide-react";
=======

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useUserData } from '@/hooks/useUserData';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileEditForm from '@/components/dashboard/ProfileEditForm';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, User, ShoppingCart, List } from 'lucide-react';

>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8

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
    error
  } = useUserData();

  useEffect(() => {
    const checkUser = async () => {
      try {
<<<<<<< HEAD
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
        console.error("Error checking auth status:", error);
        navigate("/login");
=======
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Accès non autorisé",
            description: "Veuillez vous connecter pour accéder à votre tableau de bord",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigate('/login');
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
<<<<<<< HEAD
        if (event === "SIGNED_OUT") {
          navigate("/login");
=======
        if (event === 'SIGNED_OUT') {
          navigate('/login');
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading || userDataLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lysco-turquoise"></div>
<<<<<<< HEAD
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
=======
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
      </div>
    );
  }

<<<<<<< HEAD
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy", { locale: fr });
=======
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl mb-4">Une erreur est survenue lors du chargement de vos données</p>
        <Button onClick={() => navigate('/login')}>Retourner à l'accueil</Button>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: fr });
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
<<<<<<< HEAD
    if (status === "active") {
      return <Badge className="bg-green-500">Actif</Badge>;
    } else if (status === "option") {
      return <Badge className="bg-amber-500">En option</Badge>;
    } else if (status === "pending") {
=======
    if (status === 'active') {
      return <Badge className="bg-green-500">Actif</Badge>;
    } else if (status === 'option') {
      return <Badge className="bg-amber-500">En option</Badge>;
    } else if (status === 'pending') {
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
      return <Badge className="bg-blue-500">En attente</Badge>;
    } else {
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

  // Filtrer les services par catégorie
<<<<<<< HEAD
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
=======
  const domiciliationServices = userServices.filter(service => service.category === 'domiciliation');
  const adminServices = userServices.filter(service => service.category === 'admin');
  const marketingServices = userServices.filter(service => service.category === 'marketing');
  const complementaryServices = userServices.filter(service => service.category === 'complementary');
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
<<<<<<< HEAD

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">
            Bienvenue sur votre espace personnel Lys&Co,{" "}
            {profile?.first_name || profile?.email}
          </p>
        </div>

=======
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue sur votre espace personnel Lys&Co, {profile?.first_name || profile?.email}</p>
        </div>
        
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
        <div className="grid grid-cols-1 gap-8">
          {/* Profil utilisateur */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center">
                <User className="mr-2 h-5 w-5 text-lysco-turquoise" />
                Mon Profil
              </CardTitle>
<<<<<<< HEAD
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingProfile(true)}
              >
=======
              <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
                Modifier mon profil
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Nom</p>
<<<<<<< HEAD
                    <p className="font-medium">
                      {profile?.first_name} {profile?.last_name}
                    </p>
=======
                    <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Entreprise</p>
<<<<<<< HEAD
                    <p className="font-medium">
                      {profile?.company_name || "Non renseigné"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">
                      {profile?.phone || "Non renseigné"}
                    </p>
=======
                    <p className="font-medium">{profile?.company_name || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">{profile?.phone || 'Non renseigné'}</p>
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
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
<<<<<<< HEAD
                      <p
                        className={`font-medium ${
                          domiciliation.status === "active"
                            ? "text-green-600"
                            : domiciliation.status === "pending"
                            ? "text-amber-600"
                            : "text-gray-600"
                        }`}
                      >
                        {domiciliation.status === "active"
                          ? "Actif"
                          : domiciliation.status === "pending"
                          ? "En attente"
                          : "Inactif"}
=======
                      <p className={`font-medium ${
                        domiciliation.status === 'active' ? 'text-green-600' : 
                        domiciliation.status === 'pending' ? 'text-amber-600' : 'text-gray-600'
                      }`}>
                        {domiciliation.status === 'active' ? 'Actif' : 
                         domiciliation.status === 'pending' ? 'En attente' : 'Inactif'}
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
                      </p>
                    </div>
                    {domiciliation.renewal_date && (
                      <div>
                        <p className="text-sm text-gray-600">Renouvellement</p>
<<<<<<< HEAD
                        <p className="font-medium">
                          {formatDate(domiciliation.renewal_date)}
                        </p>
=======
                        <p className="font-medium">{formatDate(domiciliation.renewal_date)}</p>
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
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
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-lysco-turquoise" />
                Services achetés
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userServices.length > 0 ? (
                <div className="space-y-6">
                  {domiciliationServices.length > 0 && (
                    <div>
<<<<<<< HEAD
                      <h3 className="font-medium mb-2">
                        Services de domiciliation
                      </h3>
=======
                      <h3 className="font-medium mb-2">Services de domiciliation</h3>
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
<<<<<<< HEAD
                          {domiciliationServices.map((service) => (
                            <TableRow key={service.id}>
                              <TableCell>{service.name}</TableCell>
                              <TableCell>
                                {getStatusBadge(service.status)}
                              </TableCell>
                              <TableCell>
                                {service.price ? `${service.price}€` : "-"}
                              </TableCell>
=======
                          {domiciliationServices.map(service => (
                            <TableRow key={service.id}>
                              <TableCell>{service.name}</TableCell>
                              <TableCell>{getStatusBadge(service.status)}</TableCell>
                              <TableCell>{service.price ? `${service.price}€` : '-'}</TableCell>
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
<<<<<<< HEAD

                  {adminServices.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">
                        Services administratifs
                      </h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {adminServices.map((service) => (
                            <TableRow key={service.id}>
                              <TableCell>{service.name}</TableCell>
                              <TableCell>
                                {getStatusBadge(service.status)}
                              </TableCell>
                              <TableCell>
                                {service.price ? `${service.price}€` : "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {marketingServices.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Services marketing</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {marketingServices.map((service) => (
                            <TableRow key={service.id}>
                              <TableCell>{service.name}</TableCell>
                              <TableCell>
                                {getStatusBadge(service.status)}
                              </TableCell>
                              <TableCell>
                                {service.price ? `${service.price}€` : "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {complementaryServices.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">
                        Services complémentaires
                      </h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {complementaryServices.map((service) => (
                            <TableRow key={service.id}>
                              <TableCell>{service.name}</TableCell>
                              <TableCell>
                                {getStatusBadge(service.status)}
                              </TableCell>
                              <TableCell>
                                {service.price ? `${service.price}€` : "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">
                    Vous n'avez pas encore de services actifs.
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <a href="/domiciliation">Voir nos offres</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* TODO: Ajouter la section Réservations quand celle-ci sera implémentée */}
        </div>
      </main>
=======
>>>>>>> 8ffbf30fbf563d6b6a5a8962abec7e857e7f99d8

                  {adminServices.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Services administratifs</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {adminServices.map(service => (
                            <TableRow key={service.id}>
                              <TableCell>{service.name}</TableCell>
                              <TableCell>{getStatusBadge(service.status)}</TableCell>
                              <TableCell>{service.price ? `${service.price}€` : '-'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {marketingServices.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Services marketing</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {marketingServices.map(service => (
                            <TableRow key={service.id}>
                              <TableCell>{service.name}</TableCell>
                              <TableCell>{getStatusBadge(service.status)}</TableCell>
                              <TableCell>{service.price ? `${service.price}€` : '-'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {complementaryServices.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Services complémentaires</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {complementaryServices.map(service => (
                            <TableRow key={service.id}>
                              <TableCell>{service.name}</TableCell>
                              <TableCell>{getStatusBadge(service.status)}</TableCell>
                              <TableCell>{service.price ? `${service.price}€` : '-'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">Vous n'avez pas encore de services actifs.</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <a href="/domiciliation">Voir nos offres</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* TODO: Ajouter la section Réservations quand celle-ci sera implémentée */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
