export default {
  name: 'hero',
  type: 'document',
  title: 'Home Hero Section',
  fields: [
    {
      name: 'topTag',
      type: 'string',
      title: 'Top Mini Tag',
      description: 'e.g., Unified Vision, One Zamfara',
      initialValue: 'Unified Vision, One Zamfara'
    },
    {
      name: 'headline',
      type: 'string',
      title: 'Main Headline',
    },
    {
      name: 'subheadline',
      type: 'text',
      title: 'Sub-headline',
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: { hotspot: true },
    },
    {
      name: 'primaryCtaText',
      type: 'string',
      title: 'Primary Button Text (Projects)',
      initialValue: 'Explore Projects'
    },
    {
      name: 'secondaryCtaText',
      type: 'string',
      title: 'Secondary Button Text (Movement)',
      initialValue: 'Join Movement',
      description: 'This button will automatically link to the /register page'
    },
  ],
}