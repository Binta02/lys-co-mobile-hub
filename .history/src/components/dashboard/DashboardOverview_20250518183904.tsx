// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Home, Mail, Bell, FileText, MessageCircle, User } from 'lucide-react';
// import { useUserData } from '@/hooks/useUserData';
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import ProfileEditForm from './ProfileEditForm';

// const DashboardOverview = () => {
//   const {
//     profile,
//     domiciliation,
//     userServices,
//     mails,
//     notifications,
//     activities,
//     loading,
//     updateProfile,
//     markMailAsRead,
//     markNotificationAsRead
//   } = useUserData();

//   const [isEditingProfile, setIsEditingProfile] = useState(false);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lysco-turquoise"></div>
//       </div>
//     );
//   }

//   // Filtrer les services par catégorie
//   const domiciliationServices = userServices.filter(service => service.category === 'domiciliation');
//   const adminServices = userServices.filter(service => service.category === 'admin');
//   const marketingServices = userServices.filter(service => service.category === 'marketing');

//   const formatDate = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       return format(date, 'dd/MM/yyyy', { locale: fr });
//     } catch (e) {
//       return dateString;
//     }
//   };

//   const getRelativeDate = (dateString: string): string => {
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

//       if (diffInDays === 0) return "Aujourd'hui";
//       if (diffInDays === 1) return "Hier";
//       return format(date, 'dd/MM/yyyy', { locale: fr });
//     } catch (e) {
//       return dateString;
//     }
//   };

//   const handleMailClick = (mailId: string) => {
//     markMailAsRead(mailId);
//   };

//   const handleNotificationClick = (notificationId: string) => {
//     markNotificationAsRead(notificationId);
//   };

//   if (isEditingProfile) {
//     return (
//       <ProfileEditForm
//         profile={profile}
//         onUpdate={updateProfile}
//         onCancel={() => setIsEditingProfile(false)}
//       />
//     );
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         <Card className="col-span-1 lg:col-span-3">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-lg flex items-center">
//               <User className="mr-2 h-5 w-5 text-lysco-turquoise" />
//               Mon Profil
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <p className="text-sm text-gray-600">
//                   Nom: <span className="font-medium">{profile?.first_name} {profile?.last_name}</span>
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Email: <span className="font-medium">{profile?.email}</span>
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">
//                   Entreprise: <span className="font-medium">{profile?.company_name || 'Non renseigné'}</span>
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Téléphone: <span className="font-medium">{profile?.phone || 'Non renseigné'}</span>
//                 </p>
//               </div>
//             </div>
//             <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
//               Modifier mon profil
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-lg flex items-center">
//               <Home className="mr-2 h-5 w-5 text-lysco-turquoise" />
//               Domiciliation
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-gray-600 mb-4">
//               Statut: <span className={`font-medium ${domiciliation?.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
//                 {domiciliation?.status === 'active' ? 'Actif' : domiciliation?.status === 'pending' ? 'En attente' : 'Inactif'}
//               </span>
//             </p>
//             <p className="text-sm text-gray-600 mb-4">
//               Adresse: {domiciliation?.address || 'Non définie'}
//             </p>
//             {domiciliation?.renewal_date && (
//               <p className="text-sm text-gray-600 mb-4">
//                 Renouvellement: {formatDate(domiciliation.renewal_date)}
//               </p>
//             )}
//             <p className="text-sm text-gray-600 mb-4">
//               Services actifs: <span className="font-medium">{domiciliationServices.filter(s => s.status === 'active').length}</span>
//             </p>
//             <Button variant="outline" size="sm" className="w-full" asChild>
//               <a href="/dashboard/domiciliation">Gérer la domiciliation</a>
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-lg flex items-center">
//               <Mail className="mr-2 h-5 w-5 text-lysco-pink" />
//               Courrier
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-gray-600 mb-4">
//               Nouveaux courriers: <span className="font-medium">{mails.filter(mail => mail.status === 'new').length}</span>
//             </p>
//             {mails.length > 0 && (
//               <p className="text-sm text-gray-600 mb-4">
//                 Dernière réception: <span className="font-medium">
//                   {formatDate(mails[0].received_at)}
//                 </span>
//               </p>
//             )}
//             <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Fonctionnalité à venir')}>
//               Gérer le courrier
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-lg flex items-center">
//               <Bell className="mr-2 h-5 w-5 text-lysco-turquoise" />
//               Notifications
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-gray-600 mb-4">
//               Vous avez <span className="font-medium">{notifications.filter(n => !n.read).length}</span> nouvelles notifications
//             </p>
//             <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Fonctionnalité à venir')}>
//               Voir les notifications
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Activité récente</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {activities.map(activity => (
//               <div key={activity.id} className="flex items-start gap-4 pb-4 border-b">
//                 <div className={`w-8 h-8 rounded-full ${
//                   activity.type === 'mail'
//                     ? 'bg-lysco-turquoise/10'
//                     : activity.type === 'document'
//                     ? 'bg-lysco-pink/10'
//                     : 'bg-lysco-turquoise/10'
//                 } flex items-center justify-center`}>
//                   {activity.type === 'mail' && <Mail className="h-4 w-4 text-lysco-turquoise" />}
//                   {activity.type === 'document' && <FileText className="h-4 w-4 text-lysco-pink" />}
//                   {activity.type === 'message' && <MessageCircle className="h-4 w-4 text-lysco-turquoise" />}
//                 </div>
//                 <div>
//                   <p className="font-medium">{activity.title}</p>
//                   <p className="text-sm text-gray-600">{activity.description}</p>
//                   <p className="text-xs text-gray-500">{getRelativeDate(activity.created_at)}, {format(new Date(activity.created_at), 'HH:mm')}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default DashboardOverview;

// src/components/dashboard/DashboardOverview.tsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { fetchOverviewStats, Stat } from "@/integrations/api/dashboard";

export default function DashboardOverview() {
  // plage par défaut : 7 derniers jours
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { data, isLoading, error, refetch } = useQuery<Stat[]>(
    ["overviewStats", startDate, endDate],
    () => fetchOverviewStats(startDate, endDate),
    {
      refetchInterval: 1000 * 60 * 5, // toutes les 5 minutes
      keepPreviousData: true,
    }
  );

  const chartData: Stat[] = data ?? [];

  if (isLoading) return <div>Chargement des statistiques…</div>;
  if (error) return <div>Impossible de charger les données.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Filtres de date */}
      <div className="flex items-center gap-4">
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date);
            refetch();
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => {
            setEndDate(date);
            refetch();
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Graphique */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2DD4BF"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
