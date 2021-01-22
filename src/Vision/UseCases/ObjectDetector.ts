import * as tf from '@tensorflow/tfjs'
import * as cocossd from '@tensorflow-models/coco-ssd'
import IObjectDetector from '../Interfaces/IObjectDetector'
import IPredictedObject from '../Interfaces/IPredictedObject'
import makePredictedObject from './Factories/makePredictedObject'

class ObjectDetector implements IObjectDetector {
  private mlModel: cocossd.ObjectDetection | null = null
  private filterPredicates: Function[] = []

  constructor (props?: { filterPredicates?: Function[] }) {
    if (props?.filterPredicates) this.filterPredicates = props.filterPredicates
    tf.getBackend()
  }

  private convertDetectedToPredictedObjects (detectedObjects: cocossd.DetectedObject[]) {
    const predictedObjects: IPredictedObject[] = detectedObjects.map(p => makePredictedObject({
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

  public async getPredictionsFromImageData (videoImage: ImageData): Promise<IPredictedObject[]> {
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