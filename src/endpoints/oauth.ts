import jsonwebtoken from 'jsonwebtoken'
import { rootUrl, clientId, clientSecret, jwtSecret } from '../config.js'
import type { RouteHandlerMethod } from 'fastify'

const scope = ['identify', 'guilds'].join(' ')
const REDIRECT_URI = `${rootUrl}/api/oauth`
const OAUTH_QS = new URLSearchParams({
  client_id: clientId,
  redirect_uri: REDIRECT_URI,
  response_type: 'code',
  scope,
}).toString()
const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`

interface DiscordResponse {
  access_token?: string
  refresh_token?: string
  expires_in?: number
}

const oauthHandler: RouteHandlerMethod = async (request, reply) => {
  if (request.method !== 'GET')
    return await reply.status(405).send({ error: 'Method Not Allowed!' })
  const { code, error, jwt } = request.query as {
    error?: string
    code?: string
    jwt?: string
  }

  if (jwt) return { jwt }
  else if (error) return { error }
  else if (!code || typeof code !== 'string') {
    return await reply.redirect(OAUTH_URI)
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    code,
    scope,
  }).toString()

  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  } = (await fetch('https://discord.com/api/oauth2/token', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body,
  }).then(async res => await res.json())) as DiscordResponse

  if (!accessToken || typeof accessToken !== 'string') {
    return await reply.redirect(OAUTH_URI)
  }

  const token = jsonwebtoken.sign(
    { accessToken, refreshToken, scope },
    jwtSecret,
    { expiresIn },
  )
  return await reply.redirect(`${REDIRECT_URI}?jwt=${token}`)
}

export default oauthHandler
