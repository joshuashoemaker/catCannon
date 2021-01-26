import IMotor from "../Interfaces/IMotor"
import makeMotor from "../UseCases/Factories/makeMotor"
import * as childProcesses from 'child_process'
import IMotorMoverConstructor from "../Interfaces/IMotorMoverConstructor"
import IMotorMover from "../Interfaces/IMotorMover"

class MotorMover implements IMotorMover {
  motor: IMotor
  moveProcess: childProcesses.ChildProcessWithoutNullStreams | null = null
  pauseIntervalTime: number
  movementState: 'CLOCKWISE' | 'COUNTERCLOCKWISE' | "IDLE" = 'IDLE'

  constructor (props: IMotorMoverConstructor) {
    this.motor = makeMotor(props.motor)
    this.pauseIntervalTime = props.pauseIntervalTime
  }

  public moveClockwise = () => {
    if (this.movementState === 'CLOCKWISE') return
    else {
      if (!this.moveProcess?.killed) this.moveProcess?.kill()
    }

    const motorProcessArguments = [
      'src/Robotics/moveStepper.py',
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
    else {
      if (!this.moveProcess?.killed) this.moveProcess?.kill()
    }

    const motorProcessArguments = [
      'src/Robotics/moveStepper.py',
      this.motor.pinOne.toString(),
      this.motor.pinTwo.toString(),
      this.motor.pinThree.toString(),
      this.motor.pinFour.toString(),
      'counterClockwise',
      this.pauseIntervalTime.toString()
    ]

    console.log('start counterclockwise')
    this.moveProcess = childProcesses.spawn('python', motorProcessArguments)
    this.movementState = 'COUNTERCLOCKWISE'
  }

  public stopMovement = () => {
    if (this.movementState === 'IDLE') return
    else {
      if (!this.moveProcess?.killed) this.moveProcess?.kill()
      console.log('start idle')
      this.movementState = 'IDLE'
    }
  }
}

export default MotorMover