import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="flex flex-col min-h-screen h-full justify-between">
        <Header />
        <main className="flex-1">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
