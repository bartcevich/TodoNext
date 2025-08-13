// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const authToken = request.cookies.get('authToken')?.value
  // console.log('Middleware auth check:', {
  //   path: request.nextUrl.pathname,
  //   hasToken: !!authToken,
  //   token: authToken
  // })
  
  // Если пользователь не авторизован и пытается получить доступ к защищенным маршрутам
  // if (!authToken && request.nextUrl.pathname.startsWith('/main')) {
  //   console.log('Redirecting to login - no token')
  //   return NextResponse.redirect(new URL('/auth/login', request.url))
  // }
  
  // Если пользователь авторизован и пытается получить доступ к auth-маршрутам
//   if (authToken && request.nextUrl.pathname.startsWith('/auth')) {
//     console.log('Redirecting to dashboard - already authenticated')
//     return NextResponse.redirect(new URL('/main/tasks', request.url))
//   }
  
//   return NextResponse.next()
// }