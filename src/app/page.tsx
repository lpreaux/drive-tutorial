"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import {
  Folder,
  File,
  Upload,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  Home,
  ChevronRight,
  FileText,
  ImageIcon,
  Video,
  Music,
} from "lucide-react"
import { mockData } from "~/lib/mock-data"

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()
  switch (extension) {
    case "pdf":
    case "doc":
    case "docx":
    case "txt":
      return <FileText className="h-5 w-5 text-blue-600" />
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImageIcon className="h-5 w-5 text-green-600" />
    case "mp4":
    case "avi":
    case "mov":
      return <Video className="h-5 w-5 text-purple-600" />
    case "mp3":
    case "wav":
    case "flac":
      return <Music className="h-5 w-5 text-orange-600" />
    default:
      return <File className="h-5 w-5 text-gray-600" />
  }
}

export default function GoogleDriveClone() {
  const [currentFolderId, setCurrentFolderId] = useState("root")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")

  const getCurrentFolderItems = () => {
    return mockData.filter((item) => item.parent === currentFolderId)
  }

  const getFolderById = (id: string) => {
    return mockData.find((item) => item.id === id && item.type === "folder")
  }

  const getBreadcrumbs = () => {
    const breadcrumbs: { id: string; name: string }[] = []
    let currentId = currentFolderId

    while (currentId !== null) {
      const folder = getFolderById(currentId)
      if (folder) {
        breadcrumbs.unshift({ id: folder.id, name: folder.name === "/" ? "My Drive" : folder.name })
        currentId = folder.parent
      } else {
        break
      }
    }

    return breadcrumbs
  }

  const currentItems = getCurrentFolderItems()
  const filteredItems = currentItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const breadcrumbs = getBreadcrumbs()

  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId)
  }

  const handleBreadcrumbClick = (folderId: string) => {
    setCurrentFolderId(folderId)
  }

  const handleUpload = () => {
    alert("Upload functionality would be implemented here!")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-white">Drive</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search in Drive"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-96 pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleUpload} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="border-gray-600 hover:bg-gray-700"
            >
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-700 bg-gray-800 p-4">
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-white hover:bg-gray-700"
              onClick={() => setCurrentFolderId("root")}
            >
              <Home className="h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:bg-gray-700">
              <Upload className="h-4 w-4" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:bg-gray-700">
              <File className="h-4 w-4" />
              Shared with me
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-1 text-sm text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center gap-1">
                <button onClick={() => handleBreadcrumbClick(crumb.id)} className="hover:text-blue-400 hover:underline">
                  {crumb.name}
                </button>
                {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
              </div>
            ))}
          </div>

          {/* File Grid/List */}
          {viewMode === "list" ? (
            <div className="space-y-1">
              <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-400">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Modified</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2"></div>
              </div>
              {filteredItems.map((item) => (
                <Card key={item.id} className="p-0 bg-gray-800 border-gray-700">
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-700">
                    <div className="col-span-6 flex items-center gap-3">
                      {item.type === "folder" ? <Folder className="h-5 w-5 text-blue-400" /> : getFileIcon(item.name)}
                      {item.type === "folder" ? (
                        <button
                          onClick={() => handleFolderClick(item.id)}
                          className="font-medium text-white hover:text-blue-400 hover:underline"
                        >
                          {item.name}
                        </button>
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
                    <div className="col-span-2 flex items-center text-sm text-gray-400">{item.modified}</div>
                    <div className="col-span-2 flex items-center text-sm text-gray-400">
                      {item.type === "file" ? (item as any).size : "—"}
                    </div>
                    <div className="col-span-2 flex items-center justify-end">
                      <Button variant="ghost" size="icon" className="hover:bg-gray-600">
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
                <Card key={item.id} className="p-4 hover:shadow-md transition-shadow bg-gray-800 border-gray-700">
                  <div className="flex flex-col items-center gap-2">
                    {item.type === "folder" ? (
                      <Folder className="h-12 w-12 text-blue-400" />
                    ) : (
                      <div className="h-12 w-12 flex items-center justify-center">{getFileIcon(item.name)}</div>
                    )}
                    {item.type === "folder" ? (
                      <button
                        onClick={() => handleFolderClick(item.id)}
                        className="text-sm font-medium text-center text-white hover:text-blue-400 hover:underline"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <a
                        href={(item as any).url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-center text-white hover:text-blue-400 hover:underline"
                      >
                        {item.name}
                      </a>
                    )}
                    {item.type === "file" && (item as any).size && (
                      <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
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
              <Folder className="h-16 w-16 mb-4" />
              <p className="text-lg font-medium">No items found</p>
              <p className="text-sm">Try adjusting your search or upload some files</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
