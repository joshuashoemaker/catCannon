import * as tf from '@tensorflow/tfjs'
import * as cocossd from '@tensorflow-models/coco-ssd'

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

  private doesPredictionPassFilterPredicates (prediction: cocossd.DetectedObject): boolean {
    let failedPredictions = []
    this.filterPredicates.forEach(filter => {
      if (!filter(prediction)) failedPredictions.push(filter)
    })

    if (failedPredictions.length > 0) return false
    else return true
  }

  public predictImageStream = async (videoImage: ImageData) => {
    const mlModel = await this.loadMlModel()
    const predictions = await mlModel.detect(videoImage)
    const filteredPredictions = predictions.filter(p => this.doesPredictionPassFilterPredicates(p))

    return filteredPredictions
  }

  public async loadMlModel (): Promise<cocossd.ObjectDetection> {
    if (!this.mlModel) this.mlModel = await cocossd.load()
    return this.mlModel
  }
}

export default ObjectDetector