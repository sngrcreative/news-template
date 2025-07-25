import type { CodegenConfig } from '@graphql-codegen/cli'

const GQL_SCHEMA_ENDPOINT = process.env.CONTENT_ENDPOINT

const config: CodegenConfig = {
  overwrite: true,
  schema: GQL_SCHEMA_ENDPOINT,
  generates: {
    'src/graphql/types.ts': {
      plugins: ['typescript']
    }
  }
}

export default config
