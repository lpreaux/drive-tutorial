import { QUERIES } from "~/server/db/queries";
import DrivePageContent from "./drive-page-content";

export default async function DrivePage(props: {
  params: Promise<{ folderId: string }>;
  searchParams?: Promise<{
    viewMode?: "list" | "grid";
    search?: string;
  }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID!</div>;
  }

  const [files, parents] = await Promise.all([
    QUERIES.getFolderContent(parsedFolderId),
    QUERIES.getAllParents(parsedFolderId),
  ]);

  const viewMode = searchParams?.viewMode ?? "list";
  const searchQuery = searchParams?.search ?? "";

  return (
    <DrivePageContent
      files={files}
      parents={parents}
      currentFolderId={parsedFolderId}
      viewMode={viewMode}
      searchQuery={searchQuery}
    />
  );
}
