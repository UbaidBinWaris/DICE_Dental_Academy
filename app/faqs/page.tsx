"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Accordion } from "@/components/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import faqsData from "@/data/faqs.json";

export default function FAQsPage() {
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
                        <HelpCircle className="w-16 h-16 mx-auto mb-6 text-white" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-blue-50">
                            Find answers to common questions about our programs, admissions,
                            and facilities
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* FAQ Categories */}
            <Section className="bg-gray-50">
                <Container>
                    <div className="max-w-4xl mx-auto space-y-12">
                        {faqsData.faqCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={categoryIndex}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.1 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    {category.category}
                                </h2>
                                <Accordion
                                    items={category.faqs.map((faq) => ({
                                        question: faq.question,
                                        answer: faq.answer,
                                    }))}
                                />
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Still Have Questions */}
            <Section className="bg-gradient-primary text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Still Have Questions?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Our admissions team is here to help you. Get in touch with us for
                            personalized guidance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="btn btn-secondary text-lg px-8 py-4"
                            >
                                Contact Us
                            </a>
                            <a
                                href={`https://wa.me/+923001234567?text=Hello! I have questions about DICE Dental Academy.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-900"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
