import { db } from "~/server/db/index";
import { files_table } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export function getFolderContent(folderId: number) {
  return db
    .select()
    .from(files_table)
    .where((f) => eq(f.parent, folderId));
}

export async git function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const parent = await db
      .select()
      .from(files_table)
      .where((f) => eq(f.id, currentId!));
    if (!parent[0]) {
      throw new Error("Parent not found!");
    }
    parents.unshift(parent[0]);
    currentId = parent[0].parent;
  }
  return parents;
}