"use client";

import { DashboardLayout } from "@/components/pages/dashboard-page";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Configuración">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Actualiza la información de tu perfil.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" defaultValue="Sofia Diaz" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="sofia.diaz@example.com" />
            </div>
            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Gestiona tus preferencias de notificación.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Notificaciones por Email</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Notificaciones Push</Label>
              <Switch id="push-notifications" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
