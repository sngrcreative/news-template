import { defineLiveCollection } from 'astro:content'
import postsLoader from './loaders/posts'

const posts = defineLiveCollection({
  loader: postsLoader()
})

export const collections = { posts }
