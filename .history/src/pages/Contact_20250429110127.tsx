
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Form submission logic will be implemented later
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData(e.target as HTMLFormElement);
  
    try {
      // const response = await fetch('http://localhost:8000/send_mail.php', {
      //   method: 'POST',
      //   body: formData,
      // });
      const response = await fetch('http://localhost:8000/send_mail.php', {
        method: 'POST',
        body: formData,
      });
      
  
      const result = await response.text();
      if (result === 'success') {
        alert('Message envoyé avec succès !');
      } else {
        alert('Erreur lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi du message.');
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
              <p className="text-xl text-gray-600 mb-8">
                Notre équipe est à votre disposition pour répondre à toutes vos questions
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-lysco-turquoise mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-gray-600">28 Rue de l'Eglise, 95210 Deuil-la-Barre</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-lysco-turquoise mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <p className="text-gray-600">09 53 42 11 63 / 07 56 85 37 02 </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-lysco-turquoise mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">contact@lys-and-co.com</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" name="firstName" placeholder="Votre prénom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" name="lastName" placeholder="Votre nom" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" name="email" placeholder="votre@email.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input id="subject" name="subject" placeholder="Sujet de votre message" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        name="message" 
                        placeholder="Votre message..." 
                        className="min-h-[150px]" 
                        required 
                      />
                    </div>

                    <Button type="submit" className="w-full bg-lysco-turquoise hover:bg-opacity-90">
                      Envoyer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
