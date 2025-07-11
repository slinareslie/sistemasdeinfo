"use client"

import * as React from "react"
import {
  Bell,
  BookText,
  Cpu,
  DatabaseZap,
  Home,
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
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
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

const mockUser = {
  name: "Sofia Diaz",
  email: "sofia.diaz@example.com",
  role: "admin", // Change to 'viewer' to test role-based UI
  avatar: "https://placehold.co/100x100.png"
};

function MainNav() {
  const { open } = useSidebar()
  const activeClass = "bg-primary/10 text-primary hover:text-primary"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton href="/" isActive>
          <LayoutDashboard />
          <span className="truncate">Dashboard</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton href="#">
          <DatabaseZap />
          <span className="truncate">Data Sources</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton href="#">
          <Sparkles />
          <span className="truncate">AI Insights</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton href="#">
          <BookText />
          <span className="truncate">Reports</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {mockUser.role === 'admin' && (
        <SidebarMenuItem>
          <SidebarMenuButton href="#">
            <Users />
            <span className="truncate">User Management</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
      <SidebarMenuItem>
        <SidebarMenuButton href="#">
          <Settings />
          <span className="truncate">Settings</span>
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
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href="/login">
          <DropdownMenuItem>
            Log out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <LineChart className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold font-headline">InsightFlow</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <PowerBiEmbed />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <DataUpload />
                <AiInsights />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
