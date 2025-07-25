import type { Loader } from 'astro/loaders'
import { getSite, type TSite } from '~/graphql/site'
import { z } from 'astro:content'

const siteLoader = (): Loader => {
  return {
    name: 'site-loader',
    load: async (ctx) => {
      const data = await getSite()
      if (!data) throw new Error('Error: No site data found')

      ctx.store.clear()
      const parsedData = await ctx.parseData<TSite>({
        id: 'SITE',
        data: { ...data }
      })
      const digest = ctx.generateDigest(parsedData)
      ctx.store.set({
        id: 'SITE',
        data: { ...parsedData },
        digest
      })
    },
    schema: z.object({
      title: z.string().default(''),
      description: z.string().default('')
    })
  }
}

export default siteLoader
