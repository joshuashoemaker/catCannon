import IMotor from "../Interfaces/IMotor"

class Motor implements IMotor {
  public pinOne: number
  public pinTwo: number
  public pinThree: number
  public pinFour: number

  constructor (props: IMotor) {
    this.pinOne = props.pinOne
    this.pinTwo = props.pinTwo
    this.pinThree = props.pinThree
    this.pinFour = props.pinFour
  }
}

export default Motor
