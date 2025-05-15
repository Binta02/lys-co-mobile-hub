
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export interface UserDomiciliation {
  status: 'active' | 'inactive' | 'pending';
  address: string;
  renewal_date: string;
}

export interface UserMail {
  id: string;
  subject: string;
  received_at: string;
  status: 'new' | 'read';
}

export interface UserNotification {
  id: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface UserActivity {
  id: string;
  type: 'mail' | 'document' | 'message';
  title: string;
  description: string;
  created_at: string;
}

export function useUserData() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [domiciliation, setDomiciliation] = useState<UserDomiciliation | null>(null);
  const [mails, setMails] = useState<UserMail[]>([]);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setLoading(false);
          return;
        }

        // Fetch user profile from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;
        
        setProfile({
          id: profileData?.id || session.user.id,
          email: session.user.email || '',
          first_name: profileData?.first_name || '',
          last_name: profileData?.last_name || '',
          created_at: profileData?.created_at || session.user.created_at
        });

        // Mock data for demonstration
        // In a real application, this would come from database tables
        setDomiciliation({
          status: 'active',
          address: '14 Avenue de l\'Opéra, 75001 Paris',
          renewal_date: '2026-01-01'
        });

        setMails([
          { id: '1', subject: 'Impôts - Déclaration TVA', received_at: new Date().toISOString(), status: 'new' },
          { id: '2', subject: 'Facture Électricité', received_at: new Date(Date.now() - 86400000).toISOString(), status: 'new' },
          { id: '3', subject: 'Contrat Fournisseur', received_at: new Date(Date.now() - 172800000).toISOString(), status: 'new' },
          { id: '4', subject: 'Banque - Relevé mensuel', received_at: new Date(Date.now() - 259200000).toISOString(), status: 'read' },
          { id: '5', subject: 'Assurance Habitation', received_at: new Date(Date.now() - 345600000).toISOString(), status: 'read' },
        ]);

        setNotifications([
          { id: '1', message: 'Nouveau courrier reçu', created_at: new Date().toISOString(), read: false },
          { id: '2', message: 'Document numérisé disponible', created_at: new Date(Date.now() - 86400000).toISOString(), read: false },
          { id: '3', message: 'Mise à jour de vos documents légaux', created_at: new Date(Date.now() - 172800000).toISOString(), read: true },
        ]);

        setActivities([
          { 
            id: '1', 
            type: 'mail', 
            title: 'Nouveau courrier reçu', 
            description: 'Impôts - Déclaration TVA', 
            created_at: new Date().toISOString() 
          },
          { 
            id: '2', 
            type: 'document', 
            title: 'Document numérisé', 
            description: 'Contrat_Prestation_2025.pdf', 
            created_at: new Date(Date.now() - 86400000).toISOString() 
          },
          { 
            id: '3', 
            type: 'message', 
            title: 'Message de votre assistant', 
            description: 'Mise à jour de vos documents légaux', 
            created_at: new Date(Date.now() - 172800000).toISOString() 
          },
        ]);

      } catch (err: any) {
        setError(err.message);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les informations utilisateur",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return {
    profile,
    domiciliation,
    mails,
    notifications,
    activities,
    loading,
    error
  };
}
