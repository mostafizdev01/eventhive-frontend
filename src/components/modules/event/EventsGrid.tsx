"use client";

import Image from "next/image";
import { Calendar, MapPin, Tag, ArrowRight, Heart, User } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";

interface Event {
    id: string;
    title: string;
    image: string;
    date: string;
    location: string;
    category: string;
    price: string;
    isPaid: boolean;
    host: {
        name: string;
        avatar: string;
    };
}

interface EventsGridProps {
    events: Event[];
    bookmarkedEvents: string[];
    toggleBookmark: (eventId: string) => void;
}

export default function EventsGrid({
    events,
    bookmarkedEvents,
    toggleBookmark,
}: EventsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {events.map((event) => {
                const isBookmarked = bookmarkedEvents.includes(event.id);

                return (
                    <div
                        key={event.id}
                        className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative"
                    >
                        {/* Bookmark Icon */}
                        <button
                            onClick={() => toggleBookmark(event.id)}
                            className={`
                absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm
                transition-all duration-300 shadow-lg
                ${isBookmarked
                                    ? "bg-primary text-primary-foreground scale-110"
                                    : "bg-white/90 text-gray-700 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                                }
              `}
                            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                        >
                            <Heart
                                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                            />
                        </button>

                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge
                                    variant={event.isPaid ? "default" : "secondary"}
                                    className={
                                        event.isPaid
                                            ? "bg-accent text-accent-foreground shadow-md"
                                            : "bg-primary text-primary-foreground shadow-md"
                                    }
                                >
                                    {event.price}
                                </Badge>
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">
                                    {event.category}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                                {event.title}
                            </h3>

                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 shrink-0" />
                                    <span className="line-clamp-1">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    <span className="line-clamp-1">{event.location}</span>
                                </div>
                            </div>

                            {/* Host Info */}
                            <div className="flex items-center gap-2 pt-2 border-t border-border">
                                <Avatar className="w-6 h-6">
                                    <AvatarImage src={event.host.avatar} alt={event.host.name} />
                                    <AvatarFallback>
                                        <User className="w-3 h-3" />
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                    by {event.host.name}
                                </span>
                            </div>

                            <div className=" md:flex gap-3">
                                <Button className="w-full flex-1 cursor-pointer bg-accent hover:bg-accent/90 text-accent-foreground group/btn mt-2">
                                    Join Events
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                                <Link className=" w-full flex-1" href={`/events/${event?.id}`}>
                                    <Button className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground group/btn mt-2">
                                        View Details
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
