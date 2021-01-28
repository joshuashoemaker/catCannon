import IWaterPump from "./IWaterPump";

interface IWaterPumper {
  pump(): void
  isActive: boolean
  waterPump: IWaterPump
}

export default IWaterPumper
