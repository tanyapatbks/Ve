import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-cream-bg">
      {/* Navigation Header */}
      <Header />

      {/* Main Fullscreen Portal */}
      <main className="flex-grow h-full overflow-hidden">
        <Hero />
      </main>
    </div>
  );
}
