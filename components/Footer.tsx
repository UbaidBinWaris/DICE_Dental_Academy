import React from "react";
import Link from "next/link";
import {
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    MapPin,
    GraduationCap,
} from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-white">DICE</span>
                                <span className="text-xs text-gray-400 -mt-1">
                                    Dental Academy
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                            Pakistan's premier dental training institute offering advanced
                            clinical training and international licensing exam preparation.
                        </p>
                        <p className="text-xs font-semibold text-primary-400 mb-2">
                            Learn Locally. Practice Confidently. Qualify Globally.
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <a
                                href="https://facebook.com/dicedentalacademy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com/dicedentalacademy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="https://linkedin.com/company/dice-dental-academy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="https://youtube.com/@dicedentalacademy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/courses"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    All Courses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/international-licensing"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    International Licensing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/facilities"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    Facilities
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faculty"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    Faculty
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/testimonials"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    Success Stories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faqs"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Programs */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            Popular Programs
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/courses/pg-orthodontics"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    PG Diploma in Orthodontics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/courses/pg-aesthetic"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    PG Diploma in Aesthetic Dentistry
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/courses/aesthetic-program"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    One-Year Aesthetic (HSA)
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/courses/orthodontics-aligners"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    Clear Aligners Course
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ai-dentistry"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    AI in Dentistry
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/international-licensing"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    ORE Preparation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">
                                    F-8 Markaz, Islamabad
                                    <br />
                                    Pakistan
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a
                                    href="tel:+92511234567"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    +92 51 1234567
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a
                                    href="mailto:info@dicedentalacademy.com"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    info@dicedentalacademy.com
                                </a>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <h4 className="text-white font-semibold text-sm mb-2">
                                Office Hours
                            </h4>
                            <p className="text-xs text-gray-400">
                                Mon - Fri: 9:00 AM - 6:00 PM
                                <br />
                                Saturday: 10:00 AM - 4:00 PM
                                <br />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400">
                            © {currentYear} DICE Dental Academy. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/privacy-policy"
                                className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                            >
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
