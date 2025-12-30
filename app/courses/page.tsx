"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    GraduationCap,
    Clock,
    Award,
    BookOpen,
    ArrowRight,
    Filter,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import coursesData from "@/data/courses.json";

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const allCourses = [
        ...coursesData.pgDiplomas.map((c) => ({ ...c, type: "PG Diploma" })),
        ...coursesData.specializedPrograms.map((c) => ({
            ...c,
            type: "Specialized Program",
        })),
        ...coursesData.shortCourses.map((c) => ({ ...c, type: "Short Course" })),
    ];

    const categories = [
        "All",
        "PG Diploma",
        "Specialized Program",
        "Short Course",
    ];

    const filteredCourses =
        selectedCategory === "All"
            ? allCourses
            : allCourses.filter((c) => c.type === selectedCategory);

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
                        <GraduationCap className="w-16 h-16 mx-auto mb-6 text-white" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Our Courses
                        </h1>
                        <p className="text-xl text-blue-50">
                            Comprehensive dental education programs designed to elevate your
                            clinical skills and advance your career
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Course Filter */}
            <Section className="bg-gray-50 pt-12 pb-8">
                <Container>
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-semibold">Filter by:</span>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                        ? "bg-gradient-primary text-white shadow-lg"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Courses Grid */}
            <Section className="bg-gray-50 pt-0">
                <Container>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="premium" className="h-full flex flex-col">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                {course.category}
                                            </div>
                                            {course.featured && (
                                                <Award className="w-5 h-5 text-yellow-500" />
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {course.shortDescription}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {course.duration}
                                            </div>
                                            <div className="font-semibold text-primary-600">
                                                {course.price}
                                            </div>
                                        </div>
                                        {course.collaboration && (
                                            <div className="bg-secondary-50 text-secondary-700 px-3 py-2 rounded-lg text-sm font-medium mb-4">
                                                🤝 Collaboration: {course.collaboration}
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        href={`/courses/${course.slug}`}
                                        variant="outline"
                                        className="w-full mt-4"
                                    >
                                        View Details
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="text-center py-16">
                            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-xl text-gray-600">
                                No courses found in this category.
                            </p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* CTA Section */}
            <Section className="bg-gradient-primary text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Can't Decide Which Course is Right for You?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Our academic counselors are here to help you choose the perfect
                            program based on your goals and experience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="secondary" className="text-lg">
                                Book a Counseling Session
                            </Button>
                            <Button
                                href="/faqs"
                                variant="outline"
                                className="text-lg text-white border-white hover:bg-white hover:text-blue-900"
                            >
                                View FAQs
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
