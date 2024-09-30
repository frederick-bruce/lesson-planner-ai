import { BookOpen, GraduationCap, Layout } from "lucide-react";

const Features = () => {
  return (
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
  );
};
export default Features;
