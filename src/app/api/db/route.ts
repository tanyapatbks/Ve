import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/data/db.json");

async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Read db error", error);
    return null;
  }
}

async function writeDb(data: any) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Write db error", error);
    return false;
  }
}

export async function GET() {
  const db = await readDb();
  if (!db) {
    return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
  }
  return NextResponse.json(db);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, password, data } = body;

    // Simple default password or environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || "veperspective123";

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized: Invalid password" }, { status: 401 });
    }

    if (action === "auth") {
      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    }

    if (action === "update") {
      if (!data) {
        return NextResponse.json({ error: "Missing database data" }, { status: 400 });
      }

      const success = await writeDb(data);
      if (!success) {
        return NextResponse.json({ error: "Failed to write to database" }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: "Database updated successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
