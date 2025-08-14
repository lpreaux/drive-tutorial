import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  File,
  Upload,
  Search,
  Grid3X3,
  List,
  Home,
} from "lucide-react"
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import {files as filesSchema} from "~/server/db/schema";


export default async function GoogleDriveClone() {
  // const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  // const [searchQuery, setSearchQuery] = useState("")
  const files = await db.select().from(filesSchema);

  const handleUpload = () => {
    alert("Upload functionality would be implemented here!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-white">Drive</h1>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search in Drive"
                disabled
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="w-96 border-gray-600 bg-gray-700 pl-10 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              disabled
              // onClick={handleUpload}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled
              // onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="border-gray-600 hover:bg-gray-700"
            >
              {/*{viewMode === "grid" ? (*/}
              {/*  <List className="h-4 w-4" />*/}
              {/*) : (*/}
                <Grid3X3 className="h-4 w-4" />
              {/*)}*/}
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
              disabled
              className="w-full justify-start gap-2 text-white hover:bg-gray-700"
              // onClick={() => setCurrentFolderId("root")}
            >
              <Home className="h-4 w-4" />
              My Drive
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-white hover:bg-gray-700"
            >
              <Upload className="h-4 w-4" />
              Recent
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-white hover:bg-gray-700"
            >
              <File className="h-4 w-4" />
              Shared with me
            </Button>
          </nav>
        </aside>

        <DriveContents
          files={files}
          viewMode={"list"}
          searchQuery={""}
        ></DriveContents>
      </div>
    </div>
  );
}
