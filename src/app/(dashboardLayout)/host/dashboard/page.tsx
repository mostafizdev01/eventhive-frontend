"use client"
import { RecentActivity } from "@/src/components/modules/Dashboard/host/RecentActivity";
import { RevenueChart } from "@/src/components/modules/Dashboard/host/RevenueChart";
// import { EventCard } from "@/src/components/modules/Dashboard/user/EventCard";
import { StatsCard } from "@/src/components/modules/Dashboard/user/StatsCard";
import { Button } from "@/src/components/ui/button";
import { Calendar, Users, DollarSign, Ticket, AlertTriangle, Plus } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Events",
    value: "24",
    change: "+3 this month",
    changeType: "positive" as const,
    icon: Calendar,
    iconColor: "text-primary",
  },
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+22.5% from last month",
    changeType: "positive" as const,
    icon: DollarSign,
    iconColor: "text-green-600",
  },
  {
    title: "Total Attendees",
    value: "1,847",
    change: "+156 this week",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "text-accent",
  },
  {
    title: "Tickets Sold",
    value: "2,156",
    change: "+89 this week",
    changeType: "positive" as const,
    icon: Ticket,
    iconColor: "text-primary",
  },
];

const revenueData = [
  { month: "Jan", revenue: 800 },
  { month: "Feb", revenue: 1200 },
  { month: "Mar", revenue: 950 },
  { month: "Apr", revenue: 1400 },
  { month: "May", revenue: 1100 },
  { month: "Jun", revenue: 1650 },
  { month: "Jul", revenue: 1300 },
  { month: "Aug", revenue: 1800 },
  { month: "Sep", revenue: 2100 },
  { month: "Oct", revenue: 1950 },
  { month: "Nov", revenue: 2400 },
  { month: "Dec", revenue: 2800 },
];

const activities = [
  {
    id: "1",
    user: { name: "Sarah Chen", initials: "SC", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    action: "joined your event",
    target: "Tech Summit 2024",
    time: "5 minutes ago",
    type: "join" as const,
  },
  {
    id: "2",
    user: { name: "Mike Johnson", initials: "MJ" },
    action: "completed payment for",
    target: "Tech Summit 2024",
    time: "12 minutes ago",
    type: "payment" as const,
  },
  {
    id: "3",
    user: { name: "Emma Wilson", initials: "EW", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    action: "joined your event",
    target: "Startup Workshop",
    time: "1 hour ago",
    type: "join" as const,
  },
  {
    id: "4",
    user: { name: "David Park", initials: "DP" },
    action: "requested refund for",
    target: "Tech Summit 2024",
    time: "2 hours ago",
    type: "payment" as const,
  },
];

// const upcomingEvents = [
//   {
//     id: "1",
//     title: "Tech Summit 2024",
//     bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
//     eventDate: "Dec 15, 2024",
//     location: "San Francisco, CA",
//     category: "Tech",
//     price: 50,
//     availableSeats: 450,
//     totalSeats: 500,
//     status: "active" as const,
//   },
//   {
//     id: "2",
//     title: "Startup Workshop",
//     bannerImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
//     eventDate: "Dec 18, 2024",
//     location: "Palo Alto, CA",
//     category: "Business",
//     price: 35,
//     availableSeats: 28,
//     totalSeats: 30,
//     status: "active" as const,
//   },
//   {
//     id: "3",
//     title: "AI Conference",
//     bannerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
//     eventDate: "Dec 22, 2024",
//     location: "San Jose, CA",
//     category: "Tech",
//     price: 75,
//     availableSeats: 120,
//     totalSeats: 200,
//     status: "upcoming" as const,
//   },
// ];

export default function HostDashboard() {
  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Host Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here&apos;s an overview of your events.
            </p>
          </div>
          <Link href="/host/dashboard/create-event">
            <Button className="btn-primary gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Low Capacity Warning */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Low Capacity Alert</p>
            <p className="text-sm text-muted-foreground">
              &quot;Startup Workshop&quot; is almost full (28/30 spots). Consider increasing capacity or creating another session.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Manage Event
          </Button>
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} title="Your Revenue" />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity activities={activities} title="Recent Activity" />
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold font-poppins">Upcoming Events</h2>
            <Link href="/host/events">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents?.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onEdit={() => console.log("Edit", event)}
                onView={() => console.log("View", event)}
              />
            ))}
          </div> */}
        </div>
      </div>
  );
}
