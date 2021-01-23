import Server from './Server'

import EventManager from './EventManager'
import IEventManager from './Interfaces/IEventManager';


function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const main = () => {
  console.log('starting')
  const port = 5005
  const server = new Server(port)
  const eventManager: IEventManager = new EventManager()

  eventManager.listen('onReceiveOffsets', (offsets: unknown[]) => {
    console.log(offsets)
  })
}

main()

export { main }