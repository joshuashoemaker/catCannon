import Server from "../../Entities/Server"

function makeServer (port: number) {
  const defaultPort = 5005

  return new Server(port || defaultPort)
}

export default makeServer
