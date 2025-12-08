import { cn } from "@/src/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: LucideIcon;
    iconColor?: string;
    description?: string;
}

export function StatsCard({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    iconColor = "text-primary",
    description,
}: StatsCardProps) {
    return (
        <div className="bg-card rounded-xl border border-border p-6 hover:shadow-card transition-shadow">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-2xl lg:text-3xl font-bold tracking-tight">{value}</p>
                    {change && (
                        <p
                            className={cn(
                                "text-xs font-medium",
                                changeType === "positive" && "text-green-600",
                                changeType === "negative" && "text-destructive",
                                changeType === "neutral" && "text-muted-foreground"
                            )}
                        >
                            {change}
                        </p>
                    )}
                    {description && (
                        <p className="text-xs text-muted-foreground">{description}</p>
                    )}
                </div>
                <div
                    className={cn(
                        "h-12 w-12 rounded-xl flex items-center justify-center bg-muted",
                        iconColor
                    )}
                >
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
