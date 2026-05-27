import fs from "fs/promises";
import path from "path";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Perspective from "@/components/Perspective";
import Creative from "@/components/Creative";
import Reflective from "@/components/Reflective";
import Fooder from "@/components/Fooder";
import Footer from "@/components/Footer";

async function getDbData() {
  try {
    const filePath = path.join(process.cwd(), "src/data/db.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading database file inside page.tsx", error);
    return {
      perspective: [],
      creative: [],
      reflective: [],
      fooder: []
    };
  }
}

export default async function Home() {
  const dbData = await getDbData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Full-screen interactive split hero */}
        <Hero />

        {/* Horizontal scroll Perspective timeline */}
        <Perspective items={dbData.perspective} />

        {/* Creative Moments & Creations portfolio */}
        <Creative items={dbData.creative} />

        {/* Lectures & slides Reflective learning resources */}
        <Reflective items={dbData.reflective} />

        {/* Sepia-creamed Leaflet Food map */}
        <Fooder pins={dbData.fooder} />
      </main>

      {/* Social Footer */}
      <Footer />
    </div>
  );
}
