import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/schemaTypes/index' // Added /index

export default defineConfig({
  name: 'default',
  title: 'KLM Foundation CMS',
  projectId: '4goyjcfy', // Make sure this is your real ID
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})