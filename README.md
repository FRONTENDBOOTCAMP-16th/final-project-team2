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

| 구분                         | 도입 기술                      | 도입 목적 및 기대효과                                  |
| ---------------------------- | ------------------------------ | ------------------------------------------------------ |
| **코어기술**                 | Next.js 16, TypeScript, tailwind css  | 빠른 렌더링, SEO 최적화 및 안정적인 타입 관리, 네이밍컨벤션 적용 및 다크모드 대응         |
| **상태관리** | zustand, tanstack query, Next-themes  | 전역 상태 관리를 위한 라이브러리, 마이페이지 데이터 상태 관리, Next-themes를 통한 Hydration 문제 해결 |
| **UI & 라이브러리**       | swiper, react-quill, react-daum-postcode, lucide-react   | swiper로 개발 효율 및 유지보수성, WYSIWYG에디터/XSS보안, API키 발급 및 서버구축 불필요, 유연한 커스터마이징  |
| **유효성 검사 & 보안**          | zod, sanitize    |  유효성 검사를 스키마 하나로 통합, XSS 보안방어 및 데이터 소독         |
| **백엔드 & 배포**          | supabase, vercel    |  서버 구축 최소화 및 개발 효율 증대, 무설정 배포 및 next.js 완벽 호환         |
| **개발 환경**          |  bun, eslint&prettier    |  자체 런타임 환경을 통해 더 빠른 패키지 설치와 실행, 코드 품질 및 컨벤션 통일         |

---

## 👥 Team Members

| 이름   | GitHub                                    |
| ------ | ----------------------------------------- |
| 이동헌 | [LDH9276](https://github.com/LDH9276)     |
| 김근영 | [sasasak](https://github.com/sasasak)     |
| 박성윤 | [psy0821-k](https://github.com/psy0821-k) |
| 송하늬 | [songha-5](https://github.com/songha-5)   |
| 장예지 | [ruiwaa](https://github.com/ruiwaa)       |

---

# 🗂️ 폴더 구조

```jsx
src/
├── actions/                # 서버 액션 (인증, 장바구니, 결제 등)
│   ├── auth.actions.ts
│   ├── cartAction.ts
│   ├── loginAction.ts
│   ├── signupAction.ts
│   └── ...
├── api/                    # API 페칭 함수 (카테고리, 상품 리스트 등)
│   ├── categoriesList.ts
│   ├── getProductAll.ts
│   └── products.ts
├── app/                    # Next.js App Router (페이지 및 레이아웃)
│   ├── (auth)/             # 인증 관련 그룹 (로그인, 회원가입, 아이디 찾기 등)
│   │   ├── find-id/
│   │   ├── login/
│   │   ├── reset-password/
│   │   └── signup/
│   ├── (board)/            # 게시판 관련 그룹 (공지사항, QnA)
│   │   ├── inquire/        # 문의하기
│   │   └── notice/         # 공지사항
│   ├── (shop)/             # 쇼핑 관련 그룹
│   │   ├── cart/           # 장바구니
│   │   ├── checkout/       # 
│   │   └── payment/        # 결제
│   ├── auth-guard/         # 로그인 가드 (접근 권한이 필요할 시 작동)
│   ├── components/         # 재사용 가능한 코드 모음
│   │   ├── board/          # 게시판 컴포넌트
│   │   ├── main/           # 메인 화면 컴포넌트
│   │   └── provider/       # 다크모드/라이트모드 컴포넌트
│   ├── lib/                # Type 모음
│   ├── mypage/             # 마이페이지 (사용자/판매자)
│   │   ├── actions/        # 마이페이지 전용 서버 액션
│   │   ├── api/            # 데이터 패칭
│   │   ├── components/     # 마이페이지 공용 UI 컴포넌트
│   │   ├── consumer/       # 마이페이지 고객용 UI (쿠폰, 주문내역조회, 프로필, 찜하기)
│   │   ├── context/        # 마이페이지 컨텍스트 (사용자 타입에 따른 분기)
│   │   ├── providers/      # 마이페이지 프로바이더
│   │   ├── seller/         # 마이페이지 셀러용 UI (상점 관리, 배송)
│   │   └── types/          # 마이페이지 타입 (zod, type)
│   ├── search/             # 상품 검색 페이
│   ├── favicon.ico         # 파비콘
│   ├── globals.css         # 글로벌 스타일
│   ├── layout.tsx          # 루트 레이아웃
│   ├── not-found.tsx       # not-found 페이지
│   └── page.tsx            # 메인 페이지
├── components/             # 공용 및 도메인별 UI 컴포넌트
│   ├── board/              # 게시판 전용 컴포넌트 (페이지네이션, 카드 등)
│   ├── main/               # 메인 페이지 전용 컴포넌트 및 스켈레톤
│   ├── provider/           # ThemeProvider 등 설정
│   └── (Shared UI)/        # 공용 컴포넌트 (Button, Input, Modal, Toast 등)
├── data/                   # 더미 데이터 (JSON 파일)
├── fonts/                  # 폰트
├── hooks/                  # 훅
├── store/                  # 상태 저장소 (상품 정보를 전체 공유)
├── types/                  # Type 모음
├── utils/                  # 유틸리티 함수
│   └── supabase/           # supabase
├── utils/                  # 유틸리티 함수
├── global.d.ts/            # swiper.css
├── proxy.ts/               # 프록시
└── types/                  # 전역 타입 정의 파일
```

# 사용 방법

```jsx
# 🚀 사용 방법

# 1. env 설정
NEXT_PUBLIC_SUPABASE_URL="https://[여기는본인의고유알파벳].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="공개키"
SUPABASE_SERVICE_ROLE_KEY="서버 전용 관리자 키"
```
```jsx
# 2. 프로젝트 실행
```
```jsx
# 3. 저장소 클론
git clone https://github.com/your-repo/final-project-team2.git
```
```jsx 
# 4. 폴더 이동
cd final-project-team2
```
```jsx 
# 5. 패키지 설치
bun install
```

```jsx
# 6. 개발 서버 실행
bun dev
```

👉 실행 후 브라우저에서 [http://localhost:3000](http://localhost:3000/) 접속

