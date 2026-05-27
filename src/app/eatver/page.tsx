import fs from "fs/promises";
import path from "path";
import Header from "@/components/Header";
import Eatver from "@/components/Eatver";
import Footer from "@/components/Footer";

async function getEatverData() {
  try {
    const filePath = path.join(process.cwd(), "src/data/db.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const db = JSON.parse(fileContent);
    return db.eatver || [];
  } catch (error) {
    console.error("Error reading database inside eatver page.tsx", error);
    return [];
  }
}

export default async function EatverPage() {
  const pins = await getEatverData();

  return (
    <div className="flex flex-col min-h-screen bg-cream-bg pt-20">
      <Header />
      <main className="flex-grow py-12">
        <Eatver pins={pins} />
      </main>
      <Footer />
    </div>
  );
}
