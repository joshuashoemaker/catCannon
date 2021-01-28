import IWaterPump from '../Interfaces/IWaterPump'

class WaterPump implements IWaterPump {
  public pinOne: number
  public pinTwo: number

  constructor (props: IWaterPump) {
    this.pinOne = props.pinOne
    this.pinTwo = props.pinTwo
  }
}

export default WaterPump
