"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Folder, Trash2Icon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import type { DBFileSelectType } from "~/server/db/schema";
import { getFileIcon } from "../utils/file-utils";

export const columns: ColumnDef<DBFileSelectType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-muted"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const file = row.original;
      return (
        <div className="flex items-center gap-3">
          {file.type === "folder" ? (
            <Folder className="h-5 w-5 text-blue-600" />
          ) : (
            getFileIcon(file.name)
          )}
          {file.type === "folder" ? (
            <Link
              href={`/drive/${file.id}`}
              className="font-medium text-foreground hover:text-blue-600 hover:underline"
            >
              {file.name}
            </Link>
          ) : (
            <a
              href={file.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-blue-600 hover:underline"
            >
              {file.name}
            </a>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "modifiedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-muted"
        >
          Modified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("modifiedAt");
      const isValidDate = date instanceof Date;
      return (
        <div className="text-sm text-muted-foreground">
          {isValidDate ? date.toLocaleString() : "—"}
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-muted"
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const file = row.original;
      if (file.type === "folder") {
        return <div className="text-sm text-muted-foreground">—</div>;
      }
      return (
        <Badge variant="secondary" className="text-xs">
          {file.size ?? "—"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      const typeString = typeof type === "string" ? type : "";
      return (
        <Badge
          variant={type === "folder" ? "default" : "secondary"}
        >
          {typeString}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const file = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(file.name)}
            >
              Copy name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                // Cette action sera gérée par le parent
                const event = new CustomEvent('deleteFile', { detail: file.id });
                window.dispatchEvent(event);
              }}
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
