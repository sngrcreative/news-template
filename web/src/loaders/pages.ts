import type { Loader } from 'astro/loaders'
import { getPages, type TPages } from '~/graphql/pages'
import { z } from 'astro:content'

const pagesLoader = (): Loader => {
  return {
    name: 'pages-loader',
    load: async (ctx) => {
      const data = await getPages()

      ctx.store.clear()
      data.map(async ({ uri, ...page }) => {
        const parsedData = await ctx.parseData<TPages[number]>({
          id: uri!,
          data: { uri: uri!, ...page }
        })
        const digest = ctx.generateDigest(parsedData)
        ctx.store.set({
          id: uri!,
          data: { ...parsedData },
          rendered: {
            html: parsedData.content || ''
          },
          digest
        })
      })
    },
    schema: z.object({
      title: z.string().default(''),
      content: z.string().default(''),
      uri: z.string()
    })
  }
}

export default pagesLoader
