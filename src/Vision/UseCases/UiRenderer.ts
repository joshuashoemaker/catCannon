import IOffset from "../Interfaces/IOffset"
import IPredictedObject from "../Interfaces/IPredictedObject"
import IUiRenderer from "../Interfaces/IUiRenderer"

class UiRenderer implements IUiRenderer {
  render (props: { imageData: ImageData, predictedObjects: IPredictedObject[], offsets: IOffset[] }) {

    const body: HTMLBodyElement = document.querySelector('body')!

    let canvasElement: HTMLCanvasElement = document.querySelector('#videoOutput') as HTMLCanvasElement
    if (!canvasElement) {
      canvasElement = document.createElement('canvas')
      canvasElement.id = 'videoOutput'
      canvasElement.width = props.imageData.width
      canvasElement.height = props.imageData.height
      body.append(canvasElement)
    }

    const canvasContext = canvasElement.getContext('2d')!
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)
    canvasContext.putImageData(props.imageData, 0, 0)

    props.predictedObjects.forEach(obj => {
      canvasContext.strokeStyle = 'rgb(0, 255, 0)'
      canvasContext.strokeRect(obj.xOrigin, obj.yOrigin, obj.width, obj.height)
    })

    const startPoint = {
      x: props.imageData.width / 2,
      y: props.imageData.height / 2
    }

    props.offsets.forEach(offset => {
      canvasContext.strokeStyle = 'rgb(255, 0, 0)'
      canvasContext.beginPath()
      canvasContext.moveTo(startPoint.x, startPoint.y)
      canvasContext.lineTo(startPoint.x - offset.x, startPoint.y - offset.y)
      canvasContext.closePath()
      canvasContext.stroke()
    })
  }
}

export default UiRenderer
