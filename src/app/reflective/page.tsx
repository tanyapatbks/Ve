import fs from "fs/promises";
import path from "path";
import Header from "@/components/Header";
import Reflective from "@/components/Reflective";
import Footer from "@/components/Footer";

async function getReflectiveData() {
  try {
    const filePath = path.join(process.cwd(), "src/data/db.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const db = JSON.parse(fileContent);
    return db.reflective || [];
  } catch (error) {
    console.error("Error reading database inside reflective page.tsx", error);
    return [];
  }
}

export default async function ReflectivePage() {
  const items = await getReflectiveData();

  return (
    <div className="flex flex-col min-h-screen bg-cream-bg pt-20">
      <Header />
      <main className="flex-grow py-12">
        <Reflective items={items} />
      </main>
      <Footer />
    </div>
  );
}
