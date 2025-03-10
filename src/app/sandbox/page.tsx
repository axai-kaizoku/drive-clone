import { mockFiles, mockFolders } from "@/lib/mock-data"
import { db } from "@/server/db"
import { files_table, folders_table } from "@/server/db/schema"

export default function Page() {
  return (
    <div className="flex flex-col gap-4 bg-neutral-800 text-neutral-100">
      Seed Function
      <form
        action={async () => {
          "use server"

          console.log("heyy biro")

          const folderInsert = await db.insert(folders_table).values(
            mockFolders.map((folder, idx) => ({
              id: idx + 1,
              name: folder.name,
              parent: idx !== 0 ? 1 : null,
            }))
          )
          console.log({ folderInsert })

          const fileInsert = await db.insert(files_table).values(
            mockFiles.map((file, idx) => ({
              id: idx + 1,
              name: file.name,
              size: 5000,
              url: file.url,
              parent: idx % 3,
            }))
          )

          console.log({ fileInsert })
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  )
}
