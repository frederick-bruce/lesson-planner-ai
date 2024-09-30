import Link from "next/link";
import { Button } from "./ui/button";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-6">
          Create AI-Powered Lesson Plans in Minutes
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Streamline your teaching process with our advanced AI technology.
          Generate comprehensive, engaging lesson plans tailored to your needs.
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
  );
};
export default Banner;
