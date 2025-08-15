// ~/server/services/example-files.ts
import { UTApi } from "uploadthing/server";
import { type DBFileInsertType } from "~/server/db/schema";

const utapi = new UTApi();

const EXAMPLE_FILES = {
  "Welcome.txt": {
    content: `Welcome to your new Drive!

This is your personal cloud storage space. Here you can:
- Upload and organize your files
- Create folders to keep everything tidy
- Share files with others
- Access your files from anywhere

Get started by uploading your first file!`,
    type: "text/plain",
    folder: "Documents",
  },
  "Getting Started.md": {
    content: `# Getting Started with Your Drive

## Quick Tips:
1. **Upload files**: Drag and drop or click the upload button
2. **Create folders**: Right-click in empty space
3. **Navigate**: Click on folders to open them
4. **Search**: Use the search bar to find files quickly

## Keyboard Shortcuts:
- \`Ctrl+U\`: Upload files
- \`Ctrl+N\`: New folder
- \`Delete\`: Delete selected items

Happy organizing! 🚀`,
    type: "text/markdown",
    folder: "Documents",
  },
};

// Cette fonction prépare les fichiers AVANT la transaction
export async function createExampleFiles(
  userId: string,
  folderIds: Record<string, number>
): Promise<DBFileInsertType[]> {
  const filesToCreate: DBFileInsertType[] = [];

  for (const [fileName, fileData] of Object.entries(EXAMPLE_FILES)) {
    try {
      // Upload vers UploadThing AVANT la transaction
      const blob = new Blob([fileData.content], { type: fileData.type });
      const file = new File([blob], fileName, { type: fileData.type });

      const uploadResult = await utapi.uploadFiles([file]);

      if (uploadResult[0]?.data) {
        const uploadedFile = uploadResult[0].data;

        filesToCreate.push({
          ownerId: userId,
          name: fileName,
          type: "file",
          parentId: folderIds[fileData.folder] ?? folderIds["Documents"],
          size: uploadedFile.size.toString(),
          url: uploadedFile.ufsUrl,
          key: uploadedFile.key,
          modifiedAt: null,
        });
      }
    } catch (error) {
      console.error(`Failed to upload example file ${fileName}:`, error);
      // On peut décider de continuer ou de throw selon les besoins
    }
  }

  return filesToCreate;
}