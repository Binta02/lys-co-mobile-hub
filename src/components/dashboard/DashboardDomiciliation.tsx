
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const DashboardDomiciliation = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations de domiciliation</CardTitle>
          <CardDescription>Détails de votre adresse commerciale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm">Adresse de domiciliation</h4>
                <p className="text-gray-600">14 Avenue de l'Opéra</p>
                <p className="text-gray-600">75001 Paris</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Statut du contrat</h4>
                <p className="text-green-600">Actif</p>
                <p className="text-sm text-gray-600">Renouvellement: 01/01/2026</p>
              </div>
            </div>
            <Button variant="outline">Modifier les informations</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services inclus</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Réception du courrier</TableCell>
                <TableCell>
                  <span className="text-green-600">Actif</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Numérisation des documents</TableCell>
                <TableCell>
                  <span className="text-green-600">Actif</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Transfert du courrier</TableCell>
                <TableCell>
                  <span className="text-amber-600">En option</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardDomiciliation;
