"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Award, Video } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import testimonialsData from "@/data/testimonials.json";

export default function TestimonialsPage() {
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
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Success Stories
                        </h1>
                        <p className="text-xl text-blue-50">
                            Hear from our successful graduates who are transforming smiles
                            around the world
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Testimonials Grid */}
            <Section className="bg-gray-50">
                <Container>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonialsData.testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="premium" className="h-full flex flex-col">
                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-gray-600 mb-6 italic flex-1">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    {/* Student Info */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="font-bold text-gray-900 text-lg">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {testimonial.program} • Class of {testimonial.year}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <MapPin className="w-4 h-4" />
                                            {testimonial.location}
                                        </div>

                                        {/* Achievement Badge */}
                                        <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-semibold">
                                            <Award className="w-4 h-4" />
                                            {testimonial.achievement}
                                        </div>

                                        {/* Video Link */}
                                        {testimonial.videoUrl && (
                                            <div className="mt-4">
                                                <a
                                                    href={testimonial.videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                                                >
                                                    <Video className="w-4 h-4" />
                                                    Watch Video Testimonial
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section className="bg-gradient-primary text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Write Your Success Story?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join our community of successful dental professionals and achieve
                            your career goals
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/courses" variant="secondary" className="text-lg">
                                Explore Courses
                            </Button>
                            <Button
                                href="/contact"
                                variant="outline"
                                className="text-lg text-white border-white hover:bg-white hover:text-blue-900"
                            >
                                Apply Now
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
