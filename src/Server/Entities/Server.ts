import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import http from 'http'
import { Socket } from 'socket.io'
import IEventManager from '../Interfaces/IEventManager'
import EventManager from '../Entities/EventManager'

class Server {
  public app = express()
  private eventManager: IEventManager

  constructor (port: number) {
    this.createApp()
    this.setupAppOptions()
    this.setupAppRoutes()
    this.startServer(port)
    this.eventManager = new EventManager()
  }

  createApp = () => {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.static(path.join(process.cwd(), '/dist/Vision/')))
    this.app.use(bodyParser.json())
  }

  setupAppRoutes = () => {
    this.app.use('/', (request, response, next) => {
      response.sendFile(path.join(process.cwd(), './dist/Vision/index.html'))
    })
  }

  setupAppOptions = () => {
    this.app.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', request.headers.origin || '*')
      response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,HEAD,DELETE,OPTIONS')
      response.header('Access-Control-Allow-Headers', 'Content-Type,x-requested-with')
      next()
    })
  }

  startServer = (port: number) => {
    const webService = new http.Server(this.app)
    const socketService = require("socket.io")(webService)
    this.openSockets(socketService)
    webService.listen(port, () => {
      console.log(`Server is listening on ${port}`)
    })
  }

  openSockets = (socketService: any) => {
    socketService.on('connection', (socket: Socket) => {
      console.log('client connected')
      
      socket.on('offsets', (offsets: any[]) => {
        this.onReceiveOffsets(offsets)
      })
    })
  }

  public onReceiveOffsets = (offsets: any[]) => {
    this.eventManager.emit('onReceiveOffsets', offsets)

  }

}

export default Server