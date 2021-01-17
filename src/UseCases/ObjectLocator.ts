import PredictedObject from "../Models/PredictedObject"
import Video from "../Models/Video"

interface Offset {
  x: number,
  y: number,
  hypotenuse: number
}

class ObjectLocator {
  private video: Video
  constructor (video: Video) {
    this.video = video
  }

  detectPredictedObjectLocationFromVideo = (predictedObject: PredictedObject): Offset => {
    const videoCenter = { x: this.video.width / 2, y: this.video.height / 2 }
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
