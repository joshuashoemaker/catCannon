import http from 'http'
import Server from './Server'

const main = () => {

  const port = normalizePort(process.env.PORT || '5005')
  const webService = createServer()

  webService.listen(port, () => {
    console.log(`Server is listening on ${port}`)
  })
}

const createServer = () => {
  const server = new Server()
  return http.createServer(server.app)
}

const normalizePort = (portString: string) => {
  const port = parseInt(portString, 10)

  if (isNaN(port)) return portString
  else if (port >= 0 ) return port
  else return 0
}

main()

export { main, createServer, normalizePort }