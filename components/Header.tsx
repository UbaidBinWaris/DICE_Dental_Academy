"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    ChevronDown,
    GraduationCap,
    Globe,
    BookOpen,
} from "lucide-react";
import { Button } from "./ui/Button";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const courseCategories = [
        {
            title: "PG Diplomas",
            items: [
                { name: "Orthodontics", href: "/courses/pg-orthodontics" },
                { name: "Aesthetic Dentistry", href: "/courses/pg-aesthetic" },
                { name: "Interceptive Orthodontics", href: "/courses/pg-interceptive" },
            ],
        },
        {
            title: "Specialized Programs",
            items: [
                {
                    name: "One-Year Aesthetic (HSA)",
                    href: "/courses/aesthetic-program",
                },
                { name: "AI in Dentistry", href: "/ai-dentistry" },
            ],
        },
        {
            title: "Short Courses",
            items: [
                { name: "Clear Aligners", href: "/courses/orthodontics-aligners" },
                { name: "Endodontics", href: "/courses/endodontics" },
                { name: "Veneers Masterclass", href: "/courses/veneers" },
                { name: "Crown & Bridge", href: "/courses/crown-bridge" },
                { name: "Prosthodontics", href: "/courses/prosthodontics" },
            ],
        },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-md"
                    : "bg-transparent"
                }`}
        >
            <nav className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900">DICE</span>
                            <span className="text-xs text-gray-600 -mt-1">
                                Dental Academy
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
                        >
                            About Us
                        </Link>

                        {/* Courses Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown("courses")}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center gap-1 text-gray-700 hover:text-primary-500 font-medium transition-colors">
                                Courses
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === "courses" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6"
                                    >
                                        <div className="grid grid-cols-3 gap-6">
                                            {courseCategories.map((category, idx) => (
                                                <div key={idx}>
                                                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4 text-primary-500" />
                                                        {category.title}
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {category.items.map((item, itemIdx) => (
                                                            <li key={itemIdx}>
                                                                <Link
                                                                    href={item.href}
                                                                    className="text-sm text-gray-600 hover:text-primary-500 transition-colors block py-1"
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href="/international-licensing"
                            className="text-gray-700 hover:text-primary-500 font-medium transition-colors flex items-center gap-1"
                        >
                            <Globe className="w-4 h-4" />
                            International Licensing
                        </Link>
                        <Link
                            href="/facilities"
                            className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
                        >
                            Facilities
                        </Link>
                        <Link
                            href="/faculty"
                            className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
                        >
                            Faculty
                        </Link>
                        <Link
                            href="/testimonials"
                            className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
                        >
                            Success Stories
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Button href="/contact" variant="primary">
                            Apply Now
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:text-primary-500"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
                        >
                            <div className="py-6 space-y-4">
                                <Link
                                    href="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/courses"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                                >
                                    All Courses
                                </Link>
                                <Link
                                    href="/international-licensing"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                                >
                                    International Licensing
                                </Link>
                                <Link
                                    href="/facilities"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                                >
                                    Facilities
                                </Link>
                                <Link
                                    href="/faculty"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                                >
                                    Faculty
                                </Link>
                                <Link
                                    href="/testimonials"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                                >
                                    Success Stories
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                                >
                                    Contact
                                </Link>
                                <div className="pt-4">
                                    <Button href="/contact" variant="primary" className="w-full">
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
