import fs from "fs/promises";
import path from "path";
import Header from "@/components/Header";
import Perspective from "@/components/Perspective";
import Footer from "@/components/Footer";

async function getPerspectiveData() {
  try {
    const filePath = path.join(process.cwd(), "src/data/db.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const db = JSON.parse(fileContent);
    return db.perspective || [];
  } catch (error) {
    console.error("Error reading database inside perspective page.tsx", error);
    return [];
  }
}

export default async function PerspectivePage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-950">
      <Header />
      <main className="flex-grow pt-20 h-[calc(100vh-80px)] overflow-hidden relative">
        <Perspective />
      </main>
    </div>
  );
}
