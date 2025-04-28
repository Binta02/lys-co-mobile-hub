import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CommunicationStrategiePage from "./pages/CommunicationStrategie";
import CommunicationCreationsPage from "./pages/CommunicationCreations";
import CommunicationCommunityManagementPage from "./pages/CommunicationCommunityManagement";
import CommunicationPrintPage from "./pages/CommunicationPrint";
import CommunicationSiteInternetPage from "./pages/CommunicationSiteInternet";
import CommunicationPhotosPage from "./pages/CommunicationPhotos";
import CommunicationMediaTrainingPage from "./pages/CommunicationMediaTraining";
import CommunicationPacksPage from "./pages/CommunicationPacks";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Domiciliation from "./pages/Domiciliation";
import ServicesAdmin from "./pages/ServicesAdmin";
import Communication from "./pages/Communication";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/PrivateRoute";
import ServiceDetail from "./pages/ServiceDetail";
import { CartProvider } from "@/components/cart/CartContext";
import { useEffect } from "react";



const queryClient = new QueryClient();

// const App = () => (
//   useEffect(() => {
//     const removeLovableBadge = () => {
//       const badge = document.getElementById('lovable-badge');
//       if (badge) {
//         badge.remove();
//       }
//     };

//     // Dès que la page est chargée
//     removeLovableBadge();

//     // Et toutes les secondes au cas où il réapparaît
//     const interval = setInterval(removeLovableBadge, 1000);

//     // On nettoie l'intervalle quand le composant se démonte
//     return () => clearInterval(interval);
//   }, []);
//   <QueryClientProvider client={queryClient}>
//     <CartProvider>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<Index />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/communication/strategie" element={<CommunicationStrategiePage />} />
//           <Route path="/communication/creations" element={<CommunicationCreationsPage />} />
//           <Route path="/communication/community-management" element={<CommunicationCommunityManagementPage />} />
//           <Route path="/communication/print" element={<CommunicationPrintPage />} />
//           <Route path="/communication/photo" element={<CommunicationPhotosPage />} />
//           <Route path="/communication/site-internet" element={<CommunicationSiteInternetPage />} />
//           <Route path="/communication/media-training" element={<CommunicationMediaTrainingPage />} />
//           <Route path="/communication/packs" element={<CommunicationPacksPage />} />
//           <Route path="/service/:id" element={<ServiceDetail />} />

//           {/* Protected routes */}
//           <Route path="/dashboard" element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           } />
//           <Route path="/domiciliation" element={
//             <PrivateRoute>
//               <Domiciliation />
//             </PrivateRoute>
//           } />
//           <Route path="/services-admin" element={
//             <PrivateRoute>
//               <ServicesAdmin />
//             </PrivateRoute>
//           } />
//           <Route path="/communication" element={
//             <PrivateRoute>
//               <Communication />
//             </PrivateRoute>
//           } />

//           {/* Catch all */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//     </CartProvider>
//   </QueryClientProvider>
// );
const App = () => {
  useEffect(() => {
    const removeLovableBadge = () => {
      const badge = document.getElementById('lovable-badge');
      if (badge) {
        badge.remove();
      }
    };

    removeLovableBadge();
    const interval = setInterval(removeLovableBadge, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/communication/strategie" element={<CommunicationStrategiePage />} />
              <Route path="/communication/creations" element={<CommunicationCreationsPage />} />
              <Route path="/communication/community-management" element={<CommunicationCommunityManagementPage />} />
              <Route path="/communication/print" element={<CommunicationPrintPage />} />
              <Route path="/communication/photo" element={<CommunicationPhotosPage />} />
              <Route path="/communication/site-internet" element={<CommunicationSiteInternetPage />} />
              <Route path="/communication/media-training" element={<CommunicationMediaTrainingPage />} />
              <Route path="/communication/packs" element={<CommunicationPacksPage />} />
              <Route path="/service/:id" element={<ServiceDetail />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/domiciliation" element={<PrivateRoute><Domiciliation /></PrivateRoute>} />
              <Route path="/services-admin" element={<PrivateRoute><ServicesAdmin /></PrivateRoute>} />
              <Route path="/communication" element={<PrivateRoute><Communication /></PrivateRoute>} />

              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
