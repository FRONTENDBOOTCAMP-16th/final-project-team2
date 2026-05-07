import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { supabaseConfig } from './config';

export async function updateSession(request: NextRequest) {
  // 1. 초기 응답 객체 생성
  let supabaseResponse = NextResponse.next({ request });

  // 2. 서버 클라이언트 생성
  const supabase = createServerClient(supabaseConfig.url, supabaseConfig.key, {
    cookies: {
      // 브라우저에서 보낸 모든 쿠키를 읽어옴
      getAll() {
        return request.cookies.getAll();
      },
      // 인증 토큰 갱신 시 쿠키를 브라우저와 서버 응답 양쪽에 설정
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 클라이언트 객체, 사용자 정보, 갱신된 응답 객체를 반환
  return { supabase, user, supabaseResponse };
}
