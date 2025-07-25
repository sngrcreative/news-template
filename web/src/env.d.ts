interface ImportMetaEnv {
  readonly CONTENT_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'bun' {
  interface Env extends ImportMetaEnv {}
}
