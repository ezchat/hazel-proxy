import { readFile } from 'node:fs/promises'

interface Config {
  port: number
  token: string
  rootUrl: string
  jwtSecret: string
  clientId: string
  clientSecret: string
}

const config: Config = JSON.parse(
  await readFile(new URL('../config.json', import.meta.url), {
    encoding: 'utf-8',
  }),
)

export const {
  port = 3000,
  token,
  rootUrl,
  jwtSecret,
  clientId,
  clientSecret,
} = config

export default Object.assign({ port }, config)
