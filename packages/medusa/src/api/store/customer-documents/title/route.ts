import { z } from "zod"

import { loadActor as resolveActor } from "./principal"

const inputSchema = z.object({
  documentId: z.string().min(1),
  title: z.string().min(1).max(200),
})

type DocumentRecord = {
  id: string
  title: string
  ownerId: string
}

declare const prisma: {
  document: {
    update(input: {
      where: {
        id: string
      }
      data: {
        title: string
      }
    }): Promise<DocumentRecord>
  }
}

export async function POST(request: Request) {
  const input = inputSchema.parse(await request.json())

  await resolveActor(request)

  const document = await prisma.document.update({
    where: {
      id: input.documentId,
    },
    data: {
      title: input.title,
    },
  })

  return Response.json({
    document,
  })
}