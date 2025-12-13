"use client"
import { Calendar, DollarSign, Ticket, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { StatsCard } from "@/src/components/modules/Dashboard/user/StatsCard";
import { EventCard } from "@/src/components/modules/Dashboard/user/EventCard";
import { HostEvent } from "../../host/dashboard/my-event/page";
import { useEffect, useState } from "react";
import { hostEvent } from "@/src/services/host/myEvent";

const stats = [
  {
    title: "Events Joined",
    value: "12",
    change: "+2 this month",
    changeType: "positive" as const,
    icon: Calendar,
    iconColor: "text-primary",
  },
  {
    title: "Upcoming Events",
    value: "3",
    description: "Don't miss them!",
    icon: Clock,
    iconColor: "text-accent",
  },
  {
    title: "Total Spent",
    value: "$450",
    change: "On tickets",
    changeType: "neutral" as const,
    icon: DollarSign,
    iconColor: "text-green-600",
  },
  {
    title: "Tickets",
    value: "15",
    description: "Active & past",
    icon: Ticket,
    iconColor: "text-primary",
  },
];

// const upcomingEvents = [
//   {
//     id: "1",
//     title: "Tech Summit 2024",
//     image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
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
//     title: "Music Festival",
//     image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
//     eventDate: "Dec 20, 2024",
//     location: "Los Angeles, CA",
//     category: "Music",
//     price: 40,
//     availableSeats: 1200,
//     totalSeats: 2000,
//     status: "upcoming" as const,
//   },
//   {
//     id: "3",
//     title: "Art Workshop",
//     image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400",
//     eventDate: "Dec 22, 2024",
//     location: "New York, NY",
//     category: "Art",
//     price: 30,
//     availableSeats: 25,
//     totalSeats: 30,
//     status: "active" as const,
//   },
// ];

// const pastEvents = [
//   {
//     id: "4",
//     title: "Startup Pitch Night",
//     image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400",
//     eventDate: "Nov 28, 2024",
//     location: "Austin, TX",
//     category: "Business",
//     price: 25,
//     availableSeats: 100,
//     totalSeats: 100,
//     status: "OPEN",
//   },
//   {
//     id: "5",
//     title: "Gaming Tournament",
//     image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
//     eventDate: "Nov 15, 2024",
//     location: "Seattle, WA",
//     category: "Gaming",
//     price: 50,
//     availableSeats: 64,
//     totalSeats: 128,
//     status: "OPEN",
//   },
// ];

export default function UserDashboard() {
  const [events, setEvents] = useState<HostEvent[]>([])
  console.log("events", events)
  useEffect(() => {
    const fetchEvent = async () => {
      setEvents(await hostEvent());
    }
    fetchEvent()
  }, [])
  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-poppins">My Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s your event activity.
          </p>
        </div>
        <Link href="/dashboard/explore">
          <Button className="btn-primary gap-2">
            Explore Events
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold font-poppins">Upcoming Events</h2>
          <Link href="/dashboard/events">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onView={() => console.log("View", event)}
            />
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold font-poppins">Past Events</h2>
          <Link href="/dashboard/events">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              variant="compact"
              onView={() => console.log("View", event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
