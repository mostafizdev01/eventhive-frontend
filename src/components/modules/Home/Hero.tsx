// "use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
        >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-br from-primary via-[#FF9500] to-accent opacity-10" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">Connect. Experience. Belong.</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                            Find Your Crowd.{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#FF9500]">
                                Join the Hive.
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                            Discover amazing events, connect with like-minded people, and create unforgettable experiences.
                            Whether you&apos;re exploring or hosting, EventHive brings communities together.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/events">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
                                >
                                    Explore Events
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                                >
                                    Become a Host
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-4">
                            <div>
                                <div className="text-3xl font-bold text-primary">10K+</div>
                                <div className="text-sm text-muted-foreground">Active Events</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary">50K+</div>
                                <div className="text-sm text-muted-foreground">Happy Members</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary">500+</div>
                                <div className="text-sm text-muted-foreground">Top Hosts</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className=" w-full relative animate-in fade-in slide-in-from-right duration-700 delay-200">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl" />
                            <Image
                                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
                                alt="People connecting at events"
                                width={600}
                                height={600}
                                className="relative rounded-3xl shadow-2xl object-cover"
                                priority
                            />

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 bg-card border-2 border-primary rounded-2xl p-4 shadow-xl animate-in zoom-in duration-500 delay-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-sm font-semibold">127 Live Events</span>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 bg-card border-2 border-accent rounded-2xl p-4 shadow-xl animate-in zoom-in duration-500 delay-700">
                                <div className="text-sm font-semibold text-muted-foreground">New Members Today</div>
                                <div className="text-2xl font-bold text-accent">+842</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
