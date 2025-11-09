import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Vibe Portfolio",
  description: "Get in touch with me",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-extrabold dark:text-white md:text-6xl">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800 md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
