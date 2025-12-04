"use client";

import EmptyState from "@/src/components/modules/event/EmptyState";
import EventsFilters from "@/src/components/modules/event/EventsFilters";
import EventsGrid from "@/src/components/modules/event/EventsGrid";
import EventsHeader from "@/src/components/modules/event/EventsHeader";
import EventsPagination from "@/src/components/modules/event/EventsPagination";
import { useState } from "react";

// Mock data - replace with actual API data
const mockEvents = [
    {
        id: "1",
        title: "Summer Music Festival 2024",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
        date: "June 15, 2024 • 6:00 PM",
        location: "Central Park, New York",
        category: "Music",
        price: "Starts from $45",
        isPaid: true,
        host: {
            name: "John Doe",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
    },
    {
        id: "2",
        title: "Tech Conference 2024",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        date: "July 20, 2024 • 9:00 AM",
        location: "Convention Center, San Francisco",
        category: "Tech",
        price: "Free",
        isPaid: false,
        host: {
            name: "Sarah Smith",
            avatar: "https://i.pravatar.cc/150?img=5",
        },
    },
    {
        id: "3",
        title: "Basketball Championship",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
        date: "August 5, 2024 • 3:00 PM",
        location: "Sports Arena, Los Angeles",
        category: "Sports",
        price: "Starts from $30",
        isPaid: true,
        host: {
            name: "Mike Johnson",
            avatar: "https://i.pravatar.cc/150?img=33",
        },
    },
    {
        id: "4",
        title: "Online Gaming Tournament",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
        date: "June 30, 2024 • 7:00 PM",
        location: "Online Event",
        category: "Gaming",
        price: "Free",
        isPaid: false,
        host: {
            name: "Alex Chen",
            avatar: "https://i.pravatar.cc/150?img=68",
        },
    },
    {
        id: "5",
        title: "Art Gallery Exhibition",
        image: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80",
        date: "July 10, 2024 • 5:00 PM",
        location: "Modern Art Gallery, London",
        category: "Art",
        price: "Free",
        isPaid: false,
        host: {
            name: "Emma Wilson",
            avatar: "https://i.pravatar.cc/150?img=45",
        },
    },
    {
        id: "6",
        title: "Travel Photography Workshop",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
        date: "August 15, 2024 • 10:00 AM",
        location: "Photography Studio, Paris",
        category: "Travel",
        price: "Starts from $80",
        isPaid: true,
        host: {
            name: "David Brown",
            avatar: "https://i.pravatar.cc/150?img=52",
        },
    },
    {
        id: "7",
        title: "Jazz Night Live",
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
        date: "June 25, 2024 • 8:00 PM",
        location: "Blue Note Jazz Club, NYC",
        category: "Music",
        price: "Starts from $25",
        isPaid: true,
        host: {
            name: "Maria Garcia",
            avatar: "https://i.pravatar.cc/150?img=20",
        },
    },
    {
        id: "8",
        title: "Startup Pitch Competition",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
        date: "July 5, 2024 • 2:00 PM",
        location: "Tech Hub, Austin",
        category: "Tech",
        price: "Free",
        isPaid: false,
        host: {
            name: "Robert Lee",
            avatar: "https://i.pravatar.cc/150?img=15",
        },
    },
    {
        id: "9",
        title: "Yoga Retreat Weekend",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        date: "August 20, 2024 • 7:00 AM",
        location: "Mountain Resort, Colorado",
        category: "Sports",
        price: "Starts from $150",
        isPaid: true,
        host: {
            name: "Lisa Anderson",
            avatar: "https://i.pravatar.cc/150?img=47",
        },
    },
];

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("upcoming");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);

    const eventsPerPage = 9;

    // Filter logic
    const filteredEvents = mockEvents.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
        const matchesPrice =
            selectedPrice === "All" ||
            (selectedPrice === "Free" && !event.isPaid) ||
            (selectedPrice === "Paid" && event.isPaid);

        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort logic
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortBy === "newest") return b.id.localeCompare(a.id);
        if (sortBy === "upcoming") return a.date.localeCompare(b.date);
        // Add more sort options as needed
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
    const startIndex = (currentPage - 1) * eventsPerPage;
    const paginatedEvents = sortedEvents.slice(startIndex, startIndex + eventsPerPage);

    // Bookmark toggle
    const toggleBookmark = (eventId: string) => {
        setBookmarkedEvents((prev) =>
            prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
        );
    };

    // Reset filters
    const resetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        setSelectedPrice("All");
        setSelectedStatus("upcoming");
        setSortBy("newest");
        setCurrentPage(1);
    };

    return (
        <div className=" w-full bg-background">
            {/* <Navbar userRole="guest" /> */}

            <div className="container mx-auto px-8 pt-24 pb-16">
                {/* Page Header */}
                <EventsHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {/* Filters */}
                <EventsFilters
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />

                {/* Events Grid or Empty State */}
                {paginatedEvents.length === 0 ? (
                    <EmptyState onReset={resetFilters} />
                ) : (
                    <>
                        <EventsGrid
                            events={paginatedEvents}
                            bookmarkedEvents={bookmarkedEvents}
                            toggleBookmark={toggleBookmark}
                        />

                        {/* Pagination */}
                        <EventsPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>

            {/* <Footer /> */}
        </div>
    );
}
