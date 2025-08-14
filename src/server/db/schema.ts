import {
  int,
  text,
  index,
  singlestoreTableCreator,
  bigint,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `DRIVE-TUTORIAL_${name}`,
);

export const files = createTable(
  "files-table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    size: text("size"),
    url: text("url"),
    modified_at: text("modified_at"),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);
