import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { files_table } from "~/server/db/schema";
import { mockData } from "~/lib/mock-data";

export default async function SandboxPage() {
  const user = await auth();
  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  const folders = await db
    .select()
    .from(files_table)
    .where((f) => eq(f.ownerId, user.userId));

  console.log(folders);

  return (
    <>
      <form
        action={async () => {
          "use server";
          const user = await auth();
          if (!user.userId) {
            throw new Error("Unauthorized");
          }

          const realIds: Record<number, number> = {};

          for (const file of mockData.filter((f) => f.type === "folder")) {
            const dbFile = await db
              .insert(files_table)
              .values({
                ownerId: user.userId,
                name: file.name,
                type: file.type,
                parentId:
                  file.parentId !== null ? realIds[file.parentId] : null,
              })
              .$returningId();
            realIds[file.id] = dbFile[0]!.id;
          }

          const insertableFiles = mockData
            .filter((f) => f.type === "file")
            .map((f) => ({
              ownerId: user.userId,
              name: f.name,
              type: f.type,
              parentId: realIds[f.parentId],
              size: f.size,
              url: f.url,
            }));
          await db.insert(files_table).values(insertableFiles);
        }}
      >
        <button type="submit">Create mock data</button>
      </form>
    </>
  );
}
