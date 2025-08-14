export type ActualFile = {
  id: string;
  name: string;
  parent: string;
  type: "file";
  size: string;
  modified?: string;
  url: string;
};

export type Folder = {
  id: string;
  name: string;
  parent: string | null;
  type: "folder";
  modified?: string;
};

export type File = ActualFile | Folder;

export const mockData: File[] = [
  { id: "root", type: "folder", name: "/", parent: null },
  {
    id: "1",
    name: "Documents",
    type: "folder",
    parent: "root",
    modified: "2024-01-15",
  },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    parent: "root",
    modified: "2024-01-10",
  },
  {
    id: "3",
    name: "Projects",
    type: "folder",
    parent: "root",
    modified: "2024-01-20",
  },
  {
    id: "4",
    name: "Resume.pdf",
    type: "file",
    size: "2.4 MB",
    modified: "2024-01-18",
    parent: "root",
    url: "/pdf-document.png",
  },
  {
    id: "5",
    name: "Vacation.jpg",
    type: "file",
    size: "5.2 MB",
    parent: "root",
    modified: "2024-01-12",
    url: "/tropical-beach-family.png",
  },
  {
    id: "6",
    name: "Presentation.pptx",
    type: "file",
    size: "12.8 MB",
    parent: "root",
    modified: "2024-01-16",
    url: "/presentation-slides.png",
  },
  {
    id: "7",
    name: "Work",
    type: "folder",
    parent: "1",
    modified: "2024-01-14",
  },
  {
    id: "8",
    name: "Personal",
    type: "folder",
    parent: "1",
    modified: "2024-01-13",
  },
  {
    id: "9",
    name: "Report.docx",
    type: "file",
    size: "1.2 MB",
    parent: "1",
    modified: "2024-01-15",
    url: "/word-document.png",
  },
  {
    id: "10",
    name: "Notes.txt",
    type: "file",
    size: "45 KB",
    parent: "1",
    modified: "2024-01-14",
    url: "/text-file.png",
  },
  {
    id: "11",
    name: "Summer 2024",
    type: "folder",
    parent: "2",
    modified: "2024-01-08",
  },
  {
    id: "12",
    name: "Family",
    type: "folder",
    parent: "2",
    modified: "2024-01-05",
  },
  {
    id: "13",
    name: "sunset.jpg",
    type: "file",
    size: "3.8 MB",
    parent: "2",
    modified: "2024-01-10",
    url: "/vibrant-sunset-landscape.png",
  },
  {
    id: "14",
    name: "portrait.png",
    type: "file",
    size: "2.1 MB",
    parent: "2",
    modified: "2024-01-09",
    url: "/classic-portrait.png",
  },
  {
    id: "15",
    name: "Website Redesign",
    type: "folder",
    parent: "3",
    modified: "2024-01-20",
  },
  {
    id: "16",
    name: "Mobile App",
    type: "folder",
    parent: "3",
    modified: "2024-01-18",
  },
  {
    id: "17",
    name: "proposal.pdf",
    type: "file",
    size: "890 KB",
    parent: "3",
    modified: "2024-01-19",
    url: "/business-proposal.png",
  },
];
