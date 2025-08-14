import { eq } from "drizzle-orm";

import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import { files as filesSchema } from "~/server/db/schema";

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
  const files = await db
    .select()
    .from(filesSchema)
    .where((f) => eq(f.parent, parsedFolderId));
  return (
    <DriveContents
      files={files}
      viewMode={props.viewMode ?? "list"}
      searchQuery={props.searchQuery ?? ""}
    ></DriveContents>
  );
}
