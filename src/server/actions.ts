"use server";

import { UTApi } from "uploadthing/server";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { db } from "~/server/db";
import { files_table } from "~/server/db/schema";
import { cookies } from "next/headers";

const utapi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }
  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );

  if (!file) {
    return { error: "File not found" };
  }

  if (file.key) {
    const utapiResult = await utapi.deleteFiles([file.key]);
    console.log(utapiResult);
  }

  const dbDeleteResult = await db.delete(files_table).where(eq(files_table.id, fileId));
  console.log(dbDeleteResult);

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}
