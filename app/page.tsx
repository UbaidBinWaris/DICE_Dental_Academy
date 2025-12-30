"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Globe,
  Award,
  TrendingUp,
  Clock,
  Activity,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

// Import JSON data
import coursesData from "@/data/courses.json";
import testimonialsData from "@/data/testimonials.json";
import siteData from "@/data/site.json";

export default function Home() {
  const featuredCourses = [
    ...coursesData.pgDiplomas.filter((c) => c.featured),
    ...coursesData.specializedPrograms.filter((c) => c.featured),
    ...coursesData.shortCourses.filter((c) => c.featured),
  ].slice(0, 6);

  return (
    <>
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-clinical-training.png"
            alt="Dental Training"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-teal-700/85"></div>
        </div>

        {/* Hero Content */}
        <Container className="relative z-10 py-32">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {siteData.hero.headline}
              </h1>
              <h2 className="text-2xl md:text-3xl text-blue-100 mb-4 font-semibold">
                {siteData.hero.subheadline}
              </h2>
              <p className="text-xl text-blue-50 mb-8">
                {siteData.hero.description}
              </p>
              <p className="text-2xl font-bold text-teal-300 mb-12">
                {siteData.site.tagline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/courses" variant="primary" className="text-lg px-8 py-4">
                  <BookOpen className="w-5 h-5" />
                  Explore Courses
                </Button>
                <Button href="/contact" variant="secondary" className="text-lg px-8 py-4">
                  Apply Now
                </Button>
                <Button href="/contact" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-900">
                  Book Counseling
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Section className="bg-gray-50">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                  {stat.icon === "GraduationCap" && <GraduationCap className="w-8 h-8 text-white" />}
                  {stat.icon === "Award" && <Award className="w-8 h-8 text-white" />}
                  {stat.icon === "Users" && <Users className="w-8 h-8 text-white" />}
                  {stat.icon === "TrendingUp" && <TrendingUp className="w-8 h-8 text-white" />}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* About Preview */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About DICE Dental Academy
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {siteData.about.description}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900">Mission:</strong>{" "}
                    <span className="text-gray-600">{siteData.about.mission}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900">Vision:</strong>{" "}
                    <span className="text-gray-600">{siteData.about.vision}</span>
                  </div>
                </div>
              </div>
              <Button href="/about" variant="primary">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/hero-faculty-teaching.png"
                alt="DICE Faculty Teaching"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Featured Courses */}
      <Section className="bg-gradient-to-br from-blue-50 to-teal-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive dental education programs designed to elevate your
              clinical skills and advance your career
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="premium" className="h-full flex flex-col">
                  <div className="flex-1">
                    <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      {course.category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
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

          <div className="text-center mt-12">
            <Button href="/courses" variant="primary" className="text-lg">
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* Why Choose DICE */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose DICE Dental Academy?
            </h2>
            <p className="text-xl text-gray-600">
              Your path to dental excellence starts here
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.about.whyChooseDice.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" className="h-full text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                    {reason.icon === "Users" && <Users className="w-8 h-8 text-white" />}
                    {reason.icon === "Activity" && <Activity className="w-8 h-8 text-white" />}
                    {reason.icon === "Globe" && <Globe className="w-8 h-8 text-white" />}
                    {reason.icon === "Award" && <Award className="w-8 h-8 text-white" />}
                    {reason.icon === "Clock" && <Clock className="w-8 h-8 text-white" />}
                    {reason.icon === "TrendingUp" && <TrendingUp className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600">{reason.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* International Licensing Preview */}
      <Section className="bg-gradient-primary text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <Globe className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              International Licensing Exam Preparation
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Comprehensive preparation for ORE (UK), Abu Dhabi DOH, Canadian
              NDEB, and USA pathways. Expert faculty, mannequin practice, and
              proven success rates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                🇬🇧 ORE - UK
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                🇦🇪 Abu Dhabi DOH
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                🇨🇦 Canada NDEB
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                🇺🇸 USA Pathways
              </div>
            </div>
            <div className="mt-8">
              <Button
                href="/international-licensing"
                variant="secondary"
                className="text-lg"
              >
                Explore Licensing Programs
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our successful graduates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="premium" className="h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.program}
                    </p>
                    <p className="text-sm text-primary-600 font-semibold mt-2">
                      ✓ {testimonial.achievement}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/testimonials" variant="primary">
              Read More Success Stories
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-teal-600 to-blue-700 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Advance Your Dental Career?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join Pakistan's premier dental academy and learn from the best.
              Limited seats available for upcoming batches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary" className="text-lg px-8 py-4">
                Apply Now
              </Button>
              <Button href="/courses" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-900">
                Browse Courses
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
