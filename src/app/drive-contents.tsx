"use client";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Folder,
  File,
  MoreVertical,
  ChevronRight,
  FileText,
  ImageIcon,
  Video,
  Music,
} from "lucide-react";
import type { DBFileSelectType } from "~/server/db/schema";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
    case "doc":
    case "docx":
    case "txt":
      return <FileText className="h-5 w-5 text-blue-600" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImageIcon className="h-5 w-5 text-green-600" />;
    case "mp4":
    case "avi":
    case "mov":
      return <Video className="h-5 w-5 text-purple-600" />;
    case "mp3":
    case "wav":
    case "flac":
      return <Music className="h-5 w-5 text-orange-600" />;
    default:
      return <File className="h-5 w-5 text-gray-600" />;
  }
};

export default function DriveContents(props: {
  currentFolderId: number;
  files: DBFileSelectType[];
  parents: DBFileSelectType[];
  viewMode: "grid" | "list";
  searchQuery: string;
}) {
  const navigate = useRouter();

  const currentItems = props.files;
  const filteredItems = currentItems.filter((item) =>
    item.name.toLowerCase().includes(props.searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-gray-900">
      <header className="flex items-center justify-end gap-4 p-6">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="text-ceramic-white h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium sm:h-12 sm:px-5 sm:text-base">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main className="flex-1 p-6">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-1 text-sm text-gray-400">
          {props.parents.map((crumb, index) => (
            <div key={crumb.id} className="flex items-center gap-1">
              <Link
                href={`/f/${crumb.id}`}
                className="hover:text-blue-400 hover:underline"
              >
                {crumb.name}
              </Link>
              {index < props.parents.length - 1 && (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          ))}
        </div>

        {/* File Grid/List */}
        {props.viewMode === "list" ? (
          <div className="space-y-1">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2"></div>
            </div>
            {props.files.map((item) => (
              <Card key={item.id} className="border-gray-700 bg-gray-800 p-0">
                <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-700">
                  <div className="col-span-6 flex items-center gap-3">
                    {item.type === "folder" ? (
                      <Folder className="h-5 w-5 text-blue-400" />
                    ) : (
                      getFileIcon(item.name)
                    )}
                    {item.type === "folder" ? (
                      <Link
                        href={`/f/${item.id}`}
                        className="font-medium text-white hover:text-blue-400 hover:underline"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={(item as any).url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-white hover:text-blue-400 hover:underline"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center text-sm text-gray-400">
                    {item.modified}
                  </div>
                  <div className="col-span-2 flex items-center text-sm text-gray-400">
                    {item.type === "file" ? (item as any).size : "—"}
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-600"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredItems.map((item) => (
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
                    <button
                      onClick={() => handleFolderClick(item.id)}
                      className="text-center text-sm font-medium text-white hover:text-blue-400 hover:underline"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={(item as any).url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-sm font-medium text-white hover:text-blue-400 hover:underline"
                    >
                      {item.name}
                    </a>
                  )}
                  {item.type === "file" && (item as any).size && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-700 text-xs text-gray-300"
                    >
                      {(item as any).size}
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Folder className="mb-4 h-16 w-16" />
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm">
              Try adjusting your search or upload some files
            </p>
          </div>
        )}

        <UploadButton
          endpoint="driveUploader"
          onClientUploadComplete={() => {
            navigate.refresh();
          }}
          input={{folderId: props.currentFolderId}}
        />
      </main>
    </div>
  );
}
