"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Building2, Microscope, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import siteData from "@/data/site.json";

export default function FacilitiesPage() {
    return (
        <>
            <Header />
            <WhatsAppButton />

            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-hero">
                <Container className="relative z-10 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <Building2 className="w-16 h-16 mx-auto mb-6 text-white" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            World-Class Facilities
                        </h1>
                        <p className="text-xl text-blue-50">
                            State-of-the-art training infrastructure for exceptional dental
                            education
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Facilities Grid */}
            <Section>
                <Container>
                    <div className="grid md:grid-cols-2 gap-12">
                        {siteData.facilities.map((facility, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="premium" className="h-full">
                                    <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                                        <Image
                                            src={facility.image}
                                            alt={facility.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {facility.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {facility.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Student Support */}
            <Section className="bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Student Support & Resources
                        </h2>
                        <p className="text-xl text-gray-600">
                            Comprehensive support for your learning journey
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {siteData.studentSupport.map((support, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="glass" className="text-center h-full">
                                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-primary rounded-full mb-4">
                                        {support.icon === "BookOpen" && (
                                            <Microscope className="w-7 h-7 text-white" />
                                        )}
                                        {support.icon === "Tool" && (
                                            <Building2 className="w-7 h-7 text-white" />
                                        )}
                                        {support.icon === "Award" && (
                                            <Award className="w-7 h-7 text-white" />
                                        )}
                                        {support.icon === "Users" && (
                                            <Users className="w-7 h-7 text-white" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {support.title}
                                    </h3>
                                    <p className="text-gray-600">{support.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Visit Us */}
            <Section className="bg-gradient-primary text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Visit Our Campus
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Experience our world-class facilities firsthand. Schedule a campus
                            tour today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="btn btn-secondary text-lg px-8 py-4"
                            >
                                Schedule a Visit
                            </a>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
