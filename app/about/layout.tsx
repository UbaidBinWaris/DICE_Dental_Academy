import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about DICE Dental Academy - Pakistan's premier dental training institute in F-8 Markaz, Islamabad, offering advanced clinical training and international licensing exam preparation.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
