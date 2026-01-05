import type { Metadata } from "next";
import ContactForm from "@/src/components/form/ContactForm"

export const metadata: Metadata = {
    title: "Contacto",
};

export default function ContactPage() {
    return (
        <ContactForm />
    );
}