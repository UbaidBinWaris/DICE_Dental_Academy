"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import siteData from "@/data/site.json";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (you can integrate with backend/email service)
        console.log("Form submitted:", formData);
        alert("Thank you for contacting us! We'll get back to you soon.");
        setFormData({
            name: "",
            email: "",
            phone: "",
            course: "",
            message: "",
        });
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Header />
            <WhatsAppButton />

            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-hero">
                <Container className="relative z-10 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Contact Us
                        </h1>
                        <p className="text-xl text-blue-50">
                            We're here to help you begin your dental education journey
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Contact Information */}
            <Section className="bg-gray-50">
                <Container>
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Card variant="premium" className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Our Location
                            </h3>
                            <p className="text-gray-600">
                                {siteData.site.location.address}
                                <br />
                                {siteData.site.location.city}, {siteData.site.location.country}
                            </p>
                        </Card>

                        <Card variant="premium" className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Phone & WhatsApp
                            </h3>
                            <p className="text-gray-600">
                                <a
                                    href={`tel:${siteData.site.contact.phone}`}
                                    className="hover:text-primary-500 transition-colors"
                                >
                                    {siteData.site.contact.phone}
                                </a>
                                <br />
                                <a
                                    href={`tel:${siteData.site.contact.mobile}`}
                                    className="hover:text-primary-500 transition-colors"
                                >
                                    {siteData.site.contact.mobile}
                                </a>
                            </p>
                        </Card>

                        <Card variant="premium" className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Email Us
                            </h3>
                            <p className="text-gray-600">
                                <a
                                    href={`mailto:${siteData.site.contact.email}`}
                                    className="hover:text-primary-500 transition-colors"
                                >
                                    {siteData.site.contact.email}
                                </a>
                                <br />
                                <a
                                    href={`mailto:${siteData.site.contact.admissionsEmail}`}
                                    className="hover:text-primary-500 transition-colors"
                                >
                                    {siteData.site.contact.admissionsEmail}
                                </a>
                            </p>
                        </Card>
                    </div>

                    {/* Office Hours */}
                    <Card variant="premium" className="max-w-2xl mx-auto">
                        <div className="flex items-start gap-4">
                            <Clock className="w-8 h-8 text-primary-500 flex-shrink-0" />
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Office Hours
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                                    <div>
                                        <strong>Weekdays:</strong>{" "}
                                        {siteData.site.officeHours.weekdays}
                                    </div>
                                    <div>
                                        <strong>Saturday:</strong>{" "}
                                        {siteData.site.officeHours.saturday}
                                    </div>
                                    <div className="md:col-span-2">
                                        <strong>Sunday:</strong> {siteData.site.officeHours.sunday}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Container>
            </Section>

            {/* Contact Form & Map */}
            <Section>
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Send Us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        placeholder="Dr. John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        placeholder="+92 300 1234567"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Course of Interest
                                    </label>
                                    <select
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="">Select a course...</option>
                                        <option value="pg-orthodontics">
                                            PG Diploma in Orthodontics
                                        </option>
                                        <option value="pg-aesthetic">
                                            PG Diploma in Aesthetic Dentistry
                                        </option>
                                        <option value="pg-interceptive">
                                            PG Diploma in Interceptive Orthodontics
                                        </option>
                                        <option value="aesthetic-program">
                                            One-Year Aesthetic Program (HSA)
                                        </option>
                                        <option value="short-courses">Short Courses</option>
                                        <option value="international-licensing">
                                            International Licensing Prep
                                        </option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        placeholder="Tell us about your goals and how we can help..."
                                    />
                                </div>

                                <Button type="submit" variant="primary" className="w-full text-lg">
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        {/* Map */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Find Us on Map
                            </h2>
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                                <iframe
                                    src={siteData.site.location.mapEmbed}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0"
                                ></iframe>
                            </div>

                            <Card variant="premium" className="mt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Prefer to Chat?
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Get instant answers to your questions via WhatsApp
                                </p>
                                <a
                                    href={`https://wa.me/${siteData.site.contact.whatsapp}?text=Hello! I'm interested in learning more about DICE Dental Academy programs.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary w-full inline-flex items-center justify-center"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Chat on WhatsApp
                                </a>
                            </Card>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
