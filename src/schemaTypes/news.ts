export default {
  name: 'news',
  type: 'document',
  title: 'News Updates',
  fields: [
    { 
      name: 'title', 
      type: 'string', 
      title: 'Headline' 
    },
    { 
      name: 'publishedAt', 
      type: 'datetime', 
      title: 'Publication Date',
      description: 'The news will be sorted by this date (Newest first)'
    },
    { 
      name: 'displayDate', 
      type: 'string', 
      title: 'Display Date Label', 
      description: 'e.g., MAY 2026' 
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'News Content',
      type: 'array',
      of: [
        { type: 'block' },
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' }
          ]
        }
      ],
      description: 'Add paragraphs and up to 6 images here. You can drag them to reorder.'
    },
  ]
}