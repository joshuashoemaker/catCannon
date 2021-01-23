import IObjectDetector from './Interfaces/IObjectDetector'
import IObjectLocator from './Interfaces/IObjectLocator'
import IOffset from './Interfaces/IOffset'
import IRoboticsCommunicator from './Interfaces/IRoboticsCommunicator'
import IUiRenderer from './Interfaces/IUiRenderer'
import IVideoCapturer from "./Interfaces/IVideoCapturer"

import makeObjectDetector from './UseCases/Factories/makeObjectDetector'
import makeObjectLocator from './UseCases/Factories/makeObjectLocator'
import makeUiRenderer from './UseCases/Factories/makeUiRenderer'
import makeVideoCapturer from './UseCases/Factories/makeVideoCatpurer'
import makeRoboticsCommunicator from './UseCases/Factories/mkaeRoboticsCommunicator'

class App {
  private objectDetector: IObjectDetector
  private objectLocator: IObjectLocator
  private videoCapturer: IVideoCapturer
  private roboticsCommunicator: IRoboticsCommunicator
  private uiRenderer: IUiRenderer

  constructor () {
    this.videoCapturer = makeVideoCapturer()
    this.objectDetector = makeObjectDetector()
    this.objectLocator = makeObjectLocator()
    this.roboticsCommunicator = makeRoboticsCommunicator()
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
    this.roboticsCommunicator.sendOffsets(offsets)
    this.uiRenderer.render({ imageData, predictedObjects, offsets })

    window.requestAnimationFrame(this.predictImage)
  }
}

new App()
