import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  company_name?: string;
  phone?: string;
}

export interface UserDomiciliation {
  id?: string;
  user_id?: string;
  status: 'active' | 'inactive' | 'pending';
  address: string;
  renewal_date: string;
  created_at?: string;
}

export interface UserMail {
  id: string;
  user_id?: string;
  subject: string;
  received_at: string;
  status: 'new' | 'read';
}

export interface UserNotification {
  id: string;
  user_id?: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface UserActivity {
  id: string;
  user_id?: string;
  type: 'mail' | 'document' | 'message';
  title: string;
  description: string;
  created_at: string;
}

export interface UserDocument {
  id: string;
  user_id?: string;
  name: string;
  created_at: string;
  type: string;
}

export interface UserAdminService {
  id: string;
  user_id?: string;
  service: string;
  next_processing: string;
  status: 'pending' | 'active' | 'completed';
}

export function useUserData() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [domiciliation, setDomiciliation] = useState<UserDomiciliation | null>(null);
  const [mails, setMails] = useState<UserMail[]>([]);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [adminServices, setAdminServices] = useState<UserAdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        company_name: profileData?.company_name || '',
        phone: profileData?.phone || '',
        created_at: profileData?.created_at || session.user.created_at
      });

      // For now, we'll use placeholder data until we create those tables
      // In a production app, we would fetch this data from Supabase
      setDomiciliation({
        user_id: session.user.id,
        status: 'active',
        address: '14 Avenue de l\'Opéra, 75001 Paris',
        renewal_date: '2026-01-01'
      });

      setMails([
        { id: '1', user_id: session.user.id, subject: 'Impôts - Déclaration TVA', received_at: new Date().toISOString(), status: 'new' },
        { id: '2', user_id: session.user.id, subject: 'Facture Électricité', received_at: new Date(Date.now() - 86400000).toISOString(), status: 'new' },
        { id: '3', user_id: session.user.id, subject: 'Contrat Fournisseur', received_at: new Date(Date.now() - 172800000).toISOString(), status: 'new' },
      ]);

      setNotifications([
        { id: '1', user_id: session.user.id, message: 'Nouveau courrier reçu', created_at: new Date().toISOString(), read: false },
        { id: '2', user_id: session.user.id, message: 'Document numérisé disponible', created_at: new Date(Date.now() - 86400000).toISOString(), read: false },
      ]);

      setActivities([
        { 
          id: '1', 
          user_id: session.user.id,
          type: 'mail', 
          title: 'Nouveau courrier reçu', 
          description: 'Impôts - Déclaration TVA', 
          created_at: new Date().toISOString() 
        },
        { 
          id: '2', 
          user_id: session.user.id,
          type: 'document', 
          title: 'Document numérisé', 
          description: 'Contrat_Prestation_2025.pdf', 
          created_at: new Date(Date.now() - 86400000).toISOString() 
        },
        { 
          id: '3', 
          user_id: session.user.id,
          type: 'message', 
          title: 'Message de votre assistant', 
          description: 'Mise à jour de vos documents légaux', 
          created_at: new Date(Date.now() - 172800000).toISOString() 
        },
      ]);

      setDocuments([
        { id: '1', user_id: session.user.id, name: 'Facture_Mars2025.pdf', created_at: '2025-04-01T10:00:00Z', type: 'Comptabilité' },
        { id: '2', user_id: session.user.id, name: 'PV_AG_2025.pdf', created_at: '2025-03-15T14:30:00Z', type: 'Juridique' },
      ]);

      setAdminServices([
        { id: '1', user_id: session.user.id, service: 'Déclaration TVA', next_processing: '2025-05-05T00:00:00Z', status: 'pending' },
        { id: '2', user_id: session.user.id, service: 'Gestion comptable', next_processing: '2025-04-30T00:00:00Z', status: 'active' },
        { id: '3', user_id: session.user.id, service: 'Secrétariat juridique', next_processing: '2025-05-15T00:00:00Z', status: 'active' },
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

  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to update user profile
  const updateProfile = async (updatedProfile: Partial<UserProfile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', profile?.id);

      if (error) throw error;
      
      // Refresh data
      toast({
        title: "Succès",
        description: "Votre profil a été mis à jour",
      });
      
      await fetchUserData();
      return true;
    } catch (err: any) {
      toast({
        title: "Erreur",
        description: err.message || "Impossible de mettre à jour le profil",
        variant: "destructive"
      });
      return false;
    }
  };

  // Function to update domiciliation information
  const updateDomiciliation = async (updatedDomiciliation: Partial<UserDomiciliation>) => {
    try {
      // In a production app, we would update the domiciliation in Supabase
      // For now, we'll just update the state
      setDomiciliation(prev => {
        if (!prev) return null;
        return { ...prev, ...updatedDomiciliation };
      });

      toast({
        title: "Succès",
        description: "Informations de domiciliation mises à jour",
      });
      
      return true;
    } catch (err: any) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les informations de domiciliation",
        variant: "destructive"
      });
      return false;
    }
  };

  // Function to mark mail as read
  const markMailAsRead = async (mailId: string) => {
    try {
      // In a production app, we would update the mail in Supabase
      // For now, we'll just update the state
      setMails(prev => prev.map(mail => 
        mail.id === mailId ? { ...mail, status: 'read' } : mail
      ));
      
      return true;
    } catch (err: any) {
      toast({
        title: "Erreur",
        description: "Impossible de marquer le courrier comme lu",
        variant: "destructive"
      });
      return false;
    }
  };

  // Function to mark notification as read
  const markNotificationAsRead = async (notificationId: string) => {
    try {
      // In a production app, we would update the notification in Supabase
      // For now, we'll just update the state
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      ));
      
      return true;
    } catch (err: any) {
      toast({
        title: "Erreur",
        description: "Impossible de marquer la notification comme lue",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    profile,
    domiciliation,
    mails,
    notifications,
    activities,
    documents,
    adminServices,
    loading,
    error,
    updateProfile,
    updateDomiciliation,
    markMailAsRead,
    markNotificationAsRead,
    refreshUserData: fetchUserData
  };
}
