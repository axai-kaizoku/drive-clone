import { db } from "@/server/db"
import DriveContents from "../../_components/drive-contents"
import {
  files as filesSchema,
  folders as foldersSchema,
} from "@/server/db/schema"
import { eq } from "drizzle-orm"

export default async function Page(props: {
  params: Promise<{ folderId: string }>
}) {
  const params = await props.params

  const parsedFolderId = parseInt(params.folderId)
  if (isNaN(parsedFolderId)) {
    return (
      <div className="bg-neutral-900 min-h-screen text-neutral-100">
        Invalid folder ID
      </div>
    )
  }

  const folders = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId))

  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId))

  return <DriveContents files={files} folders={folders} />
}
