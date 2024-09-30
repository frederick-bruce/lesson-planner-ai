import Banner from "@/components/banner";
import Features from "@/components/features";
import Newsletter from "@/components/newsletter";

export default function HomePage() {
  return (
    <main className="flex-grow">
      <Banner />
      <Features />
      <Newsletter />
    </main>
  );
}
