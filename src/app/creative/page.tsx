import fs from "fs/promises";
import path from "path";
import Header from "@/components/Header";
import Creative from "@/components/Creative";
import Footer from "@/components/Footer";

async function getCreativeData() {
  try {
    const filePath = path.join(process.cwd(), "src/data/db.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const db = JSON.parse(fileContent);
    return db.creative || [];
  } catch (error) {
    console.error("Error reading database inside creative page.tsx", error);
    return [];
  }
}

export default async function CreativePage() {
  const items = await getCreativeData();

  return (
    <div className="flex flex-col min-h-screen bg-cream-bg pt-20">
      <Header />
      <main className="flex-grow py-12">
        <Creative items={items} />
      </main>
      <Footer />
    </div>
  );
}
