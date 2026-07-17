type Session = {
  user?: {
    id: string
  }
}

export async function requireAuthenticatedCustomer(
  request: Request
) {
  const session = await auth(request)

  if (!session?.user?.id) {
    throw new Error("unauthorized")
  }

  return session.user
}

declare function auth(request: Request): Promise<Session>
