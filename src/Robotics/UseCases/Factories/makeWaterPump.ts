import WaterPump from "../../Entities/WaterPump"
import IWaterPump from "../../Interfaces/IWaterPump"

function makeWaterPump (props: IWaterPump) {
  return new WaterPump(props)
}

export default makeWaterPump
