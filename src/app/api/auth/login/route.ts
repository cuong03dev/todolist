import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  const body = await req.json()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/'
  const res = await fetch(`${baseUrl}user/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    try {
      const errorData = await res.json()

      return Response.json(
        {
          message: errorData.message || 'Login failed',
          error: true,
        },
        { status: res.status },
      )
    } catch (_) {
      return Response.json(
        {
          message: `Login failed (${res.status}: ${res.statusText})`,
          error: true,
        },
        { status: res.status },
      )
    }
  }

  const { accessToken, refreshToken } = await res.json()
  const response = NextResponse.json({ accessToken })
  response.cookies.set('accessToken', accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 5 * 60,
  })
  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
