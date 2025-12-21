
"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Plus, Search, Grid, List } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { EventCard } from "@/src/components/modules/Dashboard/user/EventCard";
import { hostEvent } from "@/src/services/host/myEvent";
import { EventCardSkeleton } from "./skeleton";

export interface HostEvent {
  id: string;
  title: string;
  bannerImage: string;
  eventDate: string;
  location: string;
  category: string;
  price: number | "Free";
  availableSeats: number;
  totalSeats: number;
  status?: "OPEN" | "CLOSE" | "CANCELLED"
  onJoin?: () => void;
  onEdit?: () => void;
  onView?: () => void;
  variant?: "default" | "compact";
}

// const events = [
//   {
//     id: "1",
//     title: "Tech Summit 2024",
//     image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
//     date: "Dec 15, 2024",
//     location: "San Francisco, CA",
//     category: "Tech",
//     price: 50,
//     attendees: 450,
//     capacity: 500,
//     status: "active" as const,
//   },
//   {
//     id: "2",
//     title: "Startup Workshop",
//     image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
//     date: "Dec 18, 2024",
//     location: "Palo Alto, CA",
//     category: "Business",
//     price: 35,
//     attendees: 28,
//     capacity: 30,
//     status: "active" as const,
//   },
//   {
//     id: "3",
//     title: "AI Conference",
//     image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
//     date: "Dec 22, 2024",
//     location: "San Jose, CA",
//     category: "Tech",
//     price: 75,
//     attendees: 120,
//     capacity: 200,
//     status: "upcoming" as const,
//   },
//   {
//     id: "4",
//     title: "Networking Mixer",
//     image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
//     date: "Dec 28, 2024",
//     location: "Oakland, CA",
//     category: "Networking",
//     price: "Free" as const,
//     attendees: 45,
//     capacity: 100,
//     status: "upcoming" as const,
//   },
//   {
//     id: "5",
//     title: "Product Launch Event",
//     image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400",
//     date: "Jan 5, 2025",
//     location: "San Francisco, CA",
//     category: "Business",
//     price: 0,
//     attendees: 0,
//     capacity: 150,
//     status: "draft" as const,
//   },
//   {
//     id: "6",
//     title: "Design Thinking Workshop",
//     image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
//     date: "Nov 20, 2024",
//     location: "Berkeley, CA",
//     category: "Design",
//     price: 40,
//     attendees: 25,
//     capacity: 25,
//     status: "cancelled" as const,
//   },
// ];

export default function HostEvents() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [events, setEvents] = useState<HostEvent[]>([])
  // console.log("events", events)
  useEffect(() => {
    const fetchEvent = async () => {
      setEvents(await hostEvent());
    }
    fetchEvent()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-poppins">My Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your created events
          </p>
        </div>
        <Link href="/host/dashboard/create-event">
          <Button className="btn-primary gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Search & View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Events
            <Badge variant="secondary" className="ml-2 h-5 px-1.5">
              {events.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {
              !events || events.length === 0 ?
                (
                  Array.from({ length: 6 }).map((_, i) =>
                    <EventCardSkeleton key={i} />
                  ))
                :
                (events?.map((event) => (
                  <EventCard
                    key={event?.id}
                    {...event}
                    variant={view === "list" ? "compact" : "default"}
                    onEdit={() => console.log("Edit", event)}
                    onView={() => console.log("View", event)}
                  />
                )))}
          </div>
        </TabsContent>

        {/* <TabsContent value="active">
          <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {events.filter(e => e.status === "OPEN").map((event) => (
              <EventCard
                key={event}
                {...event}
                variant={view === "list" ? "compact" : "default"}
                onEdit={() => console.log("Edit", event)}
                onView={() => console.log("View", event)}
              />
            ))}
          </div>
        </TabsContent> */}

        {/* <TabsContent value="upcoming">
          <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {events.filter(e => e.status === "OPEN").map((event) => (
              <EventCard
                key={event}
                {...event}
                variant={view === "list" ? "compact" : "default"}
                onEdit={() => console.log("Edit", event)}
                onView={() => console.log("View", event)}
              />
            ))}
          </div>
        </TabsContent> */}
        {/* 
        <TabsContent value="draft">
          <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {events.filter(e => e.status === "draft").map((event) => (
              <EventCard
                key={event.id}
                {...event}
                variant={view === "list" ? "compact" : "default"}
                onEdit={() => console.log("Edit", event)}
                onView={() => console.log("View", event)}
              />
            ))}
          </div>
        </TabsContent> */}

        {/* <TabsContent value="cancelled">
          <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {events.filter(e => e.status === "CANCELLED").map((event) => (
              <EventCard
                key={event}
                {...event}
                variant={view === "list" ? "compact" : "default"}
                onEdit={() => console.log("Edit", event)}
                onView={() => console.log("View", event)}
              />
            ))}
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
