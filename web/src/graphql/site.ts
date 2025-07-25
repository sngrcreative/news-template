import type { RootQuery } from './types'
import execute, { gql } from './execute'

type Site = Pick<RootQuery, 'generalSettings'>

const getSiteGQL = gql`
  query GetSite {
    generalSettings {
      title
      description
    }
  }
`

export const getSite = async () => {
  const { data } = await execute<Site>(getSiteGQL)
  return data.generalSettings
}

export type TSite = Pick<
  NonNullable<Awaited<ReturnType<typeof getSite>>>,
  'title' | 'description'
>
