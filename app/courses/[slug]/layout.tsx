import { Metadata } from "next";
import coursesData from "@/data/courses.json";

export async function generateStaticParams() {
    const allCourses = [
        ...coursesData.pgDiplomas,
        ...coursesData.specializedPrograms,
        ...coursesData.shortCourses,
    ];

    return allCourses.map((course) => ({
        slug: course.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const allCourses = [
        ...coursesData.pgDiplomas,
        ...coursesData.specializedPrograms,
        ...coursesData.shortCourses,
    ];

    const course = allCourses.find((c) => c.slug === params.slug);

    if (!course) {
        return {
            title: "Course Not Found",
        };
    }

    return {
        title: course.title,
        description: course.shortDescription,
    };
}

export default function CourseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
