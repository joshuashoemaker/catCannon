import IMotor from "./Interfaces/IMotor"
import makeMotor from "./UseCases/Factories/makeMotor"
import * as childProcesses from 'child_process'

class MotorMover {
  motor: IMotor
  moveProcess: childProcesses.ChildProcessWithoutNullStreams | null = null
  pauseIntervalTime: number = 0.05
  movementState: 'CLOCKWISE' | 'COUNTERCLOCKWISE' | "IDLE" = 'IDLE'

  constructor (motor: IMotor) {
    this.motor = makeMotor(motor)
  }

  public moveClockwise = () => {
    if (this.movementState === 'CLOCKWISE') return

    this.moveProcess?.kill()
    this.moveProcess = null

    const motorProcessArguments = [
      'src/Server/moveStepper.py',
      this.motor.pinOne.toString(),
      this.motor.pinTwo.toString(),
      this.motor.pinThree.toString(),
      this.motor.pinFour.toString(),
      'clockwise',
      this.pauseIntervalTime.toString()
    ]

    console.log('start clockwise')
    this.moveProcess = childProcesses.spawn('python', motorProcessArguments)
    this.movementState = 'CLOCKWISE'
  }

  public moveCounterClockwise = () => {
    if (this.movementState === 'COUNTERCLOCKWISE') return

    this.moveProcess?.kill()
    this.moveProcess = null

    const motorProcessArguments = [
      'src/Server/moveStepper.py',
      this.motor.pinOne.toString(),
      this.motor.pinTwo.toString(),
      this.motor.pinThree.toString(),
      this.motor.pinFour.toString(),
      'counterClockwise',
      this.pauseIntervalTime.toString()
    ]

    this.moveProcess = childProcesses.spawn('python', motorProcessArguments)
    this.movementState = 'COUNTERCLOCKWISE'
  }

  public stopMovement = () => {
    this.moveProcess?.kill()
    this.movementState = 'IDLE'
  }
}

export default MotorMover