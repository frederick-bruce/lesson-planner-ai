import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";
import ConvexClerkProvider from "@/providers/convex-clerk-provider";

export const metadata: Metadata = {
  title: "Lesson Plan AI",
  description: "Lesson Plan AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body className="container mx-auto flex flex-col h-screen">
          <Header />
          {children}
          <Toaster />
          <Footer />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
