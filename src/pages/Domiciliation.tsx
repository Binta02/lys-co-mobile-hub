import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';

interface WordPressPage {
  title: { rendered: string };
  content: { rendered: string };
}

const Domiciliation = () => {
  const [pageData, setPageData] = useState<WordPressPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(
          'https://lys-and-co.com/wp-json/wp/v2/pages?slug=domiciliation'
        );
        setPageData(response.data[0]);
      } catch (error) {
        console.error('Erreur de récupération WordPress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-lg font-semibold">Chargement...</p>
          </div>
        ) : pageData ? (
          <section className="py-16 container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6">{pageData.title.rendered}</h1>
            <div 
              className="prose max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
            />
          </section>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p className="text-lg text-red-600">Impossible de charger la page.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Domiciliation;
