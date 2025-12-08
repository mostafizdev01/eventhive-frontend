"use client"
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, Column } from "@/src/components/modules/Dashboard/host/DataTable";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  events: number;
  spent: number;
  joinDate: string;
  status: "active" | "banned" | "pending";
}

const users: User[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", role: "user", events: 12, spent: 450, joinDate: "Dec 7, 2024", status: "active" },
  { id: "2", name: "Mike Johnson", email: "mike@example.com", role: "host", events: 5, spent: 200, joinDate: "Dec 6, 2024", status: "active" },
  { id: "3", name: "Emma Wilson", email: "emma@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", role: "user", events: 8, spent: 320, joinDate: "Dec 5, 2024", status: "pending" },
  { id: "4", name: "David Park", email: "david@example.com", role: "host", events: 15, spent: 0, joinDate: "Dec 4, 2024", status: "active" },
  { id: "5", name: "Lisa Wang", email: "lisa@example.com", role: "user", events: 3, spent: 150, joinDate: "Dec 3, 2024", status: "banned" },
  { id: "6", name: "James Brown", email: "james@example.com", role: "user", events: 7, spent: 280, joinDate: "Dec 2, 2024", status: "active" },
  { id: "7", name: "Amy Lee", email: "amy@example.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", role: "host", events: 22, spent: 0, joinDate: "Dec 1, 2024", status: "active" },
  { id: "8", name: "Tom Harris", email: "tom@example.com", role: "user", events: 1, spent: 50, joinDate: "Nov 30, 2024", status: "pending" },
];

const columns: Column<User>[] = [
  {
    key: "name",
    label: "User",
    render: (user) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="text-xs">{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    render: (user) => (
      <Badge variant={user.role === "host" ? "default" : "secondary"} className="capitalize">
        {user.role}
      </Badge>
    ),
  },
  { key: "events", label: "Events Joined" },
  {
    key: "spent",
    label: "Total Spent",
    render: (user) => <span className="font-medium">${user.spent}</span>,
  },
  { key: "joinDate", label: "Join Date" },
  {
    key: "status",
    label: "Status",
    render: (user) => {
      const colors = {
        active: "bg-green-500/10 text-green-600 border-green-500/20",
        banned: "bg-destructive/10 text-destructive border-destructive/20",
        pending: "bg-primary/10 text-primary border-primary/20",
      };
      return (
        <Badge variant="outline" className={colors[user.status]}>
          {user.status}
        </Badge>
      );
    },
  },
];

export default function AdminUsers() {
  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-poppins">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage all registered users on the platform
            </p>
          </div>
          <Button className="btn-primary gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Users Table */}
        <DataTable
          data={users}
          columns={columns}
          searchPlaceholder="Search users by name or email..."
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
            { label: "Edit Role", onClick: (user) => console.log("Edit", user) },
            { label: "Ban User", onClick: (user) => console.log("Ban", user), variant: "destructive" },
            { label: "Delete User", onClick: (user) => console.log("Delete", user), variant: "destructive" },
          ]}
        />
      </div>
  );
}
