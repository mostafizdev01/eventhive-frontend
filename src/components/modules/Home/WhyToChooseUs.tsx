"use client";

import { Sparkles, Shield, CheckCircle, Users, Heart, SmilePlus, ThumbsUp, BookOpen, ArrowRight } from "lucide-react";

const values = [
    {
        icon: Sparkles,
        title: "Fun First",
        description: "Bringing joy and positive energy to every gathering",
        color: "text-primary",
        bgColor: "bg-primary/10",
        hoverBg: "hover:bg-primary/20",
    },
    {
        icon: Shield,
        title: "Healthy Boundaries",
        description: "No selling, no creepy behavior. Just genuine connections",
        color: "text-accent",
        bgColor: "bg-accent/10",
        hoverBg: "hover:bg-accent/20",
    },
    {
        icon: CheckCircle,
        title: "Reliability",
        description: "Show up when you say you will. Our community depends on it",
        color: "text-emerald-600",
        bgColor: "bg-emerald-500/10",
        hoverBg: "hover:bg-emerald-500/20",
    },
    {
        icon: Users,
        title: "Mature Community",
        description: "Adults 25+ only. A grown-up space for quality connections",
        color: "text-red-500",
        bgColor: "bg-red-100",
        hoverBg: "hover:bg-red-200",
    },
    {
        icon: Heart,
        title: "Respect",
        description: "Treating everyone with dignity regardless of differences",
        color: "text-red-500",
        bgColor: "bg-red-100",
        hoverBg: "hover:bg-red-200",
    },
    {
        icon: ThumbsUp,
        title: "Appreciate Hosts",
        description: "Respect those who create amazing experiences for all",
        color: "text-[#FF9500]",
        bgColor: "bg-[#FF9500]/10",
        hoverBg: "hover:bg-[#FF9500]/20",
    },
    {
        icon: SmilePlus,
        title: "Kindness",
        description: "Being gentle, caring, and considerate to everyone",
        color: "text-accent",
        bgColor: "bg-accent/10",
        hoverBg: "hover:bg-accent/20",
    },
    {
        icon: BookOpen,
        title: "Always Learning",
        description: "Stay curious and open to new ideas and perspectives",
        color: "text-emerald-600",
        bgColor: "bg-emerald-500/10",
        hoverBg: "hover:bg-emerald-500/20",
    },
];

export default function WhyToChooseUs() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Why To Choose Us
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        What makes EventHive different? Our commitment to creating a safe,
                        respectful, and genuinely fun environment.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
                    {values.map((value, index) => (
                        <button
                            key={index}
                            className={`group bg-card rounded-2xl p-6 border border-border ${value.hoverBg} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-left`}
                        >
                            <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <value.icon className={`w-8 h-8 ${value.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                {value.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                {value.description}
                            </p>
                            <ArrowRight className={`w-5 h-5 ${value.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}