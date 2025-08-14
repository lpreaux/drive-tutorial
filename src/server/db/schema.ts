import {
  text,
  index,
  singlestoreTableCreator,
  bigint,
  timestamp,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `DRIVE_TUTORIAL_${name}`,
);

export const files_table = createTable(
  "file_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    parentId: bigint("parent_id", { mode: "number", unsigned: true }),
    size: text("size"),
    url: text("url"),
    key: text("key"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    modifiedAt: timestamp("modified_at"),
  },
  (t) => {
    return [
      index("owner_index").on(t.ownerId),
      index("parent_index").on(t.parentId),
    ];
  },
);

export type DBFileInsertType = typeof files_table.$inferInsert;
export type DBFileSelectType = typeof files_table.$inferSelect;
