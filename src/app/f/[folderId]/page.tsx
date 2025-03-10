import DriveContents from "../../_components/drive-contents"
import { QUERIES } from "@/server/db/queries"

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

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
  ])

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
    />
  )
}
