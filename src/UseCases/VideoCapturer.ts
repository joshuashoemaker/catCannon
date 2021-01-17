import IVideo from '../Interfaces/IVideo'
import IVideoCapturer from '../Interfaces/IVideoCapturer'

class VideoCapturer implements IVideoCapturer {
  private videoWidth: number
  private videoHeight: number
  private videoStream: MediaStream | null = null

  constructor (props: IVideo) {
    this.videoWidth = props.width
    this.videoHeight = props.height
    this.enableCamera()
  }

  private enableCamera = async () => {
    const webCameraStream = await navigator.mediaDevices.getUserMedia({ video: true })
    this.videoStream = webCameraStream
  }

  get imageData () {
    if (!this.videoStream) return null

    let videoElement: HTMLVideoElement = document.querySelector('#videoView') as HTMLVideoElement
    if (!videoElement) {
      videoElement = document.createElement('video')
      videoElement.width = this.videoWidth
      videoElement.height = this.videoHeight
      videoElement.autoplay = true
      videoElement.srcObject = this.videoStream
      videoElement.id = 'videoView'
      videoElement.style.display = 'none'

      const body = document.querySelector('body')!
      body.appendChild(videoElement)
    }

    const canvasElement: HTMLCanvasElement = document.createElement('canvas')
    canvasElement.width = this.videoWidth
    canvasElement.height = this.videoHeight

    const canvasContext = canvasElement.getContext('2d')!
    canvasContext.drawImage(videoElement, 0, 0, this.videoWidth, this.videoHeight)

    return canvasContext.getImageData(0, 0, this.videoWidth, this.videoHeight)
  }

}

export default VideoCapturer
