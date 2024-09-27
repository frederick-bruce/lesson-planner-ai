import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          About Lesson Plan AI
        </h1>

        <section className="mb-16">
          <p className="text-xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Lesson Plan AI is revolutionizing the way educators prepare for
            their classes. Our advanced artificial intelligence technology
            creates comprehensive, engaging lesson plans tailored to your
            specific needs.
          </p>
          <div className="flex justify-center">
            <Button size="lg">Try It Now</Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Why Choose Lesson Plan AI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-purple-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-center mb-2">
                  Save Time
                </h3>
                <p className="text-center text-muted-foreground">
                  Generate comprehensive lesson plans in minutes, not hours.
                  Focus on what matters most - teaching.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <BookOpen className="h-12 w-12 text-purple-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-center mb-2">
                  Customized Content
                </h3>
                <p className="text-center text-muted-foreground">
                  Our AI adapts to your teaching style, curriculum, and
                  students&apos; needs for personalized lesson plans.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-purple-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-center mb-2">
                  Improve Engagement
                </h3>
                <p className="text-center text-muted-foreground">
                  Create interactive and engaging lessons that captivate your
                  students and enhance learning outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Story</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg"
                alt="Team of educators and AI specialists"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                Founded by a team of passionate educators and AI specialists,
                Lesson Plan AI was born from the desire to empower teachers with
                cutting-edge technology.
              </p>
              <p className="text-lg mb-4">
                We understand the challenges educators face in creating
                engaging, effective lesson plans while managing their many
                responsibilities. Our mission is to streamline this process,
                allowing teachers to focus on what they do best - inspiring and
                educating the next generation.
              </p>
              <p className="text-lg">
                With Lesson Plan AI, we&apos;re not just saving time; we&apos;re
                enhancing the quality of education and making a positive impact
                on students&apos; lives.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-center mb-8">
            What Educators Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  &quot;Lesson Plan AI has transformed my teaching. I can create
                  engaging lessons in a fraction of the time, allowing me to
                  focus more on my students&apos; individual needs.&quot;
                </p>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">
                  High School Science Teacher
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  &quot;As a new teacher, Lesson Plan AI has been invaluable.
                  It&apos;s like having a mentor guiding me through lesson
                  planning, ensuring I cover all necessary elements.&quot;
                </p>
                <p className="font-semibold">Michael Chen</p>
                <p className="text-sm text-muted-foreground">
                  Elementary School Teacher
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
