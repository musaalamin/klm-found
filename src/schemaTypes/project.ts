export default {
  name: 'project',
  type: 'document',
  title: 'Projects',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Project Name',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Project Description',
    },
    {
      name: 'gallery',
      type: 'array',
      title: 'Project Gallery',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'category',
      type: 'string', // Changed from a list to a plain string
      title: 'Category',
      description: 'Type any category name here (e.g., Media, Governance, Education)',
    },
  ],
}