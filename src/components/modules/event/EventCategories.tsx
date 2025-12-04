"use client";

import { Music, Trophy, Gamepad2, Palette, Plane, Laptop, ArrowRight } from "lucide-react";

const categories = [
    {
        icon: Music,
        name: "Music",
        count: "1.2K+ Events",
        color: "text-primary",
        bgColor: "bg-primary/10",
        hoverBg: "hover:bg-primary/20",
    },
    {
        icon: Trophy,
        name: "Sports",
        count: "850+ Events",
        color: "text-accent",
        bgColor: "bg-accent/10",
        hoverBg: "hover:bg-accent/20",
    },
    {
        icon: Gamepad2,
        name: "Gaming",
        count: "920+ Events",
        color: "text-[#FF9500]",
        bgColor: "bg-[#FF9500]/10",
        hoverBg: "hover:bg-[#FF9500]/20",
    },
    {
        icon: Palette,
        name: "Art",
        count: "650+ Events",
        color: "text-primary",
        bgColor: "bg-primary/10",
        hoverBg: "hover:bg-primary/20",
    },
    {
        icon: Plane,
        name: "Travel",
        count: "740+ Events",
        color: "text-accent",
        bgColor: "bg-accent/10",
        hoverBg: "hover:bg-accent/20",
    },
    {
        icon: Laptop,
        name: "Tech",
        count: "1.1K+ Events",
        color: "text-[#FF9500]",
        bgColor: "bg-[#FF9500]/10",
        hoverBg: "hover:bg-[#FF9500]/20",
    },
];

export default function EventCategories() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Explore by Category
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Find events that match your interests and passions
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className={`group bg-card rounded-2xl p-6 border border-border ${category.hoverBg} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
                        >
                            <div className={`w-16 h-16 mx-auto ${category.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <category.icon className={`w-8 h-8 ${category.color}`} />
                            </div>
                            <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.count}</p>
                            <ArrowRight className={`w-5 h-5 mx-auto mt-3 ${category.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
