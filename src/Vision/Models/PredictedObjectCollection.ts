import { DetectedObject } from '@tensorflow-models/coco-ssd'
import PredictedObject from "./PredictedObject"

let instance: PredictedObjectCollection | null = null

class PredictedObjectCollection {
  public objects: PredictedObject[] = []

  constructor () {
    if (!instance) instance = this
    return instance
  }

  public addDetectedObjectObject(object: DetectedObject) {
    const newPredictedObject = new PredictedObject({
      xOrigin: object.bbox[0],
      yOrigin: object.bbox[1],
      width: object.bbox[2],
      height: object.bbox[3],
      class: object.class
    })
    this.objects.push(newPredictedObject)
  }
}

export default PredictedObjectCollection
