"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Users,
    Activity,
    Globe,
    Award,
    Clock,
    TrendingUp,
    CheckCircle,
    Target,
    Heart,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import siteData from "@/data/site.json";

export default function AboutPage() {
    return (
        <>
            <Header />
            <WhatsAppButton />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-faculty-teaching.png"
                        alt="About DICE Dental Academy"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-teal-700/90"></div>
                </div>

                <Container className="relative z-10 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            About DICE Dental Academy
                        </h1>
                        <p className="text-xl text-blue-50">
                            Pakistan's Premier Dental Training Institute
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Main About Section */}
            <Section>
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed mb-8">
                                {siteData.about.description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 my-12">
                                <Card variant="premium" className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Target className="w-8 h-8 text-primary-500" />
                                        <h3 className="text-2xl font-bold text-gray-900 m-0">
                                            Our Mission
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed m-0">
                                        {siteData.about.mission}
                                    </p>
                                </Card>

                                <Card variant="premium" className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Heart className="w-8 h-8 text-secondary-500" />
                                        <h3 className="text-2xl font-bold text-gray-900 m-0">
                                            Our Vision
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed m-0">
                                        {siteData.about.vision}
                                    </p>
                                </Card>
                            </div>

                            <div className="bg-gradient-primary text-white rounded-2xl p-8 my-12 text-center">
                                <h3 className="text-3xl font-bold mb-4">Our Tagline</h3>
                                <p className="text-2xl font-semibold">
                                    {siteData.site.tagline}
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Why Choose DICE */}
            <Section className="bg-gray-50">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose DICE Dental Academy?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide everything you need for dental excellence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {siteData.about.whyChooseDice.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="premium" className="h-full">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center">
                                            {reason.icon === "Users" && (
                                                <Users className="w-7 h-7 text-white" />
                                            )}
                                            {reason.icon === "Activity" && (
                                                <Activity className="w-7 h-7 text-white" />
                                            )}
                                            {reason.icon === "Globe" && (
                                                <Globe className="w-7 h-7 text-white" />
                                            )}
                                            {reason.icon === "Award" && (
                                                <Award className="w-7 h-7 text-white" />
                                            )}
                                            {reason.icon === "Clock" && (
                                                <Clock className="w-7 h-7 text-white" />
                                            )}
                                            {reason.icon === "TrendingUp" && (
                                                <TrendingUp className="w-7 h-7 text-white" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {reason.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {reason.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Location Section */}
            <Section>
                <Container>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Our Location
                            </h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-gray-900">Address:</strong>{" "}
                                        <span className="text-gray-700">
                                            {siteData.site.location.address}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-gray-900">City:</strong>{" "}
                                        <span className="text-gray-700">
                                            {siteData.site.location.city}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-gray-900">Country:</strong>{" "}
                                        <span className="text-gray-700">
                                            {siteData.site.location.country}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Centrally located in Islamabad's prime educational hub, DICE
                                Dental Academy is easily accessible and equipped with
                                state-of-the-art facilities.
                            </p>
                            <Button href="/contact" variant="primary">
                                Visit Us Today
                            </Button>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/dental-facility-modern.png"
                                alt="DICE Dental Academy Facility"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section className="bg-gradient-primary text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join hundreds of successful dentists who have transformed their
                            careers with DICE Dental Academy
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/courses" variant="secondary" className="text-lg">
                                Explore Our Courses
                            </Button>
                            <Button
                                href="/contact"
                                variant="outline"
                                className="text-lg text-white border-white hover:bg-white hover:text-blue-900"
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
