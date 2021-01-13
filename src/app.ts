import { DetectedObject } from "@tensorflow-models/coco-ssd"
import PredictedObjectCollectionController from "./Controllers/PredictedObjectCollectionController"
import VideoController from './Controllers/VideoController'
import ObjectDetector from './Models/ObjectDetector'
import PredictedObject from "./Models/PredictedObject"

const defaultPredictions = [
  (prediction: DetectedObject) => prediction.score > 0.6,
  (prediction: DetectedObject) => prediction.class === 'cat',
]

class App {
  private predictedObjectCollectionController: PredictedObjectCollectionController
  private videoController: VideoController
  private objectDetector: ObjectDetector

  constructor () {
    console.log('starting')
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

    const predictions: DetectedObject[] = await this.objectDetector.predictImageStream(imageData)
    const predictedObjects = predictions.map(p => new PredictedObject({
      xOrigin: p.bbox[0],
      yOrigin: p.bbox[1],
      width: p.bbox[2],
      height: p.bbox[3],
      class: p.class
    }))

    this.predictedObjectCollectionController.predictedObjects = predictedObjects

    window.requestAnimationFrame(this.predictImage)
  }
}

new App()
