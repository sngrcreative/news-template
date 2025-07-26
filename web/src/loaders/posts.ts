import type { LiveLoader } from 'astro/loaders'
import { getPosts, getPost } from '~/graphql/posts'

type Post = NonNullable<Awaited<ReturnType<typeof getPosts>>>[number]
type PostCollectionFilter = Parameters<typeof getPosts>[0]
type PostEntryFilter = Parameters<typeof getPost>[0]

const postsLoader = (): LiveLoader<
  Post,
  PostEntryFilter,
  PostCollectionFilter
> => {
  return {
    name: 'posts-loader',
    loadEntry: async (ctx) => {
      const post = await getPost(ctx.filter)
      if (!post) {
        throw new Error('ERROR: Problem on fetching post.')
      }

      return {
        id: post.uri!,
        data: {
          ...post,
          pageInfo: {}
        },
        rendered: {
          html: post.content ?? ''
        }
      }
    },
    loadCollection: async (ctx) => {
      const posts = await getPosts(ctx.filter ?? {})
      if (!posts) {
        throw new Error('ERROR: Problem on fetching posts.')
      }

      return {
        entries: posts.map((post) => ({
          id: post.uri!,
          data: {
            ...post
          }
        }))
      }
    }
  }
}

export default postsLoader
