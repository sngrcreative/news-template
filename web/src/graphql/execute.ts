const ENDPOINT = import.meta.env.CONTENT_ENDPOINT

export const gql = String.raw

type ExecuteResult<T> = {
  data: T
  extensions: any
}

const execute = async <TResult>(
  query: ReturnType<typeof gql>,
  variables: Record<string, string | Array<string> | number> = {}
) => {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json'
    },
    body: JSON.stringify({ query, variables })
  })

  if (!res.ok) {
    throw new Error("Error: Can't retrieve GraphQL data.")
  }

  return (await res.json()) as ExecuteResult<TResult>
}

export default execute
