export default {
  name: 'news',
  type: 'document',
  title: 'News Updates',
  fields: [
    { name: 'title', type: 'string', title: 'Headline' },
    { name: 'date', type: 'string', title: 'Display Date', description: 'e.g., JAN 28, 2026' },
    { name: 'content', type: 'text', title: 'Short Summary' },
  ]
}