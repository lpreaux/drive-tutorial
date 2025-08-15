"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Folder } from "lucide-react";
import { UploadButton } from "~/utils/uploadthing";
import type { DBFileSelectType } from "~/server/db/schema";
import { deleteFile } from "~/server/actions";
import { useFilteredItems } from "./hooks/useFilteredItems";
import DriveListView from "./drive-list-view";
import DriveGridView from "./drive-grid-view";
import { useTopbar } from "~/components/dashboard/topbar/topbar-provider";
import ViewModeSwitcher from "~/components/dashboard/topbar/view-mode-switcher";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import React from "react";

interface DrivePageContentProps {
  files: DBFileSelectType[];
  parents: DBFileSelectType[];
  currentFolderId: number;
  viewMode: "grid" | "list";
  searchQuery: string;
}

export default function DrivePageContent({
  files,
  parents,
  currentFolderId,
  viewMode,
  searchQuery,
}: DrivePageContentProps) {
  const navigate = useRouter();
  const { setLeftContent, setRightContent } = useTopbar();

  // Configuration de la topbar
  useEffect(() => {
    // Breadcrumb à gauche
    setLeftContent(
      <Breadcrumb>
        <BreadcrumbList>
          {parents.map((parent) =>
            parent.id !== currentFolderId ? (
              <React.Fragment key={parent.id}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={`/drive/${parent.id}`}>
                    {parent.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            ) : (
              <BreadcrumbItem key={parent.id}>
                <BreadcrumbPage>{parent.name}</BreadcrumbPage>
              </BreadcrumbItem>
            ),
          )}
        </BreadcrumbList>
      </Breadcrumb>,
    );

    // Switcher de vue à droite
    setRightContent(<ViewModeSwitcher />);

    // Cleanup au démontage
    return () => {
      setLeftContent(null);
      setRightContent(null);
    };
  }, [parents, currentFolderId, setLeftContent, setRightContent]);

  // Hook personnalisé pour le filtrage mémorisé
  const filteredItems = useFilteredItems(files, searchQuery);

  // Fonction de suppression optimisée
  const handleDeleteFile = useCallback(
    async (fileId: number) => {
      await deleteFile(fileId);
      navigate.refresh();
    },
    [navigate],
  );

  // Fonction pour rafraîchir après upload
  const handleUploadComplete = useCallback(() => {
    navigate.refresh();
  }, [navigate]);

  return (
    <div className="bg-background flex-1 p-6">
      {/* Sélection du composant de vue */}
      {viewMode === "list" ? (
        <DriveListView items={filteredItems} onDeleteFile={handleDeleteFile} />
      ) : (
        <DriveGridView items={filteredItems} onDeleteFile={handleDeleteFile} />
      )}

      {/* État vide */}
      {filteredItems.length === 0 && (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
          <Folder className="mb-4 h-16 w-16" />
          <p className="text-lg font-medium">No items found</p>
          <p className="text-sm">
            Try adjusting your search or upload some files
          </p>
        </div>
      )}

      {/* Upload */}
      <UploadButton
        endpoint="driveUploader"
        onClientUploadComplete={handleUploadComplete}
        input={{ folderId: currentFolderId }}
      />
    </div>
  );
}
