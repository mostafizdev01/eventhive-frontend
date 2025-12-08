
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
    id: string;
    title: string;
    image: string;
    date: string;
    location: string;
    category: string;
    price: number | "Free";
    attendees: number;
    capacity: number;
    status?: "active" | "upcoming" | "draft" | "cancelled";
    onJoin?: () => void;
    onEdit?: () => void;
    onView?: () => void;
    variant?: "default" | "compact";
}

const statusColors = {
    active: "bg-green-500/10 text-green-600 border-green-500/20",
    upcoming: "bg-accent/10 text-accent border-accent/20",
    draft: "bg-muted text-muted-foreground border-border",
    cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function EventCard({
    title,
    image,
    date,
    location,
    category,
    price,
    attendees,
    capacity,
    status = "active",
    onJoin,
    onEdit,
    onView,
    variant = "default",
}: EventCardProps) {
    const isSoldOut = attendees >= capacity;
    const spotsLeft = capacity - attendees;

    if (variant === "compact") {
        return (
            <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-card transition-shadow">
                <Image
                width={500}
                height={500}
                    src={image}
                    alt={title}
                    className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {date}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {location}
                        </span>
                    </div>
                </div>
                <Badge variant="outline" className={statusColors[status]}>
                    {status}
                </Badge>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-card-hover transition-all group">
            <div className="relative h-40 overflow-hidden">
                <Image
                    width={500}
                    height={500}
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-primary text-primary-foreground">{category}</Badge>
                    {status && (
                        <Badge variant="outline" className={cn("bg-card/90", statusColors[status])}>
                            {status}
                        </Badge>
                    )}
                </div>
                <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-card/90">
                        {price === "Free" ? "Free" : `$${price}`}
                    </Badge>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>

                <div className="flex flex-col gap-2 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="truncate">{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>
                            {attendees}/{capacity} attendees
                            {!isSoldOut && spotsLeft <= 10 && (
                                <span className="text-destructive ml-1">({spotsLeft} left!)</span>
                            )}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    {onJoin && (
                        <Button
                            className="flex-1 btn-primary"
                            disabled={isSoldOut}
                            onClick={onJoin}
                        >
                            {isSoldOut ? "Sold Out" : "Join Event"}
                        </Button>
                    )}
                    {onEdit && (
                        <Button variant="outline" onClick={onEdit}>
                            Edit
                        </Button>
                    )}
                    {onView && (
                        <Button variant="outline" onClick={onView}>
                            View
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
