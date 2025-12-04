"use client"
import { useState } from "react";
import { Menu, X, Hexagon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/src/lib/utils";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Events", href: "/explore" },
    { label: "Become a Host", href: "/host" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <Hexagon className="w-8 h-8 text-yellow-400 fill-yellow-50 transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                            </div>
                        </div>
                        <span className="font-poppins font-bold text-xl text-foreground">
                            Event<span className="text-yellow-400">Hive</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-inter font-medium text-muted-foreground hover:text-yellow-400 transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href={'/login'}>
                            <Button variant="ghost" size="sm">
                                Login
                            </Button>
                        </Link>
                        <Link href={"/register"}>
                            <Button size="sm">
                                Register
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={cn(
                        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                        isOpen ? "max-h-96 pb-6" : "max-h-0"
                    )}
                >
                    <div className="flex flex-col gap-4 pt-4">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "font-inter font-medium text-muted-foreground hover:text-primary transition-all py-2 opacity-0 animate-fade-up",
                                    isOpen && "opacity-100"
                                )}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-3 pt-4 border-t border-border">
                            <Button variant="outline" className="w-full">
                                Login
                            </Button>
                            <Button className="w-full">
                                Register
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
