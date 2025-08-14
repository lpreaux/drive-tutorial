import { eq } from "drizzle-orm";

import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import { files as filesSchema } from "~/server/db/schema";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const parent = await db
      .select()
      .from(filesSchema)
      .where((f) => eq(f.id, currentId!));
    if (!parent[0]) {
      throw new Error("Parent not found!");
    }
    parents.unshift(parent[0]);
    currentId = parent[0].parent;
  }
  return parents;
}

export default async function FolderPage(props: {
  params: Promise<{ folderId: string }>;
  viewMode: "list" | "grid";
  searchQuery: string;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID!</div>;
  }
  const filesPromise = db
    .select()
    .from(filesSchema)
    .where((f) => eq(f.parent, parsedFolderId));
  const parentsPromise = await getAllParents(parsedFolderId);

  const [files, parents] = await Promise.all([filesPromise, parentsPromise]);
  return (
    <DriveContents
      files={files}
      parents={parents}
      viewMode={props.viewMode ?? "list"}
      searchQuery={props.searchQuery ?? ""}
    ></DriveContents>
  );
}
