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
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existing = await db.collection("tasks").findOne({
      userId,
      reportStatus: "Complete",
      created_at: { $gte: startOfDay, $lte: endOfDay },
    });

    const res = existing
      ? await db.collection("tasks").updateOne(
          { _id: existing._id },
          {
            $set: { ...data, updated_at: new Date() },
          }
        )
      : await db.collection("tasks").insertOne({ ...data, userId, created_at: new Date() });

    if (!res.insertedId || tasks.length === 0) {
      throw new Error("Saving daily report failed.");
    }

    return NextResponse.json(successPayload({ message: "Saving daily report successfully.", data: data, code: 201 }), {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json(errorPayload(err.message || "Something when wrong.", 500), { status: 500 });
  } finally {
    client.close();
  }
}
