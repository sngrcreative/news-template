import { defineCollection } from 'astro:content'
import siteLoader from './loaders/site'
import pagesLoader from './loaders/pages'

const site = defineCollection({
  loader: siteLoader()
})

const pages = defineCollection({
  loader: pagesLoader()
})

export const collections = { site, pages }
