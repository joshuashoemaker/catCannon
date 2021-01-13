import * as tf from '@tensorflow/tfjs'
import * as cocossd from '@tensorflow-models/coco-ssd'
import PredictedObject from '../Models/PredictedObject'

let instance: ObjectDetector | null = null

class ObjectDetector {
  private mlModel: cocossd.ObjectDetection | null = null
  private filterPredicates: Function[] = []

  constructor (props?: { filterPredicates?: Function[] }) {
    if (!instance) instance = this
    
    if (props?.filterPredicates) this.filterPredicates = props.filterPredicates
    tf.getBackend()

    return instance
  }

  private convertDetectedToPredictedObjects = (detectedObjects: cocossd.DetectedObject[]) => {
    const predictedObjects: PredictedObject[] = detectedObjects.map(p => new PredictedObject({
      xOrigin: p.bbox[0],
      yOrigin: p.bbox[1],
      width: p.bbox[2],
      height: p.bbox[3],
      class: p.class
    }))
  
    return predictedObjects
  }

  private doesDetectionPassFilterPredicates (prediction: cocossd.DetectedObject): boolean {
    let failedPredictions = []
    this.filterPredicates.forEach(filter => {
      if (!filter(prediction)) failedPredictions.push(filter)
    })

    if (failedPredictions.length > 0) return false
    else return true
  }

  public predictImageStream = async (videoImage: ImageData) => {
    const mlModel = await this.loadMlModel()
    const detectedObjects = await mlModel.detect(videoImage)
    const filteredDetections = detectedObjects.filter(p => this.doesDetectionPassFilterPredicates(p))
    const predictions = this.convertDetectedToPredictedObjects(filteredDetections)

    return predictions
  }

  public async loadMlModel (): Promise<cocossd.ObjectDetection> {
    if (!this.mlModel) this.mlModel = await cocossd.load()
    return this.mlModel
  }
}

export default ObjectDetector