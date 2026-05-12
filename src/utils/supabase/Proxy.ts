import { type NextRequest } from 'next/server'
import { updateSession } from './middleware'

export async function proxy(request: NextRequest) {
  // 1. 세션 업데이트 및 사용자 정보 획득
  const { user, supabaseResponse } = await updateSession(request)

  // 2. 보호된 경로 및 인증 관련 경로 정의
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/mypage')
  const isAuthPage =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')

  // [Case 1] 로그인하지 않은 사용자가 보호된 경로에 접근 시
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return Response.redirect(url)
  }

  // [Case 2] 이미 로그인한 사용자가 인증 페이지 접근 시
  if (isAuthPage && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return Response.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  // 정적 파일, 이미지, 파비콘 등을 제외한 모든 경로에서 미들웨어 실행
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

/**
 * [해설]
 * - updateSession: 모든 요청마다 사용자의 인증 세션을 체크하고 쿠키를 갱신합니다.
 * - matcher: 프록시가 실행될 경로를 지정합니다. 정적 파일(이미지 등)은 제외하여 성능을 최적화합니다.
 * - Response.redirect: 조건에 맞지 않는 접근을 즉시 차단하고 안전한 페이지로 보냅니다.
 */
