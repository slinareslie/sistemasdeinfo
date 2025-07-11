"use client";

import { DashboardLayout } from "@/components/pages/dashboard-page";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const users = [
  {
    name: "Sofia Diaz",
    email: "sofia.diaz@example.com",
    role: "admin",
  },
  {
    name: "Carlos Gomez",
    email: "carlos.gomez@example.com",
    role: "viewer",
  },
   {
    name: "Ana Lopez",
    email: "ana.lopez@example.com",
    role: "viewer",
  },
];

export default function UserManagementPage() {
  return (
    <DashboardLayout title="Gestión de Usuarios">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestionar Usuarios</h2>
        <Button>
          <PlusCircle className="mr-2" />
          Añadir Usuario
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Usuarios del Sistema</CardTitle>
          <CardDescription>
            Añade, elimina y gestiona los roles de los usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                     <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
