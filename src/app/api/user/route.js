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
    const users = await db.collection("users").find({ userId }).sort({ created_at: -1 }).toArray();

    return NextResponse.json(
      successPayload({ data: users, message: "Fetching user data successfully.", code: 200 }),
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

  if (!userId) {
    return NextResponse.json(errorPayload({ message: "User ID is required." }, 400), { status: 400 });
  }

  try {
    const timestamp = new Date();

    const res = await db.collection("users").updateOne(
      { userId },
      {
        $set: { ...data, updated_at: timestamp },
        $setOnInsert: { userId, created_at: timestamp },
      },
      { upsert: true }
    );

    if (!res.matchedCount && !res.upsertedCount) {
      throw new Error("Saving user data failed.");
    }

    return NextResponse.json(successPayload({ message: "Saving user data successfully.", data: data, code: 201 }), {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json(errorPayload(err.message || "Something when wrong.", 500), { status: 500 });
  } finally {
    client.close();
  }
}
