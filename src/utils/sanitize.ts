import sanitizeHtml from 'sanitize-html'

export function sanitizeContent(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      'p',
      'b',
      'i',
      'strong',
      'em',
      'ul',
      'ol',
      'li',
      'a',
      'img',
      'blockquote',
      'code',
      'pre',
      'br',
    ],

    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'loading', 'width', 'height', 'sizes', 'decoding'],
    },

    allowedSchemes: ['http', 'https', 'mailto'],

    transformTags: {
      a: (tagName, attribs) => {
        return {
          tagName: 'a',
          attribs: {
            ...attribs,
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        }
      },

      img: (tagName, attribs) => {
        return {
          tagName: 'img',
          attribs: {
            ...attribs,

            loading: 'lazy',
            decoding: 'async',

            width: attribs.width || '800',
            height: attribs.height || '600',

            sizes: attribs.sizes || '(max-width: 768px) 100vw, 800px',

            style: 'max-width:100%;height:auto;',
          },
        }
      },
    },
  })
}
