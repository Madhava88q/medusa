type RequestContext = {
  actor?: {
    id: string
  }
}

export async function loadActor(request: Request) {
  const context = await readRequestContext(request)

  if (!context?.actor?.id) {
    throw new Error("request actor unavailable")
  }

  return context.actor
}

declare function readRequestContext(
  request: Request
): Promise<RequestContext>
