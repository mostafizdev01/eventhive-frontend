// EventCardSkeleton.tsx
import { cn } from "@/src/lib/utils";
import { Calendar, MapPin, Users } from "lucide-react";

export interface EventCardSkeletonProps {
    variant?: "default" | "compact";
    className?: string;
}

export function EventCardSkeleton({
    variant = "default",
    className,
}: EventCardSkeletonProps) {
    if (variant === "compact") {
        return (
            <div
                className={cn(
                    "flex items-center gap-4 p-4 bg-card rounded-xl border border-border animate-pulse",
                    className
                )}
            >
                {/* Image placeholder */}
                <div className="w-16 h-16 rounded-lg bg-muted" />

                <div className="flex-1 min-w-0 space-y-2">
                    {/* Title placeholder */}
                    <div className="h-4 bg-muted rounded w-3/4" />

                    {/* Info placeholders */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted" />
                            <div className="h-3 bg-muted rounded w-16" />
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-muted" />
                            <div className="h-3 bg-muted rounded w-20" />
                        </div>
                    </div>
                </div>

                {/* Status badge placeholder */}
                <div className="h-6 w-16 bg-muted rounded-full" />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "bg-card rounded-xl border border-border overflow-hidden animate-pulse",
                className
            )}
        >
            {/* Banner image placeholder */}
            <div className="relative h-40 bg-muted overflow-hidden">
                {/* Category badge placeholder */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <div className="h-6 w-16 bg-gray-300/50 rounded-full" />
                    <div className="h-6 w-20 bg-gray-300/50 rounded-full" />
                </div>

                {/* Price badge placeholder */}
                <div className="absolute top-3 right-3">
                    <div className="h-6 w-12 bg-gray-300/50 rounded-full" />
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Title placeholder */}
                <div className="h-6 bg-muted rounded w-4/5" />

                {/* Info section placeholders */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted" />
                        <div className="h-4 bg-muted rounded w-24" />
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted" />
                        <div className="h-4 bg-muted rounded w-32" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted" />
                        <div className="h-4 bg-muted rounded w-28" />
                    </div>
                </div>

                {/* Button placeholders */}
                <div className="flex gap-2 mt-4">
                    <div className="h-10 flex-1 bg-muted rounded" />
                    <div className="h-10 w-16 bg-muted rounded" />
                    <div className="h-10 w-16 bg-muted rounded" />
                </div>
            </div>
        </div>
    );
}

// EventCardGridSkeleton.tsx - For loading multiple cards in a grid
export function EventCardGridSkeleton({
    count = 6,
    variant = "default",
}: {
    count?: number;
    variant?: "default" | "compact";
}) {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <EventCardSkeleton
                    key={index}
                    variant={variant}
                    className={variant === "compact" ? "" : "h-full"}
                />
            ))}
        </div>
    );
}

// EventCardListSkeleton.tsx - For loading multiple cards in a list
export function EventCardListSkeleton({
    count = 4,
    variant = "compact",
}: {
    count?: number;
    variant?: "default" | "compact";
}) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, index) => (
                <EventCardSkeleton key={index} variant={variant} />
            ))}
        </div>
    );
}