'use server';

<<<<<<< HEAD
import { loginSchema } from '@/app/lib/auth';
import { authAction } from './auth.actions';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
=======
import { authAction } from "./auth.actions"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { loginSchema } from "@/app/lib/Auth"
>>>>>>> 8f082f3 (refactoy: utils 파일 이동)

export interface LoginStatus {
  errors: Record<string, string[]> | null;
  role?: string;
  email?: string;
  password?: string;
}

export const loginAction = async (_: unknown, formData: FormData): Promise<LoginStatus> => {
  // 데이터 검증 (zod)
<<<<<<< HEAD
  const result = await authAction(_, formData, loginSchema);

  // 검증이 실패했을 경우 조기리턴
  if (result.errors) return result;
=======
  const result = await authAction(_, formData, loginSchema)

  // 검증이 실패했을 경우 조기리턴
  if (result.errors) return result
>>>>>>> 8f082f3 (refactoy: utils 파일 이동)

  // 객체 변경 및 로그인지속 여부
  const { email, password, role } = result.data;
  const supabase = await createClient();

<<<<<<< HEAD
=======

>>>>>>> 8f082f3 (refactoy: utils 파일 이동)
  // 아이디 비밀번호 체크
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (authError) {
<<<<<<< HEAD
    return {
      errors: { root: ['이메일, 비밀번호 또는 회원 구분이 올바르지 않습니다'] },
      email: email,
      password: password,
      role: role,
    };
  }

  // 로그인 시 타입확인
  const { data: roleData } = await supabase.from('users').select('role').eq('id', authData.user?.id).single();
=======
    return { 
      errors: { root: ['이메일, 비밀번호 또는 회원 구분이 올바르지 않습니다'] },
      email: email,
      password: password,
      role: role
    }
  }
  
  // 로그인 시 타입확인
  const { data: roleData } = await supabase.from('users').select('role').eq('id', authData.user?.id).single()
>>>>>>> 8f082f3 (refactoy: utils 파일 이동)

  if (roleData?.role !== role) {
    // 타입이 다를시 로그아웃
    await supabase.auth.signOut();

    return {
      errors: { root: ['선택하신 회원 구분이 일치하지 않습니다'] },
      email: email,
      password: password,
      role: role,
    };
  }

<<<<<<< HEAD
  redirect('/');
};
=======
  redirect('/')
}
>>>>>>> 8f082f3 (refactoy: utils 파일 이동)
