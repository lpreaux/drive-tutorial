import "server-only";

import { db, type Transaction } from "~/server/db/index";
import { type DBFileInsertType, files_table } from "~/server/db/schema";
import { asc, desc, eq } from "drizzle-orm";

// Type pour la transaction ou la DB normale
type DbOrTransaction = typeof db | Transaction;

export const QUERIES = {
  getFolderContent: function (folderId: number, dbOrTx: DbOrTransaction = db) {
    return dbOrTx
      .select()
      .from(files_table)
      .where((f) => eq(f.parentId, folderId))
      .orderBy(desc(files_table.type), asc(files_table.name));
  },

  getAllParents: async function (
    folderId: number,
    dbOrTx: DbOrTransaction = db,
  ) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const parent = await dbOrTx
        .select()
        .from(files_table)
        .where((f) => eq(f.id, currentId!));
      if (!parent[0]) {
        throw new Error("Parent not found!");
      }
      parents.unshift(parent[0]);
      currentId = parent[0].parentId;
    }
    return parents;
  },

  getFolderById: async function (
    folderId: number,
    dbOrTx: DbOrTransaction = db,
  ) {
    const folder = await dbOrTx
      .select()
      .from(files_table)
      .where((f) => eq(f.id, folderId));
    return folder[0];
  },

  getFoldersByParentAndOwner: async function (
    parentId: number,
    ownerId: string,
    dbOrTx: DbOrTransaction = db,
  ) {
    return dbOrTx
      .select()
      .from(files_table)
      .where((f) => eq(f.parentId, parentId) && eq(f.ownerId, ownerId));
  },
};

export const MUTATIONS = {
  createFile: function (
    file: DBFileInsertType | DBFileInsertType[],
    dbOrTx: DbOrTransaction = db,
  ) {
    if (Array.isArray(file)) {
      return dbOrTx.insert(files_table).values(file).$returningId();
    }
    return dbOrTx.insert(files_table).values(file).$returningId();
  },

  deleteFile: function (fileId: number, dbOrTx: DbOrTransaction = db) {
    return dbOrTx.delete(files_table).where(eq(files_table.id, fileId));
  },

  updateFile: function (
    fileId: number,
    updates: Partial<DBFileInsertType>,
    dbOrTx: DbOrTransaction = db,
  ) {
    return dbOrTx
      .update(files_table)
      .set(updates)
      .where(eq(files_table.id, fileId));
  },
};
