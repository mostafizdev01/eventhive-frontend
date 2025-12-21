import { Music, Gamepad2, Palette, Mountain, Cpu, Trophy } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        name: "Music",
        icon: Music,
        count: 1240,
        color: "from-pink-500 to-rose-500",
        bgColor: "bg-pink-500/10",
        textColor: "text-pink-500",
    },
    {
        name: "Sports",
        icon: Trophy,
        count: 890,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-500/10",
        textColor: "text-green-500",
    },
    {
        name: "Gaming",
        icon: Gamepad2,
        count: 675,
        color: "from-purple-500 to-violet-500",
        bgColor: "bg-purple-500/10",
        textColor: "text-purple-500",
    },
    {
        name: "Art",
        icon: Palette,
        count: 432,
        color: "from-orange-500 to-amber-500",
        bgColor: "bg-orange-500/10",
        textColor: "text-orange-500",
    },
    {
        name: "Travel",
        icon: Mountain,
        count: 567,
        color: "from-cyan-500 to-teal-500",
        bgColor: "bg-cyan-500/10",
        textColor: "text-cyan-500",
    },
    {
        name: "Tech",
        icon: Cpu,
        count: 1100,
        color: "from-blue-500 to-indigo-500",
        bgColor: "bg-blue-500/10",
        textColor: "text-blue-500",
    },
];

export const Categories = () => {
    return (
        <section id="categories" className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Explore by Category
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Find events that match your interests and passions
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/events`}
                            className="group relative bg-card p-6 rounded-2xl shadow-card card-hover text-center overflow-hidden"
                        >
                            {/* Gradient Hover Effect */}
                            <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                            {/* Icon */}
                            <div className={`w-14 h-14 mx-auto mb-4 ${category.bgColor} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <category.icon className={`w-7 h-7 ${category.textColor}`} />
                            </div>

                            <h3 className="font-poppins text-lg font-semibold text-foreground mb-1">
                                {category.name}
                            </h3>
                            <p className="font-inter text-sm text-muted-foreground">
                                {category.count.toLocaleString()} events
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
