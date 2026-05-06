# 🏬  행쇼마켓

next.js 기반으로 구현한 오픈마켓 서비스

---

## 📌 프로젝트 소개

- **프로젝트명**: 행쇼마켓
- **팀명**: 행쇼
- **개발 기간**: 2026.04.16 ~ 2026.05.18
- **소개**:
    
    Next.js와 React를 기반으로, 소상공인의 감성 문구 제품을 한 곳에 모아
    
    소비자가 회원으로서 상품 검색, 장바구니 담기, 구매 및 결제, 회원 정보 관리 등을
    
    이용할 수 있도록 구현한 문구류 중심의 오픈마켓 플랫폼입니다.
    

---

## 🛠 Tech Stack

| 구분 | 도입 기술 | 도입 목적 및 기대효과 |
| --- | --- | --- |
| **Frontend** | Next.js 16, TypeScript | 빠른 렌더링, SEO 최적화 및 안정적인 타입 관리 |
| **Styling & Interactive UI** | Tailwind CSS, Swiper, Three.js | 감각적인 UI 구현 및 부드러운 인터랙션, 3D 상품 뷰 제공 |
| **State & Validation** | Zustand, TanStack Query, Zod | 전역 상태 관리, 서버 상태 캐싱, 폼 및 데이터 검증 |
| **Backend & Infra** | Supabase, Vercel | 안정적인 DB(BaaS) 및 간편한 배포 환경 구축 |

---

## 👥 Team Members

| 이름 | GitHub |
| --- | --- |
| 이동헌 | [LDH9276](https://github.com/LDH9276) |
| 김근영 | [sasasak](https://github.com/sasasak) |
| 박성윤 | [psy0821-k](https://github.com/psy0821-k) |
| 송하늬 | [songha-5](https://github.com/songha-5) |
| 장예지 | [ruiwaa](https://github.com/ruiwaa) |

---

# 🗂️ 폴더 구조

```jsx
📦 src
 ┣ 📂 actions           # Supabase Server Actions (데이터 통신 및 비즈니스 로직)
 ┃ ┣ 📜 auth.actions.ts # 로그인, 회원가입 등 인증 관련 액션
 ┃ ┗ 📜 shop.actions.ts # 상품, 장바구니, 결제 관련 액션
 ┣ 📂 app               # Next.js App Router (페이지 및 라우팅)
 ┃ ┣ 📂 (auth)          # 인증 도메인 (URL에 /auth가 노출되지 않는 라우트 그룹)
 ┃ ┃ ┣ 📂 login               # 로그인 페이지
 ┃ ┃ ┣ 📂 signup              # 회원가입 페이지
 ┃ ┃ ┣ 📂 find-account        # 계정 찾기 페이지
 ┃ ┃ ┗ 📂 reset-password      # 비밀번호 초기화 페이지
 ┃ ┣ 📂 (shop)          # 상거래 도메인
 ┃ ┃ ┣ 📂 products            # 상품 페이지 (목록 및 상세)
 ┃ ┃ ┣ 📂 cart                # 장바구니 페이지
 ┃ ┃ ┗ 📂 checkout            # 결제하기 페이지
 ┃ ┣ 📂 mypage          # 마이페이지
 ┃ ┣ 📜 layout.tsx      # 최상위 공통 레이아웃
 ┃ ┗ 📜 page.tsx        # 메인 페이지 (Home)
 ┣ 📂 components        # 재사용 가능한 UI 컴포넌트
 ┃ ┣ 📂 common          # 버튼, 인풋 등 공통 컴포넌트
 ┃ ┗ 📂 layout          # 헤더, 푸터, 네비게이션 등
 ┣ 📂 lib               # Supabase 클라이언트 설정 및 유틸리티 함수
 ┃ ┗ 📜 supabase.ts     # Supabase 인스턴스 초기화
 ┗ 📂 types             # 전역 TypeScript 타입 정의
   ┣ 📜 database.types.ts # Supabase DB 자동 생성 타입
   ┗ 📜 index.ts          # 공통 사용 타입 (User, Product 등)
```

# 사용 방법 ( 추후 추가 작성 예정 )

```jsx
## 🚀 사용 방법

## 1. 프로젝트 실행

# 저장소 클론
git clone https://github.com/your-repo/final-project-team2.git

# 폴더 이동
cd final-project-team2

# 패키지 설치
bun install

# 개발 서버 실행
bun dev
```

👉 실행 후 브라우저에서 [http://localhost:3000](http://localhost:3000/) 접속
