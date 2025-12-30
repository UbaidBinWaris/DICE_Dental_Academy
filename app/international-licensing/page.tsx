"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Globe,
    BookOpen,
    Award,
    Users,
    CheckCircle,
    TrendingUp,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import licensingData from "@/data/licensing.json";

export default function InternationalLicensingPage() {
    const [selectedCountry, setSelectedCountry] = useState(
        licensingData.internationalLicensing[0].id
    );

    const selectedExam = licensingData.internationalLicensing.find(
        (exam) => exam.id === selectedCountry
    );

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
                        <Globe className="w-16 h-16 mx-auto mb-6 text-white" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            International Licensing Exam Preparation
                        </h1>
                        <p className="text-xl text-blue-50 mb-8">
                            Comprehensive preparation for dental licensing examinations
                            worldwide
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {licensingData.internationalLicensing.map((exam) => (
                                <div
                                    key={exam.id}
                                    className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold"
                                >
                                    {exam.icon} {exam.country}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Country Selector */}
            <Section className="bg-gray-50 pt-12 pb-8">
                <Container>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {licensingData.internationalLicensing.map((exam) => (
                            <button
                                key={exam.id}
                                onClick={() => setSelectedCountry(exam.id)}
                                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all ${selectedCountry === exam.id
                                        ? "bg-gradient-primary text-white shadow-xl scale-105"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <span className="text-2xl">{exam.icon}</span>
                                <div className="text-left">
                                    <div className="text-sm font-medium">{exam.country}</div>
                                    <div className="text-xs opacity-75">{exam.examName}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Exam Details */}
            {selectedExam && (
                <>
                    <Section className="bg-gray-50 pt-0">
                        <Container>
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Overview */}
                                    <Card variant="premium">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                            {selectedExam.examName}
                                        </h2>
                                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                            {selectedExam.overview}
                                        </p>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="bg-primary-50 p-4 rounded-lg">
                                                <div className="text-sm text-primary-600 font-semibold mb-1">
                                                    Difficulty
                                                </div>
                                                <div className="text-lg font-bold text-gray-900">
                                                    {selectedExam.difficulty}
                                                </div>
                                            </div>
                                            <div className="bg-secondary-50 p-4 rounded-lg">
                                                <div className="text-sm text-secondary-600 font-semibold mb-1">
                                                    Duration
                                                </div>
                                                <div className="text-lg font-bold text-gray-900">
                                                    {selectedExam.duration}
                                                </div>
                                            </div>
                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <div className="text-sm text-green-600 font-semibold mb-1">
                                                    Success Rate
                                                </div>
                                                <div className="text-lg font-bold text-gray-900">
                                                    {selectedExam.successRate}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Exam Structure */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                            Exam Structure
                                        </h3>
                                        <div className="space-y-6">
                                            {Object.entries(selectedExam.examStructure).map(
                                                ([key, section]: [string, any]) => (
                                                    <Card key={key} variant="premium">
                                                        <h4 className="text-xl font-bold text-gray-900 mb-4">
                                                            {section.name}
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {section.format && (
                                                                <div className="flex items-start gap-2">
                                                                    <BookOpen className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                                                    <div>
                                                                        <strong className="text-gray-700">
                                                                            Format:
                                                                        </strong>{" "}
                                                                        <span className="text-gray-600">
                                                                            {section.format}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {section.duration && (
                                                                <div className="flex items-start gap-2">
                                                                    <BookOpen className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                                                    <div>
                                                                        <strong className="text-gray-700">
                                                                            Duration:
                                                                        </strong>{" "}
                                                                        <span className="text-gray-600">
                                                                            {section.duration}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {section.sections && (
                                                                <div>
                                                                    <strong className="text-gray-700 block mb-2">
                                                                        Sections:
                                                                    </strong>
                                                                    <ul className="space-y-1">
                                                                        {section.sections.map(
                                                                            (item: string, idx: number) => (
                                                                                <li
                                                                                    key={idx}
                                                                                    className="flex items-center gap-2 text-gray-600"
                                                                                >
                                                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                                                    {item}
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                            {section.subjects && (
                                                                <div>
                                                                    <strong className="text-gray-700 block mb-2">
                                                                        Subjects:
                                                                    </strong>
                                                                    <ul className="space-y-1">
                                                                        {section.subjects.map(
                                                                            (item: string, idx: number) => (
                                                                                <li
                                                                                    key={idx}
                                                                                    className="flex items-center gap-2 text-gray-600"
                                                                                >
                                                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                                                    {item}
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                            {section.skills && (
                                                                <div>
                                                                    <strong className="text-gray-700 block mb-2">
                                                                        Skills Assessed:
                                                                    </strong>
                                                                    <ul className="space-y-1">
                                                                        {section.skills.map(
                                                                            (item: string, idx: number) => (
                                                                                <li
                                                                                    key={idx}
                                                                                    className="flex items-center gap-2 text-gray-600"
                                                                                >
                                                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                                                    {item}
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                            {section.components && (
                                                                <div>
                                                                    <strong className="text-gray-700 block mb-2">
                                                                        Components:
                                                                    </strong>
                                                                    <ul className="space-y-1">
                                                                        {section.components.map(
                                                                            (item: string, idx: number) => (
                                                                                <li
                                                                                    key={idx}
                                                                                    className="flex items-center gap-2 text-gray-600"
                                                                                >
                                                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                                                    {item}
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Card>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* DICE Preparation */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                            How DICE Prepares You
                                        </h3>
                                        <Card variant="premium" className="bg-gradient-to-br from-blue-50 to-teal-50">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {selectedExam.dicePreparation.map(
                                                    (method: string, index: number) => (
                                                        <div key={index} className="flex items-start gap-3">
                                                            <Award className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{method}</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                            Requirements
                                        </h3>
                                        <Card variant="premium">
                                            <ul className="space-y-3">
                                                {selectedExam.requirements.map(
                                                    (req: string, index: number) => (
                                                        <li key={index} className="flex items-start gap-3">
                                                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{req}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </Card>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    <Card variant="premium" className="sticky top-24">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            Quick Info
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">
                                                    Country
                                                </div>
                                                <div className="font-semibold text-gray-900">
                                                    {selectedExam.icon} {selectedExam.country}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">
                                                    Exam Name
                                                </div>
                                                <div className="font-semibold text-gray-900">
                                                    {selectedExam.examName}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">
                                                    Preparation Time
                                                </div>
                                                <div className="font-semibold text-gray-900">
                                                    {selectedExam.duration}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">
                                                    DICE Success Rate
                                                </div>
                                                <div className="font-semibold text-green-600 text-lg flex items-center gap-2">
                                                    <TrendingUp className="w-5 h-5" />
                                                    {selectedExam.successRate}
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t border-gray-200">
                                                <div className="text-sm text-gray-600 mb-2">
                                                    Career Path
                                                </div>
                                                <p className="text-sm text-gray-700">
                                                    {selectedExam.careerPath}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-3">
                                            <Button
                                                href="/contact"
                                                variant="primary"
                                                className="w-full"
                                            >
                                                Start Preparation
                                            </Button>
                                            <Button
                                                href="/contact"
                                                variant="outline"
                                                className="w-full"
                                            >
                                                Book Counseling
                                            </Button>
                                        </div>
                                    </Card>

                                    {selectedExam.videoUrl && (
                                        <Card variant="premium">
                                            <h4 className="font-bold text-gray-900 mb-3">
                                                Watch Success Stories
                                            </h4>
                                            <Button
                                                href={selectedExam.videoUrl}
                                                variant="secondary"
                                                className="w-full"
                                            >
                                                View Video
                                            </Button>
                                        </Card>
                                    )}
                                </div>
                            </div>
                        </Container>
                    </Section>
                </>
            )}

            {/* CTA Section */}
            <Section className="bg-gradient-primary text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Pursue Your International Goals?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join our proven exam preparation programs and achieve your dream
                            of practicing dentistry abroad.
                        </p>
                        <Button href="/contact" variant="secondary" className="text-lg">
                            Get Started Today
                        </Button>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
