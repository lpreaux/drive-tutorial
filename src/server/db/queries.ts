import "server-only";

import { db } from "~/server/db/index";
import {type DBFileInsertType, files_table} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getFolderContent: function (folderId: number) {
    return db
      .select()
      .from(files_table)
      .where((f) => eq(f.parent, folderId));
  },

  getAllParents: async function (folderId: number) {
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
  },
};

export const MUTATIONS = {
  createFile: function (input: {
    file: DBFileInsertType,
    userId: string,
  }) {
    return db.insert(files_table).values(input.file);
  },
};
