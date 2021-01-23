import Motor from "../../Entities/Motor"
import IMotor from "../../Interfaces/IMotor"

function makeMotor (props: IMotor) {
  return new Motor(props)
}

export default makeMotor
