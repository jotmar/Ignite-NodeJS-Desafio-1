import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middleware/json.js'
import { extractQueryParams } from './utils/extractQuery.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  /* JSON Middleware */

  await json(req, res)

  /* Verificando se a rota existe */

  const route = routes.find(route => {
    if (route.method == method && route.path.test(url)) {
      return route
    }
  })

  /* Se existir, utilizar o seu handler, caso contrário enviar 404 */

  if (route) {
    /* Conseguindo Route Parameters e Query Parameters com Regex */

    const routeParams = url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.query = query ? extractQueryParams(query) : {}
    req.params = params

    console.log(extractQueryParams(query), params)

    return route.handler(req, res)
  } else {
    return res.writeHead(404).end('Not Found!')
  }
})

server.listen(3333)
