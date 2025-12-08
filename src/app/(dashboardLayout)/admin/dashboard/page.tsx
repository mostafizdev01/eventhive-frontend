"use client"
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import {
  Users,
  Calendar,
  AlertCircle,
  Clock,
  UserCheck,
  DollarSign,
} from "lucide-react";
import { StatsCard } from "@/src/components/modules/Dashboard/user/StatsCard";
import { RevenueChart } from "@/src/components/modules/Dashboard/host/RevenueChart";
import { RecentActivity } from "@/src/components/modules/Dashboard/host/RecentActivity";
import { DataTable, Column } from "@/src/components/modules/Dashboard/host/DataTable";

// Mock data
const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5% from last month",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "text-accent",
  },
  {
    title: "Total Hosts",
    value: "1,234",
    change: "+8.2% from last month",
    changeType: "positive" as const,
    icon: UserCheck,
    iconColor: "text-primary",
  },
  {
    title: "Total Events",
    value: "3,567",
    change: "+23.1% from last month",
    changeType: "positive" as const,
    icon: Calendar,
    iconColor: "text-green-600",
  },
  {
    title: "Total Revenue",
    value: "$89,420",
    change: "+18.7% from last month",
    changeType: "positive" as const,
    icon: DollarSign,
    iconColor: "text-primary",
  },
  {
    title: "Unpaid Payments",
    value: "23",
    change: "Requires attention",
    changeType: "negative" as const,
    icon: AlertCircle,
    iconColor: "text-destructive",
  },
  {
    title: "Pending Events",
    value: "47",
    change: "Awaiting approval",
    changeType: "neutral" as const,
    icon: Clock,
    iconColor: "text-muted-foreground",
  },
];

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 6400 },
  { month: "May", revenue: 8900 },
  { month: "Jun", revenue: 11200 },
  { month: "Jul", revenue: 9800 },
  { month: "Aug", revenue: 12400 },
  { month: "Sep", revenue: 14200 },
  { month: "Oct", revenue: 16800 },
  { month: "Nov", revenue: 15200 },
  { month: "Dec", revenue: 18900 },
];

const activities = [
  {
    id: "1",
    user: { name: "Sarah Chen", initials: "SC", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    action: "joined event",
    target: "Tech Summit 2024",
    time: "2 minutes ago",
    type: "join" as const,
  },
  {
    id: "2",
    user: { name: "Mike Johnson", initials: "MJ" },
    action: "completed payment for",
    target: "Music Festival",
    time: "15 minutes ago",
    type: "payment" as const,
  },
  {
    id: "3",
    user: { name: "Emma Wilson", initials: "EW", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    action: "created new event",
    target: "Art Workshop",
    time: "1 hour ago",
    type: "event" as const,
  },
  {
    id: "4",
    user: { name: "John Smith", initials: "JS" },
    action: "registered as new user",
    time: "2 hours ago",
    type: "user" as const,
  },
  {
    id: "5",
    user: { name: "System", initials: "SY" },
    action: "auto-approved host application for",
    target: "David Park",
    time: "3 hours ago",
    type: "system" as const,
  },
];

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  joinDate: string;
  status: "active" | "banned" | "pending";
}

const recentUsers: User[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", role: "user", joinDate: "Dec 7, 2024", status: "active" },
  { id: "2", name: "Mike Johnson", email: "mike@example.com", role: "host", joinDate: "Dec 6, 2024", status: "active" },
  { id: "3", name: "Emma Wilson", email: "emma@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", role: "user", joinDate: "Dec 5, 2024", status: "pending" },
  { id: "4", name: "David Park", email: "david@example.com", role: "host", joinDate: "Dec 4, 2024", status: "active" },
  { id: "5", name: "Lisa Wang", email: "lisa@example.com", role: "user", joinDate: "Dec 3, 2024", status: "banned" },
];

const userColumns: Column<User>[] = [
  {
    key: "name",
    label: "User",
    render: (user) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="text-xs">{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    render: (user) => (
      <Badge variant={user.role === "host" ? "default" : "secondary"}>
        {user.role}
      </Badge>
    ),
  },
  { key: "joinDate", label: "Join Date" },
  {
    key: "status",
    label: "Status",
    render: (user) => {
      const colors = {
        active: "bg-green-500/10 text-green-600",
        banned: "bg-destructive/10 text-destructive",
        pending: "bg-primary/10 text-primary",
      };
      return (
        <Badge variant="outline" className={colors[user.status]}>
          {user.status}
        </Badge>
      );
    },
  },
];

export default function AdminDashboard() {
  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with EventHive today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity activities={activities} />
          </div>
        </div>

        {/* Recent Users Table */}
        <DataTable
          title="Latest Registered Users"
          description="New users who joined the platform"
          data={recentUsers}
          columns={userColumns}
          searchPlaceholder="Search users..."
          filters={[
            {
              key: "role",
              label: "Role",
              options: [
                { value: "all", label: "All Roles" },
                { value: "user", label: "User" },
                { value: "host", label: "Host" },
              ],
            },
            {
              key: "status",
              label: "Status",
              options: [
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "pending", label: "Pending" },
                { value: "banned", label: "Banned" },
              ],
            },
          ]}
          actions={[
            { label: "View Profile", onClick: (user) => console.log("View", user) },
            { label: "Edit User", onClick: (user) => console.log("Edit", user) },
            { label: "Ban User", onClick: (user) => console.log("Ban", user), variant: "destructive" },
          ]}
        />
      </div>
  );
}
