import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type Lead = {
  name: string;
  email: string;
  company: string;
  website: string;
  city: string;
  service: string;
  notes: string;
  createdAt: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<Lead> | null;
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const lead: Lead = {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    company: String(body.company || "").trim(),
    website: String(body.website || "").trim(),
    city: String(body.city || "").trim(),
    service: String(body.service || "").trim(),
    notes: String(body.notes || "").trim(),
    createdAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.company || !lead.notes || !isEmail(lead.email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "leads.json");
  await mkdir(dir, { recursive: true });
  let existing: Lead[] = [];
  try {
    existing = JSON.parse(await readFile(file, "utf8")) as Lead[];
  } catch {
    existing = [];
  }
  existing.push(lead);
  await writeFile(file, JSON.stringify(existing, null, 2));
  return NextResponse.json({ ok: true });
}
