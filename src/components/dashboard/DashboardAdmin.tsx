
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useUserData } from '@/hooks/useUserData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const DashboardAdmin = () => {
  const { adminServices, documents, loading } = useUserData();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lysco-turquoise"></div>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: fr });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Services administratifs</CardTitle>
          <CardDescription>État de vos services administratifs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Prochain traitement</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminServices.map(service => (
                <TableRow key={service.id}>
                  <TableCell>{service.service}</TableCell>
                  <TableCell className="max-w-xs">
                    {service.description || getServiceDescription(service.service)}
                  </TableCell>
                  <TableCell>{formatDate(service.next_processing)}</TableCell>
                  <TableCell>
                    <span className={
                      service.status === 'active' ? 'text-green-600' :
                      service.status === 'pending' ? 'text-amber-600' :
                      'text-blue-600'
                    }>
                      {service.status === 'active' ? 'À jour' :
                       service.status === 'pending' ? 'En attente' :
                       'Terminé'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents récents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{formatDate(doc.created_at)}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to provide descriptions for services
const getServiceDescription = (serviceName: string): string => {
  const descriptions: Record<string, string> = {
    "Déclaration TVA": "Préparation et soumission de vos déclarations TVA aux périodes requises.",
    "Gestion comptable": "Tenue complète de vos comptes et préparation des documents comptables obligatoires.",
    "Secrétariat juridique": "Préparation des documents juridiques et conformité avec les obligations légales."
  };
  
  return descriptions[serviceName] || "Description non disponible";
};

export default DashboardAdmin;
