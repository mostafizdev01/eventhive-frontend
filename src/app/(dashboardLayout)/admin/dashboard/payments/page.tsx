"use client"
import { DataTable, Column } from "@/src/components/modules/Dashboard/host/DataTable";
import { RevenueChart } from "@/src/components/modules/Dashboard/host/RevenueChart";
import { StatsCard } from "@/src/components/modules/Dashboard/user/StatsCard";
import { Badge } from "@/src/components/ui/badge";
import { DollarSign, CreditCard, AlertCircle, TrendingUp } from "lucide-react";

interface Payment {
  id: string;
  transactionId: string;
  user: string;
  event: string;
  host: string;
  amount: number;
  platformFee: number;
  method: string;
  date: string;
  status: "success" | "pending" | "failed" | "refunded";
}

const payments: Payment[] = [
  { id: "1", transactionId: "TXN-001234", user: "Sarah Chen", event: "Tech Summit 2024", host: "TechCorp Inc.", amount: 50, platformFee: 5, method: "Credit Card", date: "Dec 7, 2024", status: "success" },
  { id: "2", transactionId: "TXN-001235", user: "Mike Johnson", event: "Music Festival", host: "SoundWave Events", amount: 40, platformFee: 4, method: "PayPal", date: "Dec 7, 2024", status: "success" },
  { id: "3", transactionId: "TXN-001236", user: "Emma Wilson", event: "Art Workshop", host: "Creative Studios", amount: 30, platformFee: 3, method: "Credit Card", date: "Dec 6, 2024", status: "pending" },
  { id: "4", transactionId: "TXN-001237", user: "David Park", event: "Gaming Tournament", host: "GameZone", amount: 50, platformFee: 5, method: "Debit Card", date: "Dec 6, 2024", status: "failed" },
  { id: "5", transactionId: "TXN-001238", user: "Lisa Wang", event: "Tech Summit 2024", host: "TechCorp Inc.", amount: 50, platformFee: 5, method: "Credit Card", date: "Dec 5, 2024", status: "refunded" },
  { id: "6", transactionId: "TXN-001239", user: "James Brown", event: "Music Festival", host: "SoundWave Events", amount: 40, platformFee: 4, method: "Apple Pay", date: "Dec 5, 2024", status: "success" },
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

const columns: Column<Payment>[] = [
  { key: "transactionId", label: "Transaction ID" },
  {
    key: "user",
    label: "User",
    render: (payment) => (
      <div>
        <p className="font-medium">{payment.user}</p>
        <p className="text-sm text-muted-foreground">{payment.event}</p>
      </div>
    ),
  },
  { key: "host", label: "Host" },
  {
    key: "amount",
    label: "Amount",
    render: (payment) => <span className="font-medium">${payment.amount}</span>,
  },
  {
    key: "platformFee",
    label: "Platform Fee",
    render: (payment) => <span className="text-muted-foreground">${payment.platformFee}</span>,
  },
  { key: "method", label: "Method" },
  { key: "date", label: "Date" },
  {
    key: "status",
    label: "Status",
    render: (payment) => {
      const colors = {
        success: "bg-green-500/10 text-green-600 border-green-500/20",
        pending: "bg-primary/10 text-primary border-primary/20",
        failed: "bg-destructive/10 text-destructive border-destructive/20",
        refunded: "bg-muted text-muted-foreground border-border",
      };
      return (
        <Badge variant="outline" className={colors[payment.status]}>
          {payment.status}
        </Badge>
      );
    },
  },
];

export default function AdminPayments() {
  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Payments & Revenue</h1>
          <p className="text-muted-foreground mt-1">
            Track all payments and platform revenue
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Revenue"
            value="$89,420"
            change="+18.7% from last month"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-primary"
          />
          <StatsCard
            title="Platform Earnings"
            value="$8,942"
            change="10% commission"
            changeType="neutral"
            icon={TrendingUp}
            iconColor="text-green-600"
          />
          <StatsCard
            title="Successful Payments"
            value="1,234"
            change="+15.2% from last month"
            changeType="positive"
            icon={CreditCard}
            iconColor="text-accent"
          />
          <StatsCard
            title="Pending/Failed"
            value="23"
            change="Requires attention"
            changeType="negative"
            icon={AlertCircle}
            iconColor="text-destructive"
          />
        </div>

        {/* Revenue Chart */}
        <RevenueChart data={revenueData} title="Monthly Revenue" />

        {/* Payments Table */}
        <DataTable
          title="Recent Payments"
          description="All payment transactions on the platform"
          data={payments}
          columns={columns}
          searchPlaceholder="Search by transaction ID, user, or event..."
          filters={[
            {
              key: "status",
              label: "Status",
              options: [
                { value: "all", label: "All Status" },
                { value: "success", label: "Success" },
                { value: "pending", label: "Pending" },
                { value: "failed", label: "Failed" },
                { value: "refunded", label: "Refunded" },
              ],
            },
            {
              key: "method",
              label: "Method",
              options: [
                { value: "all", label: "All Methods" },
                { value: "credit", label: "Credit Card" },
                { value: "debit", label: "Debit Card" },
                { value: "paypal", label: "PayPal" },
                { value: "apple", label: "Apple Pay" },
              ],
            },
          ]}
          actions={[
            { label: "View Details", onClick: (payment) => console.log("View", payment) },
            { label: "Refund", onClick: (payment) => console.log("Refund", payment), variant: "destructive" },
          ]}
        />
      </div>
  );
}
