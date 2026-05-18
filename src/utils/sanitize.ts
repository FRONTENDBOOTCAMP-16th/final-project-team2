import sanitizeHtml from 'sanitize-html'

export function sanitizeContent(html: string) {
  return sanitizeHtml(html, {
    // 1. 허용할 태그 목록 (스크립트, 폼, 아이프레임 등 위험 태그 원천 차단)
    // 에디터에서 자주 쓰이는 제목(h1~h6), 구분선(hr) 등 안전한 태그 추가
    allowedTags: [
      'p', 'b', 'i', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'img',
      'blockquote', 'code', 'pre', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
      'span', 'u', 's', 'iframe' // 기존 에디터 호환성을 위해 추가
    ],

    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'loading', 'width', 'height', 'sizes', 'decoding'],
      code: ['class'],
      pre: ['class'],
      // 폰트 색상, 밑줄, 정렬 등을 위해 style, class 허용
      span: ['class', 'style'],
      p: ['class', 'style'],
      u: ['class', 'style'],
      s: ['class', 'style'],
      // iframe 필수 속성 허용
      iframe: ['src', 'width', 'height', 'allowfullscreen', 'frameborder'],
    },

    // iframe에서 유튜브, 비메오 등 검증된 도메인만 허용 (XSS 및 악성 스크립트 차단)
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],

    // 3. 프로토콜 상대 URL 차단 (예: //attacker.com/script.js 방지)
    allowProtocolRelative: false,

    // 4. URL 스킴 제한 (javascript:, vbscript: 등 실행 가능한 스킴 원천 차단)
    allowedSchemes: ['http', 'https', 'mailto'],
    // 이미지는 base64 데이터(ReactQuill 드래그앤드롭 등)를 허용할 수 있도록 data 스킴 추가
    allowedSchemesByTag: {
      img: ['http', 'https', 'data'],
      a: ['http', 'https', 'mailto'],
    },

    // 5. 스킴 검사를 적용할 속성 명시 (src, href 등에만 적용)
    allowedSchemesAppliedToAttributes: ['href', 'src'],

    transformTags: {
      a: (tagName, attribs) => {
        // 6. 2차 방어: href가 없거나 교묘하게 javascript: 가 포함된 경우 링크 기능 무효화
        if (!attribs.href || attribs.href.toLowerCase().trim().startsWith('javascript:')) {
          return { tagName: 'span', attribs: {} } // 단순 텍스트 감싸개로 강제 변환
        }

        return {
          tagName: 'a',
          attribs: {
            ...attribs,
            // 7. 탭 하이재킹(Tab Nabbing) 리다이렉션 공격 방지
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        }
      },

      img: (tagName, attribs) => {
        // 이미지가 src를 가지고 있지 않으면 태그 자체를 제거(span으로 대체)
        if (!attribs.src) {
          return { tagName: 'span', attribs: {} }
        }

        return {
          tagName: 'img',
          attribs: {
            ...attribs,
            // 성능 최적화 및 보안
            loading: 'lazy',
            decoding: 'async',
            width: attribs.width || '800',
            height: attribs.height || '600',
            sizes: attribs.sizes || '(max-width: 768px) 100vw, 800px',
            // 인라인 스타일은 allowedAttributes에서 전역 차단되었지만, 
            // 여기서 강제 주입하는 스타일은 안전하게 적용됨
            style: 'max-width:100%;height:auto;',
          },
        }
      },
    },
  })
}

