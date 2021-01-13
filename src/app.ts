import { DetectedObject } from "@tensorflow-models/coco-ssd"
import PredictedObjectCollectionController from "./Controllers/PredictedObjectCollectionController"
import VideoController from './Controllers/VideoController'
import ObjectDetector from './Models/ObjectDetector'
import convertDetectedtoPredictedObject from './UseCases/convertDetectedToPredictedObjects'

const defaultPredictions = [
  (prediction: DetectedObject) => prediction.score > 0.6,
  (prediction: DetectedObject) => prediction.class === 'cat',
]

class App {
  private predictedObjectCollectionController: PredictedObjectCollectionController
  private videoController: VideoController
  private objectDetector: ObjectDetector

  constructor () {
    this.objectDetector = new ObjectDetector({ filterPredicates: defaultPredictions })
    this.predictedObjectCollectionController = new PredictedObjectCollectionController()
    this.videoController = new VideoController({  width: 640, height: 480 })
    this.predictImage()
  }

  predictImage = async () => {
    const imageData = this.videoController.imageData

    if (!imageData) {
      window.requestAnimationFrame(this.predictImage)
      return
    }

    const detectedObjects: DetectedObject[] = await this.objectDetector.predictImageStream(imageData)
    const predictedObjects = convertDetectedtoPredictedObject(detectedObjects)
    this.predictedObjectCollectionController.predictedObjects = predictedObjects

    window.requestAnimationFrame(this.predictImage)
  }
}

new App()
