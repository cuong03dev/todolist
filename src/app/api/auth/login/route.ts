import { API_ROUTES } from '@/config/apiRoutes'
import { NextResponse } from 'next/server'
import { httpServer } from '@/lib/axios'

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const { data } = await httpServer.post(API_ROUTES.AUTH.LOGIN, body)
    
    const { accessToken, refreshToken } = data

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
  } catch (err: unknown) {
    let status = 500
    let message = 'Network error. Please try again later.'

    if (err && typeof err === 'object' && 'status' in err && 'message' in err) {
      status = (err as { status: number }).status
      message = (err as { message: string }).message
    }


    return NextResponse.json({ message, error: true }, { status })
  }
}
