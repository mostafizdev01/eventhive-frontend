"use client"
import { DataTable, Column } from "@/src/components/modules/Dashboard/host/DataTable";
import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

interface Event {
  id: string;
  title: string;
  host: string;
  category: string;
  date: string;
  location: string;
  attendees: number;
  capacity: number;
  revenue: number;
  status: "active" | "upcoming" | "cancelled" | "draft" | "pending";
}

const events: Event[] = [
  { id: "1", title: "Tech Summit 2024", host: "TechCorp Inc.", category: "Tech", date: "Dec 15, 2024", location: "San Francisco, CA", attendees: 450, capacity: 500, revenue: 22500, status: "active" },
  { id: "2", title: "Music Festival", host: "SoundWave Events", category: "Music", date: "Dec 20, 2024", location: "Los Angeles, CA", attendees: 1200, capacity: 2000, revenue: 48000, status: "upcoming" },
  { id: "3", title: "Art Workshop", host: "Creative Studios", category: "Art", date: "Dec 12, 2024", location: "New York, NY", attendees: 25, capacity: 30, revenue: 750, status: "active" },
  { id: "4", title: "Startup Pitch Night", host: "VentureLab", category: "Business", date: "Dec 18, 2024", location: "Austin, TX", attendees: 0, capacity: 100, revenue: 0, status: "pending" },
  { id: "5", title: "Gaming Tournament", host: "GameZone", category: "Gaming", date: "Dec 22, 2024", location: "Seattle, WA", attendees: 64, capacity: 128, revenue: 3200, status: "upcoming" },
  { id: "6", title: "Cancelled Concert", host: "MusicLive", category: "Music", date: "Dec 10, 2024", location: "Chicago, IL", attendees: 0, capacity: 500, revenue: 0, status: "cancelled" },
  { id: "7", title: "Photography Masterclass", host: "PhotoPro Academy", category: "Art", date: "Dec 25, 2024", location: "Miami, FL", attendees: 0, capacity: 50, revenue: 0, status: "draft" },
];

const columns: Column<Event>[] = [
  {
    key: "title",
    label: "Event",
    render: (event) => (
      <div>
        <p className="font-medium">{event.title}</p>
        <p className="text-sm text-muted-foreground">{event.host}</p>
      </div>
    ),
  },
  {
    key: "category",
    label: "Category",
    render: (event) => <Badge variant="secondary">{event.category}</Badge>,
  },
  { key: "date", label: "Date" },
  { key: "location", label: "Location" },
  {
    key: "attendees",
    label: "Attendees",
    render: (event) => (
      <span>
        {event.attendees}/{event.capacity}
      </span>
    ),
  },
  {
    key: "revenue",
    label: "Revenue",
    render: (event) => <span className="font-medium">${event.revenue.toLocaleString()}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (event) => {
      const colors = {
        active: "bg-green-500/10 text-green-600 border-green-500/20",
        upcoming: "bg-accent/10 text-accent border-accent/20",
        cancelled: "bg-destructive/10 text-destructive border-destructive/20",
        draft: "bg-muted text-muted-foreground border-border",
        pending: "bg-primary/10 text-primary border-primary/20",
      };
      return (
        <Badge variant="outline" className={colors[event.status]}>
          {event.status}
        </Badge>
      );
    },
  },
];

export default function AdminEvents() {
  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Event Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all events across the platform
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                1
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable
              data={events}
              columns={columns}
              searchPlaceholder="Search events..."
              filters={[
                {
                  key: "category",
                  label: "Category",
                  options: [
                    { value: "all", label: "All Categories" },
                    { value: "tech", label: "Tech" },
                    { value: "music", label: "Music" },
                    { value: "art", label: "Art" },
                    { value: "gaming", label: "Gaming" },
                    { value: "business", label: "Business" },
                  ],
                },
                {
                  key: "status",
                  label: "Status",
                  options: [
                    { value: "all", label: "All Status" },
                    { value: "active", label: "Active" },
                    { value: "upcoming", label: "Upcoming" },
                    { value: "pending", label: "Pending" },
                    { value: "cancelled", label: "Cancelled" },
                    { value: "draft", label: "Draft" },
                  ],
                },
              ]}
              actions={[
                { label: "View Details", onClick: (event) => console.log("View", event) },
                { label: "Approve", onClick: (event) => console.log("Approve", event) },
                { label: "Reject", onClick: (event) => console.log("Reject", event), variant: "destructive" },
                { label: "Cancel Event", onClick: (event) => console.log("Cancel", event), variant: "destructive" },
              ]}
            />
          </TabsContent>

          <TabsContent value="pending">
            <DataTable
              data={events.filter((e) => e.status === "pending")}
              columns={columns}
              searchPlaceholder="Search pending events..."
              actions={[
                { label: "View Details", onClick: (event) => console.log("View", event) },
                { label: "Approve", onClick: (event) => console.log("Approve", event) },
                { label: "Reject", onClick: (event) => console.log("Reject", event), variant: "destructive" },
              ]}
            />
          </TabsContent>

          <TabsContent value="active">
            <DataTable
              data={events.filter((e) => e.status === "active")}
              columns={columns}
              searchPlaceholder="Search active events..."
              actions={[
                { label: "View Details", onClick: (event) => console.log("View", event) },
                { label: "Cancel Event", onClick: (event) => console.log("Cancel", event), variant: "destructive" },
              ]}
            />
          </TabsContent>

          <TabsContent value="upcoming">
            <DataTable
              data={events.filter((e) => e.status === "upcoming")}
              columns={columns}
              searchPlaceholder="Search upcoming events..."
              actions={[
                { label: "View Details", onClick: (event) => console.log("View", event) },
                { label: "Cancel Event", onClick: (event) => console.log("Cancel", event), variant: "destructive" },
              ]}
            />
          </TabsContent>

          <TabsContent value="cancelled">
            <DataTable
              data={events.filter((e) => e.status === "cancelled")}
              columns={columns}
              searchPlaceholder="Search cancelled events..."
              actions={[
                { label: "View Details", onClick: (event) => console.log("View", event) },
                { label: "Restore Event", onClick: (event) => console.log("Restore", event) },
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
  );
}
