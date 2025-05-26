import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middleware/json.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  /* JSON Middleware */

  await json(req, res)

  /* Verificando se a rota existe */

  const route = routes.find(route => {
    if (route.method == method && route.path === url) {
      return route
    } else {
      return null
    }
  })

  /* Se existir, utilizar o seu handler, caso contrário enviar 404 */

  if (route) {
    return route.handler(req, res)
  } else {
    return res.writeHead(404).end('Not Found!')
  }
})

server.listen(3333)
