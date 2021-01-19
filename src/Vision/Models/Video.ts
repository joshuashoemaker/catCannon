import IVideo from '../Interfaces/IVideo'

let instance: Video | null = null

class Video {
  public height: number = 0
  public width: number = 0
  public autoplay: boolean = true

  constructor (props?: IVideo) {
    if (!instance) instance = this

    if (props) {
      this.height = props.height
      this.width = props.width
      if (typeof props.autoplay === 'boolean') this.autoplay = props.autoplay
    }

    return instance
  }

  get centerCoordinates (): { x: number, y: number } {
    return { x: this.width / 2, y: this.height / 2 }
  }

  get props () {
    return {
      height: this.height,
      width: this.width,
      autoplay: this.autoplay
    }
  }
}

export default Video
