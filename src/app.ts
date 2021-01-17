import { DetectedObject } from "@tensorflow-models/coco-ssd"
import PredictedObjectCollectionController from "./Controllers/PredictedObjectCollectionController"
import VideoController from './Controllers/VideoController'
import ObjectDetector from './UseCases/ObjectDetector'
import ObjectLocator from "./UseCases/ObjectLocator"

const defaultPredictions = [
  (prediction: DetectedObject) => prediction.score > 0.6,
  (prediction: DetectedObject) => prediction.class === 'person', // TODO: change to cat
]

class App {
  private predictedObjectCollectionController: PredictedObjectCollectionController
  private videoController: VideoController
  private objectDetector: ObjectDetector
  private objectLocator: ObjectLocator

  constructor () {
    this.objectDetector = new ObjectDetector({ filterPredicates: defaultPredictions })
    this.predictedObjectCollectionController = new PredictedObjectCollectionController()
    this.videoController = new VideoController({  width: 640, height: 480 })
    this.objectLocator = new ObjectLocator(this.videoController.model)
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
    const offsets = predictedObjects.map(obj => {
      return this.objectLocator.detectPredictedObjectLocationFromVideo(obj)
    })

    console.log(offsets)

    window.requestAnimationFrame(this.predictImage)
  }
}

new App()
