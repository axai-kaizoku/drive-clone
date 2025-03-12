import { MUTATIONS, QUERIES } from "@/server/db/queries"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await auth()

  if (!session.userId) {
    return redirect("/sign-in")
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId)

  if (!rootFolder) {
    await MUTATIONS.createFolder({
      folder: { name: "root", ownerId: session.userId, parent: null },
    })
  }

  return redirect(`/f/${rootFolder?.id}`)
}
