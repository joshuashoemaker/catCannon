import Server from './Server'

import EventManager from './EventManager'
import IEventManager from './Interfaces/IEventManager';
import MotorMover from './MotorMover';


function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const main = () => {
  console.log('starting')
  const port = 5005
  const server = new Server(port)
  const eventManager: IEventManager = new EventManager()

  const motorMover = new MotorMover({ pinOne: 3, pinTwo: 5, pinThree: 7, pinFour: 11 })
  // motorMover.moveClockwise()

  eventManager.listen('onReceiveOffsets', (offsets: any[]) => {
    if (offsets[0]?.x > 50) {
      motorMover.moveCounterClockwise()
    } else if (offsets[0]?.x < - 50) {
      motorMover.moveClockwise()
    } else {
      motorMover.stopMovement()
    }
    console.log(`moving ${motorMover.movementState}`)
  })
}

main()

export { main }