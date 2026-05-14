export default {
  name: 'network',
  title: 'Network / Subsidiaries',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Network Category',
      type: 'string',
      options: {
        list: [
          { title: 'Youth Wing', value: 'youth' },
          { title: 'Women Wing', value: 'women' },
          { title: 'Elders Council', value: 'elders' },
          { title: 'Technical Partners', value: 'partners' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Organization Logo',
      type: 'image',
      description: 'Upload a logo if available. If left empty, a default icon will be used.',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Organization Bio / Description',
      type: 'text',
      description: 'A brief overview of what this subsidiary does.',
    },
    {
      name: 'videoUrl',
      title: 'Video Link (YouTube/Facebook)',
      type: 'url',
    },
    {
      name: 'gallery',
      title: 'Gallery Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
  ],
};