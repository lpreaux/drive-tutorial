export type ActualFile = {
  id: number;
  name: string;
  parentId: number;
  type: "file";
  size: string;
  modified?: string;
  url: string;
};

export type Folder = {
  id: number;
  name: string;
  parentId: number | null;
  type: "folder";
  modified?: string;
};

export type File = ActualFile | Folder;

export const mockData: File[] = [
  { id: 1, type: "folder", name: "/", parentId: null },
  {
    id: 2,
    name: "Documents",
    type: "folder",
    parentId: 1,
    modified: "2024-01-15",
  },
  {
    id: 3,
    name: "Photos",
    type: "folder",
    parentId: 1,
    modified: "2024-01-10",
  },
  {
    id: 4,
    name: "Projects",
    type: "folder",
    parentId: 1,
    modified: "2024-01-20",
  },
  {
    id: 5,
    name: "Resume.pdf",
    type: "file",
    size: "2.4 MB",
    modified: "2024-01-18",
    parentId: 1,
    url: "/pdf-document.png",
  },
  {
    id: 6,
    name: "Vacation.jpg",
    type: "file",
    size: "5.2 MB",
    parentId: 1,
    modified: "2024-01-12",
    url: "/tropical-beach-family.png",
  },
  {
    id: 7,
    name: "Presentation.pptx",
    type: "file",
    size: "12.8 MB",
    parentId: 1,
    modified: "2024-01-16",
    url: "/presentation-slides.png",
  },
  {
    id: 8,
    name: "Work",
    type: "folder",
    parentId: 2,
    modified: "2024-01-14",
  },
  {
    id: 9,
    name: "Personal",
    type: "folder",
    parentId: 2,
    modified: "2024-01-13",
  },
  {
    id: 10,
    name: "Report.docx",
    type: "file",
    size: "1.2 MB",
    parentId: 2,
    modified: "2024-01-15",
    url: "/word-document.png",
  },
  {
    id: 11,
    name: "Notes.txt",
    type: "file",
    size: "45 KB",
    parentId: 2,
    modified: "2024-01-14",
    url: "/text-file.png",
  },
  {
    id: 12,
    name: "Summer 2024",
    type: "folder",
    parentId: 3,
    modified: "2024-01-08",
  },
  {
    id: 13,
    name: "Family",
    type: "folder",
    parentId: 3,
    modified: "2024-01-05",
  },
  {
    id: 14,
    name: "sunset.jpg",
    type: "file",
    size: "3.8 MB",
    parentId: 3,
    modified: "2024-01-10",
    url: "/vibrant-sunset-landscape.png",
  },
  {
    id: 15,
    name: "portrait.png",
    type: "file",
    size: "2.1 MB",
    parentId: 3,
    modified: "2024-01-09",
    url: "/classic-portrait.png",
  },
  {
    id: 16,
    name: "Website Redesign",
    type: "folder",
    parentId: 4,
    modified: "2024-01-20",
  },
  {
    id: 17,
    name: "Mobile App",
    type: "folder",
    parentId: 4,
    modified: "2024-01-18",
  },
  {
    id: 18,
    name: "proposal.pdf",
    type: "file",
    size: "890 KB",
    parentId: 4,
    modified: "2024-01-19",
    url: "/business-proposal.png",
  },
];
