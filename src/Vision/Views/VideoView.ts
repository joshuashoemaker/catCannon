import IVideo from '../Interfaces/IVideo'

class VideoView {
  public width: number
  public height: number
  public autoplay: boolean
  public element: HTMLVideoElement

  constructor (props: IVideo) {
    this.width = props.width
    this.height = props.height
    this.autoplay = props.autoplay!
    this.element = this.createElement()
  }

  createElement (): HTMLVideoElement {
    let videoElement: HTMLVideoElement = document.createElement('video')
    videoElement.setAttribute('id', 'VideoView')
    videoElement.setAttribute('width', this.width.toString())
    videoElement.setAttribute('height', this.height.toString())
    videoElement.autoplay = this.autoplay
    return videoElement
  }

  set srcObject (media: MediaStream | null) { this.element.srcObject = media }
}

export default VideoView