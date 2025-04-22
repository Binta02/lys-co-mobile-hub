
// import React from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import CommunicationHero from '@/components/communication/CommunicationHero';
// import CommunicationServices from '@/components/communication/CommunicationServices';
// import CommunicationFAQ from '@/components/communication/CommunicationFAQ';

// const Communication = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         <CommunicationHero />
//         <CommunicationServices />
//         <CommunicationFAQ />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Communication;


import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommunicationHero from '@/components/communication/CommunicationHero';
import CommunicationServices from '@/components/communication/CommunicationServices';
import CommunicationCreations from '@/components/communication/CommunicationCreations';
import CommunicationCommunityManagement from '@/components/communication/CommunicationCommunityManagement';
import CommunicationStrategie from '@/components/communication/CommunicationStrategie';
import CommunicationPrint from '@/components/communication/CommunicationPrint';
import CommunicationSiteInternet from '@/components/communication/CommunicationSiteInternet';
import CommunicationMediaTraining from '@/components/communication/CommunicationMediaTraining';
import CommunicationPacks from '@/components/communication/CommunicationPacks';
import CommunicationFAQ from '@/components/communication/CommunicationFAQ';

const Communication = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <CommunicationHero />
        <CommunicationServices />
        <CommunicationCreations />
        <CommunicationCommunityManagement />
        <CommunicationStrategie />
        <CommunicationPrint />
        <CommunicationSiteInternet />
        <CommunicationMediaTraining />
        <CommunicationPacks />
        <CommunicationFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Communication;
