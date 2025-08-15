import { File, FileText, ImageIcon, Video, Music } from "lucide-react";

export const getFileIcon = (fileName: string) => {
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
