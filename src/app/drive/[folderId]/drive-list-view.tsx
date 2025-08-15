"use client";

import type { DBFileSelectType } from "~/server/db/schema";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

interface DriveListViewProps {
  items: DBFileSelectType[];
  onDeleteFile: (fileId: number) => Promise<void>;
}

export default function DriveListView({ items, onDeleteFile }: DriveListViewProps) {
  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={items}
        onDeleteFile={onDeleteFile}
      />
    </div>
  );
}