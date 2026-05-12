import sanitizeHtml from 'sanitize-html';

export function Sanitize(html: string) {
  return sanitizeHtml(html || '', {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span', 'u', 's', 'iframe']),

    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,

      '*': ['class', 'style'],

      iframe: ['src', 'width', 'height', 'allowfullscreen', 'frameborder'],
    },

    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'data'],
  });
}
