// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

const CONTENT_ENDPOINT = process.env.CONTENT_ENDPOINT

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone'
  }),
  image: {
    domains: [new URL(CONTENT_ENDPOINT).hostname]
  },
  experimental: {
    liveContentCollections: true,
    rawEnvValues: true
  }
})
