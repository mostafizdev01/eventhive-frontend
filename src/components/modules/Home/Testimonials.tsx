import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        id: "1",
        name: "Alex Thompson",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
        role: "Event Attendee",
        rating: 5,
        text: "EventHive has completely changed how I discover and attend events. I've met so many amazing people and had unforgettable experiences!",
    },
    {
        id: "2",
        name: "Jessica Park",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
        role: "Event Host",
        rating: 5,
        text: "As a host, EventHive makes it incredibly easy to organize events and reach my target audience. The platform is intuitive and the community is engaged.",
    },
    {
        id: "3",
        name: "Ryan Cooper",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80",
        role: "Regular Member",
        rating: 5,
        text: "I've attended over 20 events through EventHive this year. Every single one was well-organized and exactly as described. Highly recommend!",
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        What Our Community Says
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Real stories from real people in our vibrant community
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-card rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6 opacity-10">
                                <Quote className="w-12 h-12 text-primary" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 text-primary fill-primary"
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-muted-foreground mb-6 relative z-10">
                                {testimonial.text}
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
