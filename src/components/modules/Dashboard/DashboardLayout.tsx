"use client"
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  UserCircle,
  Home,
  Plus,
  Ticket,
  BarChart3,
  UserCheck,
  FileText,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Input } from "../../ui/input";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}


const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Hosts", href: "/admin/hosts", icon: UserCheck },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const hostNav: NavItem[] = [
  { label: "Overview", href: "/host", icon: LayoutDashboard },
  { label: "My Events", href: "/host/events", icon: Calendar },
  { label: "Create Event", href: "/host/create", icon: Plus },
  { label: "Attendees", href: "/host/attendees", icon: Users },
  { label: "Revenue", href: "/host/revenue", icon: BarChart3 },
  { label: "Settings", href: "/host/settings", icon: Settings },
];

const userNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Explore", href: "/dashboard/explore", icon: Search },
  { label: "My Tickets", href: "/dashboard/tickets", icon: Ticket },
  { label: "My Events", href: "/dashboard/events", icon: Calendar },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const getNavItems = (role: "admin" | "host" | "user") => {
  switch (role) {
    case "admin":
      return adminNav;
    case "host":
      return hostNav;
    case "user":
      return userNav;
  }
};

const getRoleLabel = (role: "admin" | "host" | "user") => {
  switch (role) {
    case "admin":
      return { label: "Admin", color: "bg-destructive" };
    case "host":
      return { label: "Host", color: "bg-primary" };
    case "user":
      return { label: "Attendee", color: "bg-accent" };
  }
};

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = "host"
  const navItems = getNavItems(role);
  const roleInfo = getRoleLabel(role);

  return (
    <div className="bg-muted/30 block">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden pointer-events-none"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="font-poppins font-bold text-lg">EventHive</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Role Badge */}
          <div className="px-4 py-3 border-b border-border">
            <Badge className={cn("text-xs font-medium", roleInfo.color)}>
              {roleInfo.label} Dashboard
            </Badge>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted transition-colors">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

            <div className="lg:pl-64">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 h-16 bg-card/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="hidden sm:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-64 pl-9 bg-muted/50 border-0 focus-visible:ring-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
