import IOffset from "./IOffset"
import IPredictedObject from "./IPredictedObject"

interface IObjectLocator {
  getOffsetsFromPredictions(predictedObject: IPredictedObject): IOffset
}

export default IObjectLocator