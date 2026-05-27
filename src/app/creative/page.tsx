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
    <div className="flex flex-col h-screen overflow-hidden bg-cream-bg">
      <Header />
      <main className="flex-grow pt-20 h-[calc(100vh-80px)] overflow-hidden">
        <Creative items={items} />
      </main>
    </div>
  );
}
