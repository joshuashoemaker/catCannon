import MotorMover from "../../Entities/MotorMover"
import IMotorMoverConstructor from "../../Interfaces/IMotorMoverConstructor"

function makeMotorMover (props: IMotorMoverConstructor) {
  return new MotorMover(props)
}

export default makeMotorMover
