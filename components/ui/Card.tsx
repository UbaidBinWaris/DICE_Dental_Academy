import React from "react";

interface CardProps {
    children: React.ReactNode;
    variant?: "glass" | "premium" | "default";
    className?: string;
    onClick?: () => void;
}

export function Card({
    children,
    variant = "default",
    className = "",
    onClick,
}: CardProps) {
    const variantClasses = {
        glass: "glass-card",
        premium: "premium-card",
        default: "bg-white rounded-xl p-6 shadow-md border border-gray-100",
    };

    return (
        <div
            className={`${variantClasses[variant]} ${className}`}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
}
