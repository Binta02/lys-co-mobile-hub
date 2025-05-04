
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Domiciliation from './pages/Domiciliation';
import Communication from './pages/Communication';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';
import { CartProvider } from './components/cart/CartContext';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import { Toaster } from './components/ui/toaster';

// Import communication sub-pages
import CommunicationSiteInternet from './pages/CommunicationSiteInternet';
import CommunicationCommunityManagement from './pages/CommunicationCommunityManagement';
import CommunicationCreations from './pages/CommunicationCreations';
import CommunicationMediaTraining from './pages/CommunicationMediaTraining';
import CommunicationPacks from './pages/CommunicationPacks';
import CommunicationPrint from './pages/CommunicationPrint';
import CommunicationPhotos from './pages/CommunicationPhotos';
import CommunicationStrategie from './pages/CommunicationStrategie';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/domiciliation" element={<Domiciliation />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/communication/site-internet" element={<CommunicationSiteInternet />} />
          <Route path="/communication/community-management" element={<CommunicationCommunityManagement />} />
          <Route path="/communication/creations" element={<CommunicationCreations />} />
          <Route path="/communication/media-training" element={<CommunicationMediaTraining />} />
          <Route path="/communication/packs" element={<CommunicationPacks />} />
          <Route path="/communication/print" element={<CommunicationPrint />} />
          <Route path="/communication/photos" element={<CommunicationPhotos />} />
          <Route path="/communication/strategie" element={<CommunicationStrategie />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </CartProvider>
  );
}

export default App;
