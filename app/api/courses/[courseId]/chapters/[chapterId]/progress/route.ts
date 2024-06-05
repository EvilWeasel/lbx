import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const { isCompleted } = await req.json();

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          chapterId: params.chapterId,
          userId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("An error occurred, please try again.", {
      status: 500,
    });
  }
}
