
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
// import CommunicationPhotos from '@/components/communication/CommunicationPhotos';
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
        {/* <div id="creations"><CommunicationCreations /></div>
        <div id="community-management"><CommunicationCommunityManagement /></div>
        <div id="strategie"><CommunicationStrategie /></div>
        <div id="print"><CommunicationPrint /></div>
        <div id="site-internet"><CommunicationSiteInternet /></div>
        <div id="photos"><CommunicationPhotos /></div>
        <div id="media-training"><CommunicationMediaTraining /></div>
        <div id="packs"><CommunicationPacks /></div> */}
        <CommunicationFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Communication;
