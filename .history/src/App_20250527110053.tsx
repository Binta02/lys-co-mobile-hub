// app.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Domiciliation from './pages/Domiciliation';
import ServicesAdmin from './pages/ServicesAdmin';
import ServicesComplementaires from './pages/ServicesComplementaires';
import EspacesTravail from './pages/EspacesTravail';
import Tarifs from './pages/Tarifs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Communication from './pages/Communication';
import CommunicationStrategie from './pages/CommunicationStrategie';
import CommunicationSiteInternet from './pages/CommunicationSiteInternet';
import CommunicationPrint from './pages/CommunicationPrint';
import CommunicationPhotos from './pages/CommunicationPhotos';
import CommunicationCreations from './pages/CommunicationCreations';
import CommunicationCommunityManagement from './pages/CommunicationCommunityManagement';
import CommunicationMediaTraining from './pages/CommunicationMediaTraining';
import CommunicationPacks from './pages/CommunicationPacks';
import ServiceDetail from './pages/ServiceDetail';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import DemandeDevis from './pages/DemandeDevis';
import Domiciliation1AnEntreprise from './pages/domiciliation/Domiciliation1AnEntreprise';
import Domiciliation6MoisEntreprise from './pages/domiciliation/Domiciliation6MoisEntreprise';
import Domiciliation3MoisEntreprise from './pages/domiciliation/Domiciliation3MoisEntreprise';
import Domiciliation6MoisMicroEntreprise from './pages/domiciliation/Domiciliation6MoisMicroEntreprise';
import Domiciliation3MoisMicroEntreprise from './pages/domiciliation/Domiciliation3MoisMicroEntreprise';
import PackDomicilie from './pages/domiciliation/PackDomicilie';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { FloatingCartButton } from '@/components/cart/FloatingCartButton';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// console.log("Stripe public key loaded:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// console.log("ENV variables:", import.meta.env);

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/domiciliation" element={<Domiciliation />} />
        <Route path="/domiciliation/1-an-entreprise" element={<Domiciliation1AnEntreprise />} />
        <Route path="/domiciliation/6-mois-entreprise" element={<Domiciliation6MoisEntreprise />} />
        <Route path="/domiciliation/3-mois-entreprise" element={<Domiciliation3MoisEntreprise />} />
        <Route path="/domiciliation/6-mois-micro-entreprise" element={<Domiciliation6MoisMicroEntreprise />} />
        <Route path="/domiciliation/3-mois-micro-entreprise" element={<Domiciliation3MoisMicroEntreprise />} />
        <Route path="/domiciliation/pack-domicilie" element={<PackDomicilie />} />
        <Route path="/services-admin" element={<ServicesAdmin />} />
        <Route path="/services-complementaires" element={<ServicesComplementaires />} />
        <Route path="/espaces-travail" element={<EspacesTravail />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/communication/strategie" element={<CommunicationStrategie />} />
        <Route path="/communication/site-internet" element={<CommunicationSiteInternet />} />
        <Route path="/communication/print" element={<CommunicationPrint />} />
        <Route path="/communication/photos" element={<CommunicationPhotos />} />
        <Route path="/communication/creations" element={<CommunicationCreations />} />
        <Route path="/communication/community-management" element={<CommunicationCommunityManagement />} />
        <Route path="/communication/media-training" element={<CommunicationMediaTraining />} />
        <Route path="/communication/packs" element={<CommunicationPacks />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/demandedevis" element={<DemandeDevis />} />
        <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          </PrivateRoute>
        }
      />
        <Route path="*" element={<NotFound />} />

      </Routes>
      {/* Render FloatingCartButton if needed */}
      {session && <FloatingCartButton />}
    
    </>
  );
}

export default App;
