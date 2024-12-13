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

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  try {
    const dailyReport = await db.collection("tasks").find({
      userId,
      created_at: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    }).sort({ created_at: 1 }).toArray();

    return NextResponse.json(
      successPayload({ data: dailyReport, message: "Fetching daily report successfully.", code: 200 }),
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(errorPayload(err.message || "Something went wrong.", 500), { status: 500 });
  } finally {
    client.close();
  }
}

