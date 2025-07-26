import type { RootQuery, Post } from './types'
import execute, { gql } from './execute'

type PostResult = Pick<
  Post,
  'title' | 'uri' | 'date' | 'excerpt' | 'content' | 'featuredImage'
>
type PostsQuery = Pick<RootQuery, 'posts'>

const getPostsGQL = gql`
  query GetPosts($first: Int = 10) {
    posts(where: { status: PUBLISH }, first: $first) {
      nodes {
        title
        uri
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`

export const getPosts = async ({ first = 10 }: { first?: number }) => {
  const { data } = await execute<PostsQuery>(getPostsGQL, { first })
  return data.posts?.nodes.map((post: PostResult) => ({
    ...post,
    featuredImage: post.featuredImage?.node.sourceUrl || undefined,
    pageInfo: {
      ...data.posts?.pageInfo
    }
  }))
}

type PostQuery = Pick<RootQuery, 'post'>

const getPostGQL = gql`
  query GetPost($id: ID!) {
    post(id: $id, idType: URI) {
      title
      uri
      date
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`

export const getPost = async ({ id }: { id: string }) => {
  const { data } = await execute<PostQuery>(getPostGQL, { id })
  return {
    ...(data.post as PostResult | undefined),
    featuredImage: data.post?.featuredImage?.node.sourceUrl ?? undefined
  }
}
