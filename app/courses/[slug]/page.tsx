"use client";

import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Clock,
    Award,
    Users,
    CheckCircle,
    BookOpen,
    Video,
    DollarSign,
    GraduationCap,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import coursesData from "@/data/courses.json";

export default function CourseDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    // Find course from all categories
    const allCourses = [
        ...coursesData.pgDiplomas,
        ...coursesData.specializedPrograms,
        ...coursesData.shortCourses,
    ];

    const course = allCourses.find((c) => c.slug === params.slug);

    if (!course) {
        notFound();
    }

    return (
        <>
            <Header />
            <WhatsAppButton />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-hero">
                <Container className="relative z-10 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            {course.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {course.title}
                        </h1>
                        <p className="text-xl text-blue-50 mb-8">
                            {course.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-6 text-white mb-8">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5" />
                                <span className="font-semibold">{course.price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                <span>{course.eligibility}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button href="/contact" variant="secondary" className="text-lg">
                                Enroll Now
                            </Button>
                            {course.videoUrl && (
                                <Button
                                    href={course.videoUrl}
                                    variant="outline"
                                    className="text-lg text-white border-white hover:bg-white hover:text-blue-900"
                                >
                                    <Video className="w-5 h-5" />
                                    Watch Video
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Course Overview */}
            <Section>
                <Container>
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Course Overview
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                {course.overview}
                            </p>

                            {course.collaboration && (
                                <Card variant="premium" className="mb-8 bg-secondary-50 border-secondary-200">
                                    <div className="flex items-start gap-4">
                                        <Award className="w-8 h-8 text-secondary-600 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                International Collaboration
                                            </h3>
                                            <p className="text-gray-700">
                                                This program is offered in collaboration with{" "}
                                                <strong>{course.collaboration}</strong>, ensuring
                                                international-level training and certification.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Highlights */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                What You'll Learn
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-12">
                                {course.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{highlight}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Curriculum */}
                            {course.curriculum && course.curriculum.length > 0 && (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                        Curriculum
                                    </h3>
                                    <div className="space-y-4 mb-12">
                                        {course.curriculum.map((module, index) => (
                                            <Card key={index} variant="premium">
                                                <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                    {module.module}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {module.topics.map((topic, topicIndex) => (
                                                        <li
                                                            key={topicIndex}
                                                            className="flex items-center gap-2 text-gray-700"
                                                        >
                                                            <BookOpen className="w-4 h-4 text-primary-500" />
                                                            {topic}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Card>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Faculty */}
                            {course.faculty && course.faculty.length > 0 && (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        Expert Faculty
                                    </h3>
                                    <div className="flex flex-wrap gap-3 mb-12">
                                        {course.faculty.map((faculty, index) => (
                                            <div
                                                key={index}
                                                className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                                            >
                                                <Users className="w-4 h-4" />
                                                {faculty}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Certification */}
                            <Card variant="premium" className="bg-gradient-primary text-white">
                                <div className="flex items-start gap-4">
                                    <GraduationCap className="w-10 h-10 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Certification</h3>
                                        <p className="text-blue-50">{course.certification}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card variant="premium" className="sticky top-24">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Course Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-3 border-b border-gray-200">
                                        <span className="text-gray-600">Duration</span>
                                        <span className="font-semibold text-gray-900">
                                            {course.duration}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-gray-200">
                                        <span className="text-gray-600">Eligibility</span>
                                        <span className="font-semibold text-gray-900">
                                            {course.eligibility}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-gray-200">
                                        <span className="text-gray-600">Course Fee</span>
                                        <span className="font-semibold text-primary-600 text-lg">
                                            {course.price}
                                        </span>
                                    </div>
                                    {course.collaboration && (
                                        <div className="py-3">
                                            <span className="text-gray-600 block mb-2">
                                                Partner Institution
                                            </span>
                                            <span className="font-semibold text-secondary-600">
                                                {course.collaboration}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Button href="/contact" variant="primary" className="w-full">
                                        Apply Now
                                    </Button>
                                    <Button
                                        href="/contact"
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Request Information
                                    </Button>
                                </div>

                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600 text-center">
                                        <strong>Need help?</strong> Contact our admissions team for
                                        personalized guidance.
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section className="bg-gradient-primary text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Enroll in This Program?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Take the next step in your dental career. Limited seats available
                            for upcoming batches.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="secondary" className="text-lg">
                                Enroll Now
                            </Button>
                            <Button
                                href="/courses"
                                variant="outline"
                                className="text-lg text-white border-white hover:bg-white hover:text-blue-900"
                            >
                                View All Courses
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
