import IEventManager from './Interfaces/IEventManager'
import IMotorMover from './Interfaces/IMotorMover'
import IWaterPumper from './Interfaces/IWaterPumper'

import makeServer from './UseCases/Factories/makeServer'
import makeEventManager from './UseCases/Factories/makeEventManager'
import makeMotorMover from './UseCases/Factories/makeMotorMover'
import makeWaterPumper from './UseCases/Factories/makeWaterPumper'

const main = () => {
  console.log('Starting Robotics')

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

  const waterPumper: IWaterPumper = makeWaterPumper({
    pinOne: 37,
    pinTwo: 35,
    pumpActiveTimeInSeconds: 1,
    pumpCoolDownTimeInSeconds: 5
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

    if (offsets[0]?.hypotenuse <= 80) {
      waterPumper.pump()
    }
  })
}

main()

export { main }