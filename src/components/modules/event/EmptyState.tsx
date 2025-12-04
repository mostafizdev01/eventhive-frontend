"use client";

import { SearchX } from "lucide-react";
import { Button } from "../../ui/button";

interface EmptyStateProps {
    onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6 animate-pulse">
                <SearchX className="w-16 h-16 text-muted-foreground" />
            </div>

            <h3 className="text-2xl font-bold mb-2">No Events Found</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
                We couldn&apos;t find any events matching your search criteria. Try adjusting
                your filters or search terms.
            </p>

            <Button
                onClick={onReset}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all"
                size="lg"
            >
                Reset Filters
            </Button>
        </div>
    );
}
