export default {
  name: 'news',
  type: 'document',
  title: 'News Updates',
  fields: [
    { name: 'title', type: 'string', title: 'Headline' },
    { name: 'publishedAt', type: 'datetime', title: 'Publication Date' },
    { name: 'displayDate', type: 'string', title: 'Display Date Label' },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    // NEW: Dedicated Gallery Field
    {
      name: 'gallery',
      type: 'array',
      title: 'Photo Gallery',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: any) => Rule.max(6).error('Maximum 6 photos allowed'),
    },
    {
      name: 'content',
      title: 'News Writeup (Text Only)',
      type: 'array',
      of: [{ type: 'block' }], // We keep this simple - just text
    },
  ]
}