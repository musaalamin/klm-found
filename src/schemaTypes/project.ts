export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Select the sector this project belongs to',
      options: {
        list: [
          { title: 'Health', value: 'health' },
          { title: 'Education', value: 'education' },
          { title: 'Empowerment', value: 'empowerment' },
          { title: 'Entertainment', value: 'entertainment' },
          { title: 'Sports', value: 'sports' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Local Government / Location',
      type: 'string',
      placeholder: 'e.g., Gusau, Talata Mafara, Kaura Namoda',
      description: 'Which LGA or town was this project executed in?',
    },
    {
      name: 'date',
      title: 'Project Date',
      type: 'date',
      description: 'Date of commissioning or project start',
    },
    {
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'gallery',
      title: 'Project Gallery (Photos)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload multiple photos for the project timeline',
    },
    {
      name: 'videoUrl',
      title: 'YouTube Video Link',
      type: 'url',
      description: 'Paste the YouTube link (e.g., https://youtube.com/watch?v=...)',
    },
    {
      name: 'audioFile',
      title: 'Audio File (MP3)',
      type: 'file',
      options: { accept: 'audio/*' },
      description: 'Upload songs, speeches, or radio jingles',
    },
    {
      name: 'description',
      title: 'Short Summary',
      type: 'text',
      description: 'A brief 2-3 sentence overview for the list view',
    },
    {
      name: 'content',
      title: 'Detailed News / Report',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The full story/report of the project with formatting',
    },
  ],
  // This helps you see the Category and Location in the Sanity list view
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'mainImage',
    },
  },
};