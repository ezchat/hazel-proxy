import fastify from 'fastify'
import config from './config.js'
import oauthHandler from './endpoints/oauth.js'

const server = fastify({ logger: true })

server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

server.get('/oauth', oauthHandler)

try {
  await server.listen({ port: config.port })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
