import { DetectedObject } from "@tensorflow-models/coco-ssd"
import PredictedObjectCollectionController from "./Controllers/PredictedObjectCollectionController"
import VideoController from './Controllers/VideoController'
import ObjectDetector from './UseCases/ObjectDetector'

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

    const predictedObjects = await this.objectDetector.predictImageStream(imageData)
    this.predictedObjectCollectionController.predictedObjects = predictedObjects

    window.requestAnimationFrame(this.predictImage)
  }
}

new App()
