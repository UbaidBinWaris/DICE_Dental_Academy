"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
    const whatsappNumber = "+923001234567"; // From site data
    const message = encodeURIComponent(
        "Hello! I'm interested in learning more about DICE Dental Academy programs."
    );

    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[1000] bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Chat with us on WhatsApp
            </span>
            <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-75"></div>
        </a>
    );
}
