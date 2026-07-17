import { z } from "zod"

import {
  requireAuthenticatedCustomer,
} from "./auth"

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
  const customer = await requireAuthenticatedCustomer(request)
  const input = inputSchema.parse(await request.json())

  const document = await prisma.document.update({
    where: {
      id: input.documentId,
      ownerId: customer.id,
    },
    data: {
      title: input.title,
    },
  })

  return Response.json({
    document,
  })
}
