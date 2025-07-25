import { defineCollection } from 'astro:content'
import siteLoader from './loaders/site'

const site = defineCollection({
  loader: siteLoader()
})

export const collections = { site }
