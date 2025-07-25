import type { RootQuery, Page } from './types'
import execute, { gql } from './execute'

type Pages = Pick<RootQuery, 'pages'>

const getPagesGQL = gql`
  query GetPages {
    pages(where: { status: PUBLISH }) {
      nodes {
        title
        uri
        content
      }
    }
  }
`

export type TPages = Array<Pick<Page, 'title' | 'uri' | 'content'>>

export const getPages = async () => {
  const { data } = await execute<Pages>(getPagesGQL)
  return data.pages?.nodes as TPages
}
