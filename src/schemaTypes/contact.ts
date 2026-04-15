export default {
  name: 'contact',
  type: 'document',
  title: 'Contact Page',
  fields: [
    { name: 'phone', type: 'string', title: 'Phone Number' },
    { name: 'email', type: 'string', title: 'Email Address' },
    { name: 'address', type: 'string', title: 'Office Address' },
    { 
      name: 'mapUrl', 
      type: 'url', 
      title: 'Google Maps Embed URL',
      description: 'Only paste the "src" value from the Google Maps embed code (the part starting with https://www.google.com/maps/embed...)'
    },
  ]
}