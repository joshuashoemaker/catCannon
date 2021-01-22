import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

class Server {
  public app = express()

  constructor () {
    this.createApp()
    this.setupAppOptions()
    this.setupAppRoutes()
  }

  createApp = () => {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.static(path.join(process.cwd(), '/build')))
    this.app.use(bodyParser.json())
  }

  setupAppRoutes = () => {
    // this.app.use('/api', apiRouter)
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
}

export default Server