import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routes } from './config/routes'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  if (
    token &&
    (pathname.startsWith(routes.login) || pathname.startsWith(routes.register))
  ) {
    return NextResponse.redirect(new URL(routes.todo, request.url))
  }

  if (!token && pathname.startsWith(routes.todo)) {
    return NextResponse.redirect(new URL(routes.login, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
