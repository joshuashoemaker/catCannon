import IVideo from "../../Interfaces/IVideo"
import VideoCapturer from "../VideoCapturer"

const defaultProps = {
  width: 640,
  height: 480
}

function makeVideoCapturer (props?: IVideo): VideoCapturer {
  const videoProps = props || defaultProps
  return new VideoCapturer(videoProps)
}

export default makeVideoCapturer
