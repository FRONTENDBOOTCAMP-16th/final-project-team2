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
      img: ['src', 'alt'],
    },

    allowedSchemes: ['http', 'https', 'mailto'],
  })
}
