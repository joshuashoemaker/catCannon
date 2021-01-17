import PredictedObject from '../Models/PredictedObject'

interface IObjectDetector {
  getPredictionsFromImageData(videoImage: ImageData): Promise<PredictedObject[]>
}

export default IObjectDetector
