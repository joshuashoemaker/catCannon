import { DetectedObject } from "@tensorflow-models/coco-ssd"
import PredictedObject from '../Models/PredictedObject'

const convertDetectedToPredictedObjects = (detectedObjects: DetectedObject[]) => {
  const predictedObjects: PredictedObject[] = detectedObjects.map(p => new PredictedObject({
    xOrigin: p.bbox[0],
    yOrigin: p.bbox[1],
    width: p.bbox[2],
    height: p.bbox[3],
    class: p.class
  }))

  return predictedObjects
}

export default convertDetectedToPredictedObjects
