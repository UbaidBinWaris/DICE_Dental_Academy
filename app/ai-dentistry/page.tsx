"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Cpu,
    Scan,
    BrainCircuit,
    TrendingUp,
    Award,
    CheckCircle,
    Sparkles,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import coursesData from "@/data/courses.json";

export default function AIDentistryPage() {
    const aiCourse = coursesData.shortCourses.find((c) => c.id === "ai-dentistry");

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
                        className="text-center max-w-4xl mx-auto"
                    >
                        <BrainCircuit className="w-16 h-16 mx-auto mb-6 text-white" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            AI in Dentistry
                        </h1>
                        <p className="text-xl text-blue-50 mb-8">
                            Digital Workflows, AI Diagnostics & The Future of Dentistry
                        </p>
                        {aiCourse && (
                            <div className="flex flex-wrap justify-center gap-6 text-white mb-8">
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    <span>{aiCourse.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    <span className="font-semibold">{aiCourse.price}</span>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="secondary" className="text-lg">
                                Enroll in AI Course
                            </Button>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Introduction */}
            <Section>
                <Container>
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            The Future of Dentistry is Here
                        </h2>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Artificial Intelligence is revolutionizing dental practice.
                            From AI-powered diagnostics to digital treatment planning,
                            modern dentistry is becoming more precise, efficient, and
                            patient-friendly. Stay ahead of the curve with our comprehensive
                            AI in Dentistry course.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card variant="premium">
                            <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                                <Scan className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                AI-Powered Diagnosis
                            </h3>
                            <p className="text-gray-600">
                                Learn to use AI systems for caries detection, periodontal
                                assessment, and radiographic analysis with higher accuracy.
                            </p>
                        </Card>

                        <Card variant="premium">
                            <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                                <Cpu className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Digital Workflows
                            </h3>
                            <p className="text-gray-600">
                                Master digital impression systems, CAD/CAM technology, and
                                seamless integration with AI diagnostic tools.
                            </p>
                        </Card>

                        <Card variant="premium">
                            <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Future Technologies
                            </h3>
                            <p className="text-gray-600">
                                Explore emerging AI applications including predictive analytics,
                                automated treatment planning, and patient communication tools.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Applications */}
            <Section className="bg-gray-50">
                <Container>
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                        AI Applications in Modern Dentistry
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card variant="premium">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Clinical Diagnostics
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Caries Detection:</strong> AI algorithms analyzing
                                        radiographs with 95%+ accuracy
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Periodontal Analysis:</strong> Automated bone loss
                                        measurement and risk assessment
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Pathology Screening:</strong> Early detection of
                                        oral lesions and cancers
                                    </div>
                                </li>
                            </ul>
                        </Card>

                        <Card variant="premium">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Treatment Planning
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Orthodontic Planning:</strong> AI-driven aligner
                                        treatment simulations
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Implant Placement:</strong> Optimized positioning
                                        using AI analysis
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Smile Design:</strong> Predictive aesthetic outcomes
                                        with AI simulation
                                    </div>
                                </li>
                            </ul>
                        </Card>

                        <Card variant="premium">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Practice Management
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Appointment Optimization:</strong> AI-powered
                                        scheduling reducing no-shows
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Patient Communication:</strong> Chatbots for queries
                                        and follow-ups
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Inventory Management:</strong> Predictive analytics
                                        for supply needs
                                    </div>
                                </li>
                            </ul>
                        </Card>

                        <Card variant="premium">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Research & Education
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Clinical Research:</strong> Big data analysis for
                                        treatment outcomes
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Virtual Training:</strong> AI-powered simulation for
                                        skill development
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Continuing Education:</strong> Personalized learning
                                        paths based on AI
                                    </div>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Course Details */}
            {aiCourse && (
                <Section>
                    <Container>
                        <div className=" max-w-4xl mx-auto">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                                AI in Dentistry Course
                            </h2>

                            <Card variant="premium" className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    What You'll Learn
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {aiCourse.highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <Card variant="glass">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">Duration</div>
                                        <div className="text-xl font-bold text-gray-900">
                                            {aiCourse.duration}
                                        </div>
                                    </div>
                                </Card>
                                <Card variant="glass">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">Course Fee</div>
                                        <div className="text-xl font-bold text-primary-600">
                                            {aiCourse.price}
                                        </div>
                                    </div>
                                </Card>
                                <Card variant="glass">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">
                                            Certification
                                        </div>
                                        <div className="text-lg font-bold text-gray-900">
                                            DICE Certificate
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className="text-center">
                                <Button href="/contact" variant="primary" className="text-lg">
                                    Enroll in AI Course
                                </Button>
                            </div>
                        </div>
                    </Container>
                </Section>
            )}

            {/* CTA */}
            <Section className="bg-gradient-primary text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Don't Get Left Behind
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            AI is transforming dentistry rapidly. Equip yourself with the
                            knowledge and skills to thrive in the digital dental era.
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
