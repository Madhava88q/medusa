import { z } from "zod"

type Session = {
  user?: {
    id: string
  }
}

declare function getServerSession(request: Request): Promise<Session>

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
        ownerId: string
      }
      data: {
        title: string
      }
    }): Promise<DocumentRecord>
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(request)

  if (!session?.user?.id) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  const input = inputSchema.parse(await request.json())

  const document = await prisma.document.update({
    where: {
      id: input.documentId,
      ownerId: session.user.id,
    },
    data: {
      title: input.title,
    },
  })

  return Response.json({
    document,
  })
}
