
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Calendar, MapPin, Download, CreditCard, Clock } from "lucide-react";
import Image from "next/image";

interface Ticket {
  id: string;
  event: string;
  image: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  price: number;
  paymentStatus: "paid" | "unpaid";
  ticketCode: string;
}

const tickets: Ticket[] = [
  {
    id: "1",
    event: "Tech Summit 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    date: "Dec 15, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco, CA",
    ticketType: "VIP",
    price: 100,
    paymentStatus: "paid",
    ticketCode: "TS2024-VIP-001",
  },
  {
    id: "2",
    event: "Music Festival",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
    date: "Dec 20, 2024",
    time: "2:00 PM - 11:00 PM",
    location: "Los Angeles, CA",
    ticketType: "Standard",
    price: 40,
    paymentStatus: "unpaid",
    ticketCode: "MF2024-STD-042",
  },
  {
    id: "3",
    event: "Art Workshop",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400",
    date: "Dec 22, 2024",
    time: "10:00 AM - 1:00 PM",
    location: "New York, NY",
    ticketType: "Standard",
    price: 30,
    paymentStatus: "paid",
    ticketCode: "AW2024-STD-015",
  },
];

const pastTickets: Ticket[] = [
  {
    id: "4",
    event: "Startup Pitch Night",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400",
    date: "Nov 28, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Austin, TX",
    ticketType: "Standard",
    price: 25,
    paymentStatus: "paid",
    ticketCode: "SPN2024-STD-089",
  },
  {
    id: "5",
    event: "Gaming Tournament",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    date: "Nov 15, 2024",
    time: "12:00 PM - 8:00 PM",
    location: "Seattle, WA",
    ticketType: "Competitor",
    price: 50,
    paymentStatus: "paid",
    ticketCode: "GT2024-CMP-032",
  },
];

function TicketCard({ ticket, isPast = false }: { ticket: Ticket; isPast?: boolean }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-card transition-shadow">
      <div className="flex flex-col sm:flex-row">
        <Image
        width={500}
        height={500}
          src={ticket.image}
          alt={ticket.event}
          className="w-full sm:w-48 h-40 sm:h-auto object-cover"
        />
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-lg">{ticket.event}</h3>
                <Badge variant={ticket.ticketType === "VIP" ? "default" : "secondary"}>
                  {ticket.ticketType}
                </Badge>
                {ticket.paymentStatus === "unpaid" && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Payment Pending
                  </Badge>
                )}
              </div>

              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{ticket.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{ticket.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{ticket.location}</span>
                </div>
              </div>

              <p className="text-sm">
                <span className="text-muted-foreground">Ticket Code:</span>{" "}
                <span className="font-mono font-medium">{ticket.ticketCode}</span>
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <p className="text-xl font-bold">${ticket.price}</p>

              {ticket.paymentStatus === "unpaid" ? (
                <Button className="btn-primary gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </Button>
              ) : (
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Ticket
                </Button>
              )}

              {!isPast && ticket.paymentStatus === "paid" && (
                <Button variant="ghost" size="sm" className="text-destructive">
                  Cancel Participation
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyTickets() {
  const unpaidCount = tickets.filter((t) => t.paymentStatus === "unpaid").length;

  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-poppins">My Tickets</h1>
          <p className="text-muted-foreground mt-1">
            Manage your event tickets and payments
          </p>
        </div>

        {/* Unpaid Warning */}
        {unpaidCount > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Payment Required</p>
              <p className="text-sm text-muted-foreground">
                You have {unpaidCount} unpaid ticket{unpaidCount > 1 ? "s" : ""}. Complete payment to secure your spot.
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                {tickets.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Events
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                {pastTickets.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} isPast />
            ))}
          </TabsContent>
        </Tabs>
      </div>
  );
}
