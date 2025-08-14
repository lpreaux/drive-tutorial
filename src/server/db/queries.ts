import "server-only";

import {db} from "~/server/db/index";
import {type DBFileInsertType, files_table} from "~/server/db/schema";
import {asc, desc, eq} from "drizzle-orm";

export const QUERIES = {
    getFolderContent: function (folderId: number) {
        return db
            .select()
            .from(files_table)
            .where((f) => eq(f.parentId, folderId))
            .orderBy(desc(files_table.type), asc(files_table.name));
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
            currentId = parent[0].parentId;
        }
        return parents;
    },

    getFolderById: async function (folderId: number) {
        const folder = await db
            .select()
            .from(files_table)
            .where((f) => eq(f.id, folderId));
        return folder[0];
    },
};

export const MUTATIONS = {
    createFile: function (file: DBFileInsertType) {
        return db.insert(files_table).values(file);
    },
};
