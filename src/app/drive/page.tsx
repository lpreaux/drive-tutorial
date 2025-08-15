import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DrivePage() {
  const user = await currentUser();
  redirect(`/drive/${user!.publicMetadata.rootFolderId as string}`);
}
