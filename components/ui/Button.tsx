import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    children: React.ReactNode;
    href?: string;
    className?: string;
}

export function Button({
    variant = "primary",
    children,
    href,
    className = "",
    ...props
}: ButtonProps) {
    const baseClasses = "btn";
    const variantClasses = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        outline: "btn-outline",
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={combinedClasses}>
                {children}
            </a>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
