import React from "react";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    gradient?: "primary" | "hero" | "none";
}

export function Section({
    children,
    className = "",
    gradient = "none",
}: SectionProps) {
    const gradientClasses = {
        primary: "bg-gradient-primary",
        hero: "bg-gradient-hero",
        none: "",
    };

    return (
        <section className={`section ${gradientClasses[gradient]} ${className}`}>
            {children}
        </section>
    );
}
