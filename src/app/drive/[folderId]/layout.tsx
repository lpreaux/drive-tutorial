import React from "react";

export default async function DriveLayout(
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

  return <>{props.children}</>;
}
