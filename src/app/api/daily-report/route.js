import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { errorPayload, successPayload } from "@/lib/payload";

export async function GET() {
  const client = await connectToDatabase();
  const db = client.db();

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(errorPayload({ message: "User ID is required." }, 400), { status: 400 });
  }

  try {
    const dailyReport = await db.collection("tasks").find({ userId }).sort({ created_at: -1 }).toArray();

    if (dailyReport.length === 0) {
      return NextResponse.json(errorPayload({ message: "Daily report not found." }, 404), { status: 404 });
    }

    return NextResponse.json(
      successPayload({ data: dailyReport, message: "Fetching daily report successfully.", code: 200 }),
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(errorPayload(err.message || "Something when wrong.", 500), { status: 500 });
  } finally {
    client.close();
  }
}

export async function POST(req) {
  const client = await connectToDatabase();
  const db = client.db();

  const { userId } = await auth();
  const data = await req.json();

  const { tasks } = data;

  if (!userId) {
    return NextResponse.json(errorPayload({ message: "User ID is required." }, 400), { status: 400 });
  }

  try {
    const res = await db.collection("tasks").insertOne({ ...data, userId, created_at: new Date() });

    if (!res.insertedId || tasks.length === 0) {
      throw new Error("Posting daily report failed.");
    }

    return NextResponse.json(successPayload({ message: "Posting daily report successfully.", data: data, code: 201 }), {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json(errorPayload(err.message || "Something when wrong.", 500), { status: 500 });
  } finally {
    client.close();
  }
}
