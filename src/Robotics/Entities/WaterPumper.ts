import IWaterPump from '../Interfaces/IWaterPump'
import * as childProcesses from 'child_process'
import IWaterPumperConstructor from '../Interfaces/IWaterPumperConstructor'
import IWaterPumper from '../Interfaces/IWaterPumper'
import makeWaterPump from '../UseCases/Factories/makeWaterPump'

class WaterPumper implements IWaterPumper {
  public waterPump: IWaterPump
  public isActive: boolean = false
  private pumpProcess: childProcesses.ChildProcessWithoutNullStreams | null = null
  private pumpActiveTimeInSeconds: number
  private pumpCoolDownTimeInSeconds: number

  constructor (props: IWaterPumperConstructor) {
    this.waterPump = makeWaterPump({
      pinOne: props.pinOne,
      pinTwo: props.pinTwo
    })

    this.pumpActiveTimeInSeconds =props.pumpActiveTimeInSeconds
    this.pumpCoolDownTimeInSeconds = props.pumpCoolDownTimeInSeconds
  }

  private async coolDown () {
    return new Promise(resolve => setTimeout(resolve, this.pumpCoolDownTimeInSeconds * 1000))
  }

  public async pump () {
    if (this.isActive) return

    const pumpProcessArguments = [
      'src/Robotics/moveDcMotor.py',
      this.waterPump.pinOne.toString(),
      this.waterPump.pinTwo.toString(),
      this.pumpActiveTimeInSeconds.toString()
    ]

    this.pumpProcess = childProcesses.spawn('python', pumpProcessArguments)

    this.isActive = true
    await this.coolDown()
    this.isActive = false
  }
}

export default WaterPumper
