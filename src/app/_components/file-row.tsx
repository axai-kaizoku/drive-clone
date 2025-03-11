"use client"
import { Button } from "@/components/ui/button"
import { deleteFile } from "@/server/actions"
import { DB_FileType, DB_FolderType } from "@/server/db/schema"
import { FolderIcon, FileIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"

export const FileRow = ({ file }: { file: DB_FileType }) => {
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400 truncate"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </Link>
        </div>
        <div className="col-span-2 text-gray-400">{file.fileType ?? ""}</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
        <div className="col-span-1 text-gray-400">
          <Button
            variant="ghost"
            onClick={() => deleteFile(file.id)}
            aria-label="Delete File"
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </li>
  )
}

export const FolderRow = ({ folder }: { folder: DB_FolderType }) => {
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  )
}
