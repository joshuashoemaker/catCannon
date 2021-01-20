import IObjectDetector from './Interfaces/IObjectDetector'
import IObjectLocator from './Interfaces/IObjectLocator'
import IOffset from './Interfaces/IOffset'
import IUiRenderer from './Interfaces/IUiRenderer'
import IVideoCapturer from "./Interfaces/IVideoCapturer"

import makeObjectDetector from './UseCases/Factories/makeObjectDetector'
import makeObjectLocator from './UseCases/Factories/makeObjectLocator'
import makeUiRenderer from './UseCases/Factories/makeUiRenderer'
import makeVideoCapturer from './UseCases/Factories/makeVideoCatpurer'

class App {
  private objectDetector: IObjectDetector
  private objectLocator: IObjectLocator
  private videoCapturer: IVideoCapturer
  private uiRenderer: IUiRenderer

  constructor () {
    this.videoCapturer = makeVideoCapturer()
    this.objectDetector = makeObjectDetector()
    this.objectLocator = makeObjectLocator()
    this.uiRenderer = makeUiRenderer()

    const eventTarget = new EventTarget()
    eventTarget.addEventListener('onMediaStreamReady', this.predictImage)
    this.predictImage()
  }

  predictImage = async () => {
    const imageData = this.videoCapturer.imageData

    if (!imageData) {
      window.requestAnimationFrame(this.predictImage)
      return
    }

    const predictedObjects = await this.objectDetector.getPredictionsFromImageData(imageData)
    const offsets: IOffset[] = predictedObjects.map(obj => this.objectLocator.getOffsetsFromPredictions(obj))
    this.uiRenderer.render({ imageData, predictedObjects, offsets })

    window.requestAnimationFrame(this.predictImage)
  }
}

new App()
