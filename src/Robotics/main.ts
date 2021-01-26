import IEventManager from './Interfaces/IEventManager'
import IMotorMover from './Interfaces/IMotorMover'

import makeServer from './UseCases/Factories/makeServer'
import makeEventManager from './UseCases/Factories/makeEventManager'
import makeMotorMover from './UseCases/Factories/makeMotorMover'

const main = () => {
  console.log('starting')

  const port = 5005
  makeServer(port)

  const eventManager: IEventManager = makeEventManager()

  const xAxisMotorMover: IMotorMover = makeMotorMover({
    motor: { pinOne: 3, pinTwo: 5, pinThree: 7, pinFour: 11 },
    pauseIntervalTime: 0.05
  })

  const yAxisMotorMover: IMotorMover = makeMotorMover({
    motor: { pinOne: 13, pinTwo: 15, pinThree: 19, pinFour: 21 },
    pauseIntervalTime: 0.05
  })

  eventManager.listen('onReceiveOffsets', (offsets: any[]) => {
    if (offsets[0]?.x > 50) {
      xAxisMotorMover.moveCounterClockwise()
    } else if (offsets[0]?.x < - 50) {
      xAxisMotorMover.moveClockwise()
    } else {
      xAxisMotorMover.stopMovement()
    }
    
    if (offsets[0]?.y > 50) {
      yAxisMotorMover.moveClockwise()
    } else if (offsets[0]?.y < - 50) {
      yAxisMotorMover.moveCounterClockwise()
    } else {
      yAxisMotorMover.stopMovement()
    }
    // console.log(`moving ${xAxisMotorMover.movementState}`)
  })
}

main()

export { main }