type Session = {
  user?: {
    id: string
  }
}

export async function requireAuthenticatedCustomer(
  request: Request
) {
  const session = await getServerSession(request)

  if (!session?.user?.id) {
    throw new Error("unauthorized")
  }

  return session.user
}

declare function getServerSession(
  request: Request
): Promise<Session>
