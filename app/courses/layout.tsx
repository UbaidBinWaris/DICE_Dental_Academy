import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Courses",
    description:
        "Explore our comprehensive range of dental training programs including PG Diplomas, specialized courses, and short courses. Advanced clinical training with expert faculty.",
};

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
