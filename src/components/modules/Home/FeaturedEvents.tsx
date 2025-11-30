import EventCard, { Event } from "./EventCard";


const featuredEvents: Event[] = [
    {
        id: "1",
        title: "Summer Music Festival 2024",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
        date: "June 15, 2024 • 6:00 PM",
        location: "Central Park, New York",
        category: "Music",
        price: "$45",
        isPaid: true,
    },
    {
        id: "2",
        title: "Tech Innovation Summit",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
        date: "July 20, 2024 • 9:00 AM",
        location: "Silicon Valley Convention Center",
        category: "Tech",
        price: "Free",
        isPaid: false,
    },
    {
        id: "3",
        title: "Urban Art Gallery Opening",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
        date: "June 25, 2024 • 7:00 PM",
        location: "Downtown Art District",
        category: "Art",
        price: "$15",
        isPaid: true,
    },
    {
        id: "4",
        title: "Marathon Training Group",
        image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80",
        date: "Every Saturday • 7:00 AM",
        location: "Riverside Park",
        category: "Sports",
        price: "Free",
        isPaid: false,
    },
    {
        id: "5",
        title: "Gaming Tournament Championship",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
        date: "August 5, 2024 • 2:00 PM",
        location: "Gaming Arena",
        category: "Gaming",
        price: "$30",
        isPaid: true,
    },
    {
        id: "6",
        title: "Mountain Hiking Adventure",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
        date: "July 10, 2024 • 6:00 AM",
        location: "Rocky Mountain National Park",
        category: "Travel",
        price: "$25",
        isPaid: true,
    },
];

export default function FeaturedEvents() {
    return (
        <section id="explore" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Featured Events
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the most popular and upcoming events in your area
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    );
}
