"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Folder } from "lucide-react";
import type { DBFileSelectType } from "~/server/db/schema";
import Link from "next/link";
import { getFileIcon } from "./utils/file-utils";

interface DriveGridViewProps {
  items: DBFileSelectType[];
}

export default function DriveGridView({ items }: DriveGridViewProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="border-gray-700 bg-gray-800 p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex flex-col items-center gap-2">
            {item.type === "folder" ? (
              <Folder className="h-12 w-12 text-blue-400" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center">
                {getFileIcon(item.name)}
              </div>
            )}
            {item.type === "folder" ? (
              <Link
                href={`/drive/${item.id}`}
                className="text-center text-sm font-medium text-white hover:text-blue-400 hover:underline"
              >
                {item.name}
              </Link>
            ) : (
              <a
                href={item.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-sm font-medium text-white hover:text-blue-400 hover:underline"
              >
                {item.name}
              </a>
            )}
            {item.type === "file" && item.size && (
              <Badge
                variant="secondary"
                className="bg-gray-700 text-xs text-gray-300"
              >
                {item.size}
              </Badge>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}