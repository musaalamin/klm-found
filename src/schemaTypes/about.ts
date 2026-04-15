export default {
  name: 'about',
  type: 'document',
  title: 'About Page (Jagaban)',
  fields: [
    { name: 'name', type: 'string', title: 'Full Name' },
    { name: 'title', type: 'string', title: 'Professional Title' },
    { name: 'bio', type: 'array', title: 'Biography', of: [{type: 'block'}] },
    { name: 'image', type: 'image', title: 'Portrait Image', options: { hotspot: true } },
    { name: 'quote', type: 'text', title: 'Key Quote' },
  ]
}