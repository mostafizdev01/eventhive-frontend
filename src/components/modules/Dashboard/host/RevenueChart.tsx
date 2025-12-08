"use client"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
    data: {
        month: string;
        revenue: number;
        events?: number;
    }[];
    title?: string;
}

export function RevenueChart({ data, title = "Revenue Overview" }: RevenueChartProps) {
    return (
        <div className="bg-card rounded-xl border border-border p-4 lg:p-6">
            <h3 className="font-semibold mb-4">{title}</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(43, 100%, 50%)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(43, 100%, 50%)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            className="text-xs fill-muted-foreground"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            className="text-xs fill-muted-foreground"
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow-card)",
                            }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="hsl(43, 100%, 50%)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
