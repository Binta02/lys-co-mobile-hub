
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const DashboardAdmin = () => {
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
                <TableHead>Prochain traitement</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Déclaration TVA</TableCell>
                <TableCell>05/05/2025</TableCell>
                <TableCell>
                  <span className="text-amber-600">En attente</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gestion comptable</TableCell>
                <TableCell>30/04/2025</TableCell>
                <TableCell>
                  <span className="text-green-600">À jour</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Secrétariat juridique</TableCell>
                <TableCell>15/05/2025</TableCell>
                <TableCell>
                  <span className="text-green-600">À jour</span>
                </TableCell>
              </TableRow>
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
              <TableRow>
                <TableCell>Facture_Mars2025.pdf</TableCell>
                <TableCell>01/04/2025</TableCell>
                <TableCell>Comptabilité</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PV_AG_2025.pdf</TableCell>
                <TableCell>15/03/2025</TableCell>
                <TableCell>Juridique</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAdmin;
