import { API_ROUTES } from '@/config/apiRoutes'
import { ErrorResponse } from '@/types/error.types'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/'

  try {
    const res = await fetch(`${baseUrl}${API_ROUTES.AUTH.LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      let message = 'Login failed'
      try {
        const errorData = await res.json()
        message = errorData.message || message
      } catch {
        message = `Login failed (${res.status}: ${res.statusText})`
      }
      throw { status: res.status, message }
    }

    const { accessToken, refreshToken } = await res.json()

    const response = NextResponse.json({ success: true })

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
  } catch (err) {
    const error = err as ErrorResponse
    const status = error?.status || 500
    const message = error?.message || 'Network error. Please try again later.'

    return NextResponse.json({ message, error: true }, { status })
  }
}
