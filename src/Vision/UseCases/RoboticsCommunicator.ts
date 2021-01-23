import * as io from 'socket.io-client'
import IOffset from '../Interfaces/IOffset'

class RoboticsCommunicator {
  socket: SocketIOClient.Socket

  constructor () {
    this.socket = io.connect()
  }

  sendOffsets = (offsets: IOffset[]) => {
    this.socket.emit('offsets', offsets)
  }
}

export default RoboticsCommunicator
