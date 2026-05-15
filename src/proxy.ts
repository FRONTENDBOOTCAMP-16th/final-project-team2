import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseConfig } from '@/utils/supabase/config'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(supabaseConfig.url, supabaseConfig.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value),
        )
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // 중요: 이 함수를 호출해야 세션이 만료되었을 때 자동으로 갱신됩니다.
  // 세션 갱신과 동시에 유저 정보를 가져옵니다.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // 로그인을 해야만 들어갈 수 있는 경로 보호 (마이페이지, 장바구니)
  // 올바르지 않은 로그인 접근 시 로그인페이지로 이동 시키기 전 로그인 모달창 경로로 먼저 이동시킴
  const isProtectedArea = path.startsWith('/mypage') || path.startsWith('/cart')
  if (isProtectedArea && !user) {
    const url = new URL('/auth-guard', request.url)
    url.searchParams.set('type', 'login_required')
    url.searchParams.set('next', path)
    return NextResponse.redirect(url)
  }

  // 회원일 경우 역할(소비자/판매자)에 따라서 서버가 사용자에게 맞는 마이페이지를 보여주도록 함
  if (user) {
    const role = user.user_metadata?.role

    if (path.startsWith('/mypage/consumer') && role === 'BUSINESS') {
      return NextResponse.redirect(new URL('/mypage/seller', request.url))
    }

    if (path.startsWith('/mypage/seller') && role === 'USER') {
      return NextResponse.redirect(new URL('/mypage/consumer', request.url))
    }

    if (path === '/products') {
      return NextResponse.redirect(new URL('/products/write', request.url))
    }
  }
  return supabaseResponse
}

export const config = {
  matcher: [
    '/mypage/:path*',
    '/cart/:path*',
    '/login',
    // 아래 경로를 제외한 모든 경로에서 미들웨어 실행
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
