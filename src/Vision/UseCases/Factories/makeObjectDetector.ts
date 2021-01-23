import { DetectedObject } from "@tensorflow-models/coco-ssd"
import ObjectDetector from "../ObjectDetector"

const defaultPredictions = [
  (prediction: DetectedObject) => prediction.score > 0.6,
  (prediction: DetectedObject) => prediction.class === 'cat',
]

function makeObjectDetector (filterPredicates?: Function[]): ObjectDetector {
  if (!filterPredicates) filterPredicates = defaultPredictions
  return new ObjectDetector({ filterPredicates })
}

export default makeObjectDetector