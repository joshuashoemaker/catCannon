import IOffset from "./IOffset";

interface IRoboticsCommunicator {
  sendOffsets(offsets: IOffset[]): void
}

export default IRoboticsCommunicator