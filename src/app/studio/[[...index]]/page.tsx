'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/../sanity.config' // This tells Next.js to look in the root

export default function StudioPage() {
  return <NextStudio config={config} />
}