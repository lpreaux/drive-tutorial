import React from "react";
import { QUERIES } from "~/server/db/queries";
import ClientLayout from "./client-layout";

export default async function FolderLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ folderId: string }>;
  }>,
) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID!</div>;
  }

  const parents = await QUERIES.getAllParents(parsedFolderId);

  return (
    <ClientLayout parents={parents} currentFolderId={parsedFolderId}>
      {props.children}
    </ClientLayout>
  );
}
