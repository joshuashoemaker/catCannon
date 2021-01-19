import IObjectLocator from "../Interfaces/IObjectLocator"
import IOffset from "../Interfaces/IOffset"
import IPredictedObject from "../Interfaces/IPredictedObject"
import IVideo from "../Interfaces/IVideo"

class ObjectLocator implements IObjectLocator {
  private videoWidth: number
  private videoHeight: number

  constructor (props: IVideo) {
    this.videoWidth = props.width
    this.videoHeight = props.height
  }

  getOffsetsFromPredictions = (predictedObject: IPredictedObject): IOffset => {
    const videoCenter = { x: this.videoWidth / 2, y: this.videoHeight / 2 }
    const objectCenter = {
      x: predictedObject.xOrigin + (predictedObject.width / 2),
      y: predictedObject.yOrigin + (predictedObject.height / 2)
    }


    const xOffset = videoCenter.x - objectCenter.x
    const yOffset = videoCenter.y - objectCenter.y

    const objectOffsetFromVideoCenter = {
      x: xOffset,
      y: yOffset,
      hypotenuse: Math.sqrt((xOffset * xOffset) + (yOffset * yOffset))
    }

    return objectOffsetFromVideoCenter
  }
}

export default ObjectLocator
