import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface WordPressPage {
  title: { rendered: string };
  content: { rendered: string };
}

const DomiciliationPage = () => {
  const [pageData, setPageData] = useState<WordPressPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data } = await axios.get('https://lys-and-co.com/wp-json/wp/v2/pages?slug=domiciliation');
        if (data.length > 0) {
          setPageData(data[0]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la page WordPress :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (!pageData) {
    return <div className="flex justify-center items-center min-h-screen">Page non trouvée.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8" dangerouslySetInnerHTML={{ __html: pageData.title.rendered }} />
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DomiciliationPage;
