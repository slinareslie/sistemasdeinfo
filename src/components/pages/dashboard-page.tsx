"use client"

import * as React from "react"
import {
  Bell,
  BookText,
  DatabaseZap,
  LayoutDashboard,
  LineChart,
  Settings,
  Sparkles,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PowerBiEmbed from "@/components/dashboard/power-bi-embed"
import DataUpload from "@/components/dashboard/data-upload"
import AiInsights from "@/components/dashboard/ai-insights"
import { usePathname } from "next/navigation"

const mockUser = {
  name: "Sofia Diaz",
  email: "sofia.diaz@example.com",
  role: "admin", // Cambia a 'viewer' para probar la interfaz basada en roles
  avatar: "https://placehold.co/100x100.png"
};

function MainNav() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton href="/" isActive={pathname === '/'}>
          <LayoutDashboard />
          <span className="truncate">Dashboard</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem>
        <SidebarMenuButton href="/dashboard-2" isActive={pathname === '/dashboard-2'}>
          <LayoutDashboard />
          <span className="truncate">Dashboard Analítico</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton href="/data-sources" isActive={pathname === '/data-sources'}>
          <DatabaseZap />
          <span className="truncate">Fuentes de Datos</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton href="/ai-insights" isActive={pathname === '/ai-insights'}>
          <Sparkles />
          <span className="truncate">Ideas con IA</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton href="/reports" isActive={pathname === '/reports'}>
          <BookText />
          <span className="truncate">Reportes</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {mockUser.role === 'admin' && (
        <SidebarMenuItem>
          <SidebarMenuButton href="/user-management" isActive={pathname === '/user-management'}>
            <Users />
            <span className="truncate">Gestión de Usuarios</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
      <SidebarMenuItem>
        <SidebarMenuButton href="/settings" isActive={pathname === '/settings'}>
          <Settings />
          <span className="truncate">Configuración</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} data-ai-hint="person portrait" />
            <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{mockUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {mockUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">Perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Facturación</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Configuración</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login">Cerrar sesión</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Header({title}: {title: string}) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Ver notificaciones</span>
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}


export function DashboardLayout({ children, title }: { children: React.ReactNode, title: string }) {
  return (
     <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <LineChart className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold">InsightFlow</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <Header title={title}/>
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}


export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <PowerBiEmbed />
        </div>
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6 items-start">
          {mockUser.role === 'admin' && <DataUpload /> }
          <AiInsights />
        </div>
      </div>
    </DashboardLayout>
  )
}
