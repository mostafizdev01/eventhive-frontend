
import { Hexagon, Twitter, Instagram, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";

const footerLinks = {
    product: [
        { label: "Explore Events", href: "/explore" },
        { label: "Become a Host", href: "/host" },
        { label: "Pricing", href: "/pricing" },
        { label: "Categories", href: "/categories" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press", href: "/press" },
    ],
    support: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Community Guidelines", href: "/guidelines" },
        { label: "Safety", href: "/safety" },
    ],
    legal: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
    ],
};

const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

export const Footer = () => {
    return (
        <footer className="bg-slate-900 pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Main Footer */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-white/10">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="relative">
                                <Hexagon className="w-8 h-8 text-yellow-400 fill-yellow-400/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                </div>
                            </div>
                            <span className="font-poppins font-bold text-xl text-white">
                                Event<span className=" text-yellow-500">Hive</span>
                            </span>
                        </Link>
                        <p className="font-semibold text-white text-sm mb-6 max-w-xs">
                            Connecting people through events, activities, and shared experiences. Find your crowd, join the hive.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white hover:bg-yellow-400 hover:text-yellow-400-foreground transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-poppins font-semibold text-white mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-semibold text-sm text-white hover:text-yellow-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-poppins font-semibold text-white mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-semibold text-sm text-white hover:text-yellow-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-poppins font-semibold text-white mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-semibold text-sm text-white hover:text-yellow-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-poppins font-semibold text-white mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-semibold text-sm text-white hover:text-yellow-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-semibold text-sm text-white/50">
                        © {new Date().getFullYear()} EventHive. All rights reserved.
                    </p>
                    <p className="font-semibold text-sm text-white/50">
                        Made with ❤️ for event lovers everywhere
                    </p>
                </div>
            </div>
        </footer>
    );
};
