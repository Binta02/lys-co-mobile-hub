
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PriceCard from '@/components/services/PriceCard';
import { Button } from '@/components/ui/button';
import { FileText, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesAdmin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - Formalités Entreprises */}
        <section className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                FORMALITES ENTREPRISES – ADMINISTRATIF
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Si vous êtes en pleine création d'entreprise, envisagez de changer votre siège social 
                ou devez gérer d'autres modifications importantes, mais que le temps ou les connaissances 
                vous manquent pour aborder les démarches administratives, sachez que vous n'êtes pas seul. 
                Notre partenaire, un expert-comptable qualifié, est prêt à vous épauler à chaque étape du processus. 
                Il vous offrira une assistance personnalisée et des conseils avisés pour naviguer aisément 
                à travers ces formalités, assurant ainsi une transition en douceur et conforme aux exigences légales. 
                N'attendez plus pour demander de l'aide !
              </p>
            </div>
          </div>
        </section>

        {/* Tarifs Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Tarifs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PriceCard 
                service="Aide à l'inscription auto entreprise" 
                price="150 €" 
              />
              <PriceCard 
                service="Aide à l'inscription entreprise individuelle" 
                price="150 €" 
              />
              <PriceCard 
                service="Aide à la rédaction de formalités de création" 
                price="600 €" 
                note="*hors coûts organismes" 
              />
              <PriceCard 
                service="Vtc – Driel (registre des transports, vtc marchandises)" 
                price="900 €" 
                note="*hors coûts organismes" 
              />
              <PriceCard 
                service="Modification société" 
                price="900 €" 
                note="*hors coûts organismes" 
              />
              <PriceCard 
                service="Dépôt des comptes annuels" 
                price="300 €" 
                note="*hors coûts organismes" 
              />
              <PriceCard 
                service="Cession de part" 
                price="200 €" 
              />
              <PriceCard 
                service="Accompagnement ouverture compte en ligne" 
                price="150 €" 
                note="hors frais" 
              />
            </div>
            <div className="text-center mt-8">
              <Link to="/contact">
                <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                  Aller à la boutique
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Assistanat Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">ASSISTANAT</h2>
              <p className="text-lg text-gray-600 mb-12">
                Imaginez déléguer toute la gestion administrative, comptable et commerciale à des 
                assistants experts, vous permettant ainsi de vous recentrer sur l'essentiel de votre 
                activité. Nos partenaires secrétaires prennent en charge toutes vos obligations, 
                de la paperasserie quotidienne à la comptabilité, en passant par le suivi commercial. 
                Ce service vous offre la liberté de vous consacrer pleinement à ce que vous faites de mieux, 
                tout en ayant la tranquillité d'esprit que les aspects les plus fastidieux de votre entreprise 
                sont gérés efficacement et professionnellement.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <PriceCard 
                  service="Service d'assistanat" 
                  price="30 € /heure" 
                />
                <PriceCard 
                  service="Création de devis" 
                  price="15 € /page" 
                />
                <PriceCard 
                  service="Création des factures" 
                  price="15 € /page" 
                />
                <PriceCard 
                  service="Annonces commerciales" 
                  price="10 € /annonce" 
                  note="destinées aux sites d'annonces" 
                />
                <PriceCard 
                  service="Création de courriers administratif" 
                  price="Sur devis" 
                  note="selon les spécificités de votre demande" 
                />
              </div>

              <div className="text-center">
                <Link to="/contact">
                  <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 text-white">
                    Aller à la boutique
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-600 mb-8">
                Chez Lys&Co, notre priorité est de vous offrir des solutions sur mesure, répondant 
                avec précision à vos exigences professionnelles. Nous sommes dédiés à la qualité 
                et à l'efficacité, veillant à ce que chaque service proposé soit en parfaite 
                adéquation avec vos objectifs. Pour toute interrogation ou pour explorer ensemble 
                les opportunités d'accompagnement personnalisé que nous pouvons vous proposer, 
                notre équipe reste à votre entière disposition. Nous vous invitons chaleureusement 
                à prendre contact avec nous, afin de discuter des solutions adaptées à votre 
                situation unique.
              </p>
              <Link to="/contact">
                <Button variant="outline" className="border-lysco-turquoise text-lysco-turquoise hover:bg-lysco-turquoise hover:text-white">
                  Discuter de votre projet
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesAdmin;
