"use client"
import { DataTable, Column } from "@/src/components/modules/Dashboard/host/DataTable";
import { RevenueChart } from "@/src/components/modules/Dashboard/host/RevenueChart";
import { StatsCard } from "@/src/components/modules/Dashboard/user/StatsCard";
import { Badge } from "@/src/components/ui/badge";
import { DollarSign, TrendingUp, Ticket, ArrowUpRight } from "lucide-react";

interface EventRevenue {
  id: string;
  event: string;
  ticketsSold: number;
  totalRevenue: number;
  platformFee: number;
  netRevenue: number;
  status: "active" | "completed" | "upcoming";
}

const eventRevenue: EventRevenue[] = [
  { id: "1", event: "Tech Summit 2024", ticketsSold: 450, totalRevenue: 22500, platformFee: 2250, netRevenue: 20250, status: "active" },
  { id: "2", event: "Startup Workshop", ticketsSold: 28, totalRevenue: 980, platformFee: 98, netRevenue: 882, status: "active" },
  { id: "3", event: "AI Conference", ticketsSold: 120, totalRevenue: 9000, platformFee: 900, netRevenue: 8100, status: "upcoming" },
  { id: "4", event: "Design Thinking Workshop", ticketsSold: 25, totalRevenue: 1000, platformFee: 100, netRevenue: 900, status: "completed" },
  { id: "5", event: "Leadership Summit", ticketsSold: 85, totalRevenue: 4250, platformFee: 425, netRevenue: 3825, status: "completed" },
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

const columns: Column<EventRevenue>[] = [
  { key: "event", label: "Event" },
  {
    key: "ticketsSold",
    label: "Tickets Sold",
    render: (item) => (
      <div className="flex items-center gap-2">
        <Ticket className="h-4 w-4 text-muted-foreground" />
        <span>{item.ticketsSold}</span>
      </div>
    ),
  },
  {
    key: "totalRevenue",
    label: "Total Revenue",
    render: (item) => <span className="font-medium">${item.totalRevenue.toLocaleString()}</span>,
  },
  {
    key: "platformFee",
    label: "Platform Fee (10%)",
    render: (item) => <span className="text-muted-foreground">${item.platformFee.toLocaleString()}</span>,
  },
  {
    key: "netRevenue",
    label: "Net Revenue",
    render: (item) => (
      <span className="font-semibold text-green-600">${item.netRevenue.toLocaleString()}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (item) => {
      const colors = {
        active: "bg-green-500/10 text-green-600 border-green-500/20",
        completed: "bg-muted text-muted-foreground border-border",
        upcoming: "bg-accent/10 text-accent border-accent/20",
      };
      return (
        <Badge variant="outline" className={colors[item.status]}>
          {item.status}
        </Badge>
      );
    },
  },
];

export default function HostRevenue() {
  const totalRevenue = eventRevenue.reduce((acc, e) => acc + e.totalRevenue, 0);
  const totalFees = eventRevenue.reduce((acc, e) => acc + e.platformFee, 0);
  const netRevenue = eventRevenue.reduce((acc, e) => acc + e.netRevenue, 0);
  const totalTickets = eventRevenue.reduce((acc, e) => acc + e.ticketsSold, 0);

  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Revenue Overview</h1>
          <p className="text-muted-foreground mt-1">
            Track your earnings and event performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change="+22.5% from last month"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-primary"
          />
          <StatsCard
            title="Net Earnings"
            value={`$${netRevenue.toLocaleString()}`}
            description="After platform fees"
            icon={TrendingUp}
            iconColor="text-green-600"
          />
          <StatsCard
            title="Platform Fees"
            value={`$${totalFees.toLocaleString()}`}
            description="10% of total revenue"
            icon={ArrowUpRight}
            iconColor="text-muted-foreground"
          />
          <StatsCard
            title="Total Tickets Sold"
            value={totalTickets.toLocaleString()}
            change="+89 this week"
            changeType="positive"
            icon={Ticket}
            iconColor="text-accent"
          />
        </div>

        {/* Revenue Chart */}
        <RevenueChart data={revenueData} title="Monthly Revenue" />

        {/* Event Revenue Table */}
        <DataTable
          title="Revenue by Event"
          description="Breakdown of earnings per event"
          data={eventRevenue}
          columns={columns}
          searchPlaceholder="Search events..."
          filters={[
            {
              key: "status",
              label: "Status",
              options: [
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "upcoming", label: "Upcoming" },
                { value: "completed", label: "Completed" },
              ],
            },
          ]}
          actions={[
            { label: "View Details", onClick: (item) => console.log("View", item) },
            { label: "Download Report", onClick: (item) => console.log("Download", item) },
          ]}
        />
      </div>
  );
}
