export default {
  name: 'network',
  type: 'document',
  title: 'Our Network',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Organization Name',
    },
    {
      name: 'role',
      type: 'string',
      title: 'Your Role/Tag',
      description: 'e.g., Founder, Partner, or Lead Developer',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'icon',
      type: 'string',
      title: 'Icon Name',
      description: 'Enter a Lucide icon name like: Globe, Camera, ShieldCheck, or Leaf',
    },
  ],
}