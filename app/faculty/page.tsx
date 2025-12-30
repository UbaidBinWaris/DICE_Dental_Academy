"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Award, GraduationCap, Globe } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import facultyData from "@/data/faculty.json";

export default function FacultyPage() {
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
                        <Users className="w-16 h-16 mx-auto mb-6 text-white" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Expert Faculty
                        </h1>
                        <p className="text-xl text-blue-50">
                            Learn from highly qualified local and international dental experts
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Faculty Grid */}
            <Section className="bg-gray-50">
                <Container>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facultyData.faculty.map((faculty, index) => (
                            <motion.div
                                key={faculty.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="premium" className="h-full">
                                    {/* Profile Header */}
                                    <div className="text-center mb-6">
                                        <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <GraduationCap className="w-12 h-12 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {faculty.name}
                                        </h3>
                                        <p className="text-primary-600 font-semibold">
                                            {faculty.title}
                                        </p>
                                    </div>

                                    {/* Specialization */}
                                    <div className="mb-4">
                                        <div className="inline-block bg-secondary-50 text-secondary-700 px-3 py-1 rounded-lg text-sm font-medium">
                                            {faculty.specialization}
                                        </div>
                                    </div>

                                    {/* Qualifications */}
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-gray-700 mb-1">
                                            Qualifications:
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {faculty.qualifications}
                                        </p>
                                    </div>

                                    {/* Experience */}
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Award className="w-4 h-4 text-primary-500" />
                                            <span className="font-semibold">
                                                {faculty.experience} of experience
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        {faculty.bio}
                                    </p>

                                    {/* Achievements */}
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-2">
                                            Key Achievements:
                                        </p>
                                        <ul className="space-y-1">
                                            {faculty.achievements.slice(0, 3).map((achievement, i) => (
                                                <li
                                                    key={i}
                                                    className="text-sm text-gray-600 flex items-start gap-2"
                                                >
                                                    <span className="text-green-500 mt-1">✓</span>
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Courses */}
                                    {faculty.courses && faculty.courses.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-xs text-gray-500 mb-2">
                                                Teaching in:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {faculty.courses.map((course, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                                    >
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* International Collaborations */}
            <Section>
                <Container>
                    <div className="text-center mb-12">
                        <Globe className="w-12 h-12 mx-auto mb-4 text-primary-500" />
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            International Collaborations
                        </h2>
                        <p className="text-xl text-gray-600">
                            Partnering with leading institutions worldwide
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {facultyData.collaborations.map((collab, index) => (
                            <motion.div
                                key={collab.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="glass" className="text-center h-full">
                                    <div className="w-16 h-16 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {collab.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">{collab.country}</p>
                                    <p className="text-xs text-gray-500">{collab.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section className="bg-gradient-primary text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Learn from the Best
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join DICE Dental Academy and learn from expert faculty with
                            international experience
                        </p>
                        <a href="/courses" className="btn btn-secondary text-lg px-8 py-4">
                            View Our Courses
                        </a>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
