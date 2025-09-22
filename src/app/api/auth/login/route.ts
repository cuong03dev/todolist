import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.json()

  const res = await fetch('http://localhost:5000/user/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return new Response('Login failed', { status: 401 })
  }

  const { accessToken, refreshToken } = await res.json()

  const cookieStore = cookies()
  cookieStore.set('accessToken', accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 5,
  })
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return Response.json({ accessToken })
}
