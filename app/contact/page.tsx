import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Vibe Portfolio",
  description: "Get in touch with me",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
          Get In Touch
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
        <ContactForm />
      </div>
    </div>
  );
}

