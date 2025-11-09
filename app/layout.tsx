import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibe Portfolio | Full-Stack Developer",
  description: "Personal portfolio showcasing projects, skills, and experience",
  keywords: ["portfolio", "developer", "full-stack", "web development"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Vibe Portfolio | Full-Stack Developer",
    description: "Personal portfolio showcasing projects, skills, and experience",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vibe Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Portfolio | Full-Stack Developer",
    description: "Personal portfolio showcasing projects, skills, and experience",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

