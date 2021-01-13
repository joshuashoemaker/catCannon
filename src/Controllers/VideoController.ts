import Video from "../Models/Video"
import VideoView from '../Views/VideoView'

class VideoController {
  private defaultWidth: number = 640
  private defaultHeight: number = 480
  private userMediaConstraints = { video: true }
  public model: Video
  private view: VideoView

  constructor (props: { width?: number, height?: number } = {}) {
    this.model = new Video({
      width: props.width || this.defaultWidth,
      height: props.height || this.defaultHeight
    })

    this.view = new VideoView(this.model)
    this.renderView()
    this.enableCamera()
  }

  get imageData () {
    if (!this.view.element.srcObject) return null

    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = this.model.width
    canvas.height = this.model.height
    const context = canvas.getContext('2d')!
    context.drawImage(this.view.element, 0, 0, this.model.width, this.model.height)

    return context.getImageData(0, 0, this.model.width, this.model.height)
  }

  private enableCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(this.userMediaConstraints)
    this.view.srcObject = stream
  }

  private renderView () {
    const existingVideoView = document.querySelector('#videoView')
    if (existingVideoView) existingVideoView.outerHTML = ''

    const body = document.querySelector('body')!
    body.appendChild(this.view.element)
  }
}

export default VideoController
