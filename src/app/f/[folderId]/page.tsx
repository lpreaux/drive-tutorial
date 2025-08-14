import DriveContents from "~/app/drive-contents";
import { getAllParents, getFolderContent } from "~/server/db/queries";

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

  const [files, parents] = await Promise.all([
    getFolderContent(parsedFolderId),
    getAllParents(parsedFolderId),
  ]);

  return (
    <DriveContents
      files={files}
      parents={parents}
      viewMode={props.viewMode ?? "list"}
      searchQuery={props.searchQuery ?? ""}
    ></DriveContents>
  );
}
