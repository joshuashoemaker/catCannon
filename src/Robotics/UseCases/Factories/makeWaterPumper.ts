import WaterPumper from "../../Entities/WaterPumper"
import IWaterPumperConstructor from "../../Interfaces/IWaterPumperConstructor"

function makeWaterPumper (props: IWaterPumperConstructor) {
  return new WaterPumper(props)
}

export default makeWaterPumper