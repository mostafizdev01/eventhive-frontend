"use client"
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Download, QrCode, CheckCircle } from "lucide-react";
import { Column, DataTable } from "@/src/components/modules/Dashboard/host/DataTable";

interface Attendee {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  event: string;
  ticketType: string;
  amount: number;
  paymentStatus: "paid" | "unpaid" | "refunded";
  checkedIn: boolean;
  joinDate: string;
}

const attendees: Attendee[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", event: "Tech Summit 2024", ticketType: "VIP", amount: 100, paymentStatus: "paid", checkedIn: true, joinDate: "Dec 5, 2024" },
  { id: "2", name: "Mike Johnson", email: "mike@example.com", event: "Tech Summit 2024", ticketType: "Standard", amount: 50, paymentStatus: "paid", checkedIn: false, joinDate: "Dec 6, 2024" },
  { id: "3", name: "Emma Wilson", email: "emma@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", event: "Startup Workshop", ticketType: "Standard", amount: 35, paymentStatus: "unpaid", checkedIn: false, joinDate: "Dec 6, 2024" },
  { id: "4", name: "David Park", email: "david@example.com", event: "Tech Summit 2024", ticketType: "Standard", amount: 50, paymentStatus: "paid", checkedIn: true, joinDate: "Dec 4, 2024" },
  { id: "5", name: "Lisa Wang", email: "lisa@example.com", event: "AI Conference", ticketType: "Early Bird", amount: 60, paymentStatus: "paid", checkedIn: false, joinDate: "Dec 3, 2024" },
  { id: "6", name: "James Brown", email: "james@example.com", event: "Startup Workshop", ticketType: "Standard", amount: 35, paymentStatus: "refunded", checkedIn: false, joinDate: "Dec 2, 2024" },
  { id: "7", name: "Amy Lee", email: "amy@example.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", event: "Tech Summit 2024", ticketType: "VIP", amount: 100, paymentStatus: "paid", checkedIn: true, joinDate: "Dec 1, 2024" },
];

const columns: Column<Attendee>[] = [
  {
    key: "name",
    label: "Attendee",
    render: (attendee) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={attendee.avatar} />
          <AvatarFallback className="text-xs">{attendee.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{attendee.name}</p>
          <p className="text-sm text-muted-foreground">{attendee.email}</p>
        </div>
      </div>
    ),
  },
  { key: "event", label: "Event" },
  {
    key: "ticketType",
    label: "Ticket",
    render: (attendee) => (
      <Badge variant={attendee.ticketType === "VIP" ? "default" : "secondary"}>
        {attendee.ticketType}
      </Badge>
    ),
  },
  {
    key: "amount",
    label: "Amount",
    render: (attendee) => <span className="font-medium">${attendee.amount}</span>,
  },
  {
    key: "paymentStatus",
    label: "Payment",
    render: (attendee) => {
      const colors = {
        paid: "bg-green-500/10 text-green-600 border-green-500/20",
        unpaid: "bg-primary/10 text-primary border-primary/20",
        refunded: "bg-muted text-muted-foreground border-border",
      };
      return (
        <Badge variant="outline" className={colors[attendee.paymentStatus]}>
          {attendee.paymentStatus}
        </Badge>
      );
    },
  },
  {
    key: "checkedIn",
    label: "Check-in",
    render: (attendee) => (
      attendee.checkedIn ? (
        <div className="flex items-center gap-1 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">Checked In</span>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">Not yet</span>
      )
    ),
  },
  { key: "joinDate", label: "Joined" },
];

export default function HostAttendees() {
  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Attendee Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage attendees across all your events
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <QrCode className="h-4 w-4" />
              Check-in Scanner
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Event Filter */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filter by Event</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="tech-summit">Tech Summit 2024</SelectItem>
                  <SelectItem value="startup-workshop">Startup Workshop</SelectItem>
                  <SelectItem value="ai-conference">AI Conference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Payment Status</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Check-in Status</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="checked">Checked In</SelectItem>
                  <SelectItem value="not-checked">Not Checked In</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Attendees Table */}
        <DataTable
          data={attendees}
          columns={columns}
          searchPlaceholder="Search attendees by name or email..."
          actions={[
            { label: "View Details", onClick: (attendee) => console.log("View", attendee) },
            { label: "Check In", onClick: (attendee) => console.log("Check In", attendee) },
            { label: "Mark as Paid", onClick: (attendee) => console.log("Mark Paid", attendee) },
            { label: "Send Reminder", onClick: (attendee) => console.log("Remind", attendee) },
            { label: "Refund", onClick: (attendee) => console.log("Refund", attendee), variant: "destructive" },
          ]}
        />
      </div>
  );
}
