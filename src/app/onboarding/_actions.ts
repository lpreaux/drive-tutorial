"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { MUTATIONS, QUERIES } from "~/server/db/queries";
import { type DBFileInsertType } from "~/server/db/schema";
import { db, type Transaction } from "~/server/db";
import { createExampleFiles } from "~/server/services/example-files";

export const completeOnboarding = async (
  selectedSpaceType: "blank" | "default" | null,
) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "No Logged In User",
    };
  }

  try {
    const result = await db.transaction(async (tx) => {
      const rootFolder: DBFileInsertType = {
        ownerId: userId,
        name: "Root",
        type: "folder",
        parentId: null,
        size: null,
        url: null,
        key: null,
        modifiedAt: null,
      };

      const [rootResult] = await MUTATIONS.createFile(rootFolder, tx);
      const rootId = rootResult!.id;

      let folderIds: Record<string, number> = {};

      if (selectedSpaceType === "default") {
        folderIds = await createDefaultStructure(tx, userId, rootId);
        await createExampleFilesInTransaction(tx, userId, folderIds);
      }

      return { rootId };
    });

    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        rootFolderId: result.rootId,
      },
    });

    return {
      success: true,
      redirectTo: `/f/${result.rootId}`,
      message: "Your drive is ready!",
    };
  } catch (err) {
    return {
      success: false,
      error: "There was an error setting up your drive.",
      trace: err,
    };
  }
};

async function createDefaultStructure(
  tx: Transaction,
  userId: string,
  rootId: number,
): Promise<Record<string, number>> {
  const defaultFolders: DBFileInsertType[] = [
    {
      ownerId: userId,
      name: "Documents",
      type: "folder",
      parentId: rootId,
      size: null,
      url: null,
      key: null,
      modifiedAt: null,
    },
    {
      ownerId: userId,
      name: "Pictures",
      type: "folder",
      parentId: rootId,
      size: null,
      url: null,
      key: null,
      modifiedAt: null,
    },
    {
      ownerId: userId,
      name: "Videos",
      type: "folder",
      parentId: rootId,
      size: null,
      url: null,
      key: null,
      modifiedAt: null,
    },
    {
      ownerId: userId,
      name: "Archived",
      type: "folder",
      parentId: rootId,
      size: null,
      url: null,
      key: null,
      modifiedAt: null,
    },
  ];

  await MUTATIONS.createFile(defaultFolders, tx);

  const createdFolders = await QUERIES.getFoldersByParentAndOwner(
    rootId,
    userId,
    tx,
  );

  const folderIds: Record<string, number> = {};
  createdFolders.forEach((folder) => {
    folderIds[folder.name] = folder.id;
  });

  return folderIds;
}

async function createExampleFilesInTransaction(
  tx: Transaction,
  userId: string,
  folderIds: Record<string, number>,
) {
  // Préparer les fichiers d'exemple avec leur contenu
  const exampleFiles = await createExampleFiles(userId, folderIds);

  // Insérer tous les fichiers en une seule fois dans la transaction
  if (exampleFiles.length > 0) {
    await MUTATIONS.createFile(exampleFiles, tx);
  }
}
