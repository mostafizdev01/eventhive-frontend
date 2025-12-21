import Image from "next/image";
import { Star, Award } from "lucide-react";
import { Badge } from "../../ui/badge";
import Link from "next/link";

const topHosts = [
    {
        id: "1",
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        rating: 4.9,
        eventsHosted: 47,
        category: "Music & Arts",
    },
    {
        id: "2",
        name: "Michael Chen",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        rating: 4.8,
        eventsHosted: 52,
        category: "Tech & Innovation",
    },
    {
        id: "3",
        name: "Emma Williams",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        rating: 5.0,
        eventsHosted: 63,
        category: "Sports & Fitness",
    },
    {
        id: "4",
        name: "David Martinez",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        rating: 4.9,
        eventsHosted: 38,
        category: "Travel & Adventure",
    },
];

export default function TopHosts() {
    return (
        <section id="become-host" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Top Hosts
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Meet our community leaders who create amazing experiences
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {topHosts.map((host) => (
                        <div
                            key={host.id}
                            className="group bg-card rounded-2xl p-6 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
                        >
                            {/* Host Image */}
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                <Image
                                    src={host.image}
                                    alt={host.name}
                                    fill
                                    className="rounded-full object-cover ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 shadow-lg">
                                    <Award className="w-4 h-4 text-primary-foreground" />
                                </div>
                            </div>

                            {/* Host Info */}
                            <h3 className="text-xl font-bold mb-2">{host.name}</h3>

                            <Badge variant="secondary" className="mb-3">
                                {host.category}
                            </Badge>

                            {/* Rating */}
                            <div className="flex items-center justify-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(host.rating)
                                            ? "text-primary fill-primary"
                                            : "text-muted-foreground/30"
                                            }`}
                                    />
                                ))}
                                <span className="ml-1 text-sm font-semibold">{host.rating}</span>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                {host.eventsHosted} Events Hosted
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-lg text-muted-foreground mb-4">
                        Ready to become a host and create your own events?
                    </p>
                    <Link href={"/dashboard"}>
                        <button className="px-8 py-3 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors">
                            Start Hosting Today
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
