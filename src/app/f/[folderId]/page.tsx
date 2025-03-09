import { db } from "@/server/db"
import DriveContents from "../../_components/drive-contents"
import {
  files as filesSchema,
  folders as foldersSchema,
} from "@/server/db/schema"
import { eq } from "drizzle-orm"

async function getAllParents(folderId: number) {
  const parents = []
  let currentId: number | null = folderId
  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId))

    if (!folder[0]) {
      throw new Error("Parent folder not found")
    }

    parents.unshift(folder[0])
    currentId = folder[0]?.parent
  }
  return parents
}

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

  const foldersPromise = db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId))

  const filesPromise = db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId))

  const parentsPromise = getAllParents(parsedFolderId)

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise,
  ])

  return <DriveContents files={files} folders={folders} parents={parents} />
}
