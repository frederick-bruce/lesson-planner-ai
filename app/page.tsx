import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, GraduationCap, Layout } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-6">
            Create AI-Powered Lesson Plans in Minutes
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Streamline your teaching process with our advanced AI technology.
            Generate comprehensive, engaging lesson plans tailored to your
            needs.
          </p>
          <div className="flex space-x-4">
            <Button size="lg">
              <Link href="/generate">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <BookOpen className="h-12 w-12 mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">
                Input Your Requirements
              </h3>
              <p className="text-muted-foreground">
                Specify your subject, grade level, and learning objectives.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Layout className="h-12 w-12 mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">AI Generates Plan</h3>
              <p className="text-muted-foreground">
                Our AI creates a detailed lesson plan based on your input.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <GraduationCap className="h-12 w-12 mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">
                Teach with Confidence
              </h3>
              <p className="text-muted-foreground">
                Use your personalized plan to deliver engaging lessons.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Stay Updated</h2>
          <div className="max-w-md mx-auto">
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
