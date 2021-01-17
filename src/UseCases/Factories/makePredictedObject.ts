import { DetectedObject } from "@tensorflow-models/coco-ssd"
import IPredictedObject from "../../Interfaces/IPredictedObject"
import PredictedObject from "../../Models/PredictedObject"

function makePredictedObject (p: IPredictedObject) {
  return new PredictedObject({
    xOrigin: p.xOrigin,
    yOrigin: p.yOrigin,
    width: p.width,
    height: p.height,
    class: p.class
  })
}

export default makePredictedObject