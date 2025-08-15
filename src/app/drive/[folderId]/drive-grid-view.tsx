"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Folder, MoreHorizontal, Trash2Icon } from "lucide-react";
import type { DBFileSelectType } from "~/server/db/schema";
import Link from "next/link";
import { getFileIcon } from "./utils/file-utils";

interface DriveGridViewProps {
  items: DBFileSelectType[];
  onDeleteFile?: (fileId: number) => Promise<void>;
}

export default function DriveGridView({ items, onDeleteFile }: DriveGridViewProps) {
  const handleDeleteFile = (fileId: number) => {
    if (onDeleteFile) {
      void onDeleteFile(fileId);
    } else {
      // Fallback vers l'événement custom pour compatibilité
      const event = new CustomEvent('deleteFile', { detail: fileId });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group relative h-32 border border-border bg-card text-card-foreground p-0 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-accent/5"
        >
          <CardContent className="p-4 h-full flex flex-col items-center justify-center gap-2">
            {/* Menu d'actions (visible au hover) */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border border-border/50"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(item.name)}
                  >
                    Copy name
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Rename
                  </DropdownMenuItem>
                  {item.type === "file" && (
                    <DropdownMenuItem>
                      Download
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDeleteFile(item.id)}
                  >
                    <Trash2Icon className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Icône */}
            <div className="flex-shrink-0">
              {item.type === "folder" ? (
                <Folder className="h-10 w-10 text-primary" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center">
                  {getFileIcon(item.name)}
                </div>
              )}
            </div>

            {/* Nom du fichier/dossier */}
            <div className="flex-1 w-full text-center">
              {item.type === "folder" ? (
                <Link
                  href={`/drive/${item.id}`}
                  className="text-sm font-medium text-foreground hover:text-primary hover:underline line-clamp-2 leading-tight"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  href={item.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground hover:text-primary hover:underline line-clamp-2 leading-tight"
                >
                  {item.name}
                </a>
              )}
            </div>

            {/* Badge de taille pour les fichiers */}
            {item.type === "file" && item.size && (
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-muted text-muted-foreground"
              >
                {item.size}
              </Badge>
            )}

            {/* Badge de type */}
            <Badge
              variant={item.type === "folder" ? "default" : "secondary"}
              className="absolute bottom-2 left-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {item.type}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}