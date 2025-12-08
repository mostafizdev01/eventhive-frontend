import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import { cn } from "@/src/lib/utils";

interface Activity {
    id: string;
    user: {
        name: string;
        avatar?: string;
        initials: string;
    };
    action: string;
    target?: string;
    time: string;
    type: "join" | "payment" | "event" | "user" | "system";
}

interface RecentActivityProps {
    activities: Activity[];
    title?: string;
}

const getTypeStyles = (type: Activity["type"]) => {
    switch (type) {
        case "join":
            return "bg-accent/10 text-accent";
        case "payment":
            return "bg-green-500/10 text-green-600";
        case "event":
            return "bg-primary/10 text-primary";
        case "user":
            return "bg-blue-500/10 text-blue-600";
        case "system":
            return "bg-muted text-muted-foreground";
    }
};

export function RecentActivity({ activities, title = "Recent Activity" }: RecentActivityProps) {
    return (
        <div className="bg-card rounded-xl border border-border">
            <div className="p-4 lg:p-6 border-b border-border">
                <h3 className="font-semibold">{title}</h3>
            </div>
            <div className="divide-y divide-border">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 lg:px-6">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={activity.user.avatar} />
                            <AvatarFallback className="bg-muted text-sm">
                                {activity.user.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm">
                                <span className="font-medium">{activity.user.name}</span>{" "}
                                <span className="text-muted-foreground">{activity.action}</span>{" "}
                                {activity.target && (
                                    <span className="font-medium">{activity.target}</span>
                                )}
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className={cn("text-xs", getTypeStyles(activity.type))}>
                            {activity.type}
                        </Badge>
                    </div>
                ))}
            </div>
        </div>
    );
}
