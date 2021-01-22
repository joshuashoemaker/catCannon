import IVideo from "../../Interfaces/IVideo"
import ObjectLocator from "../ObjectLocator"

const defaultProps = {
  width: 640,
  height: 480
}

function makeObjectLocator (props?: IVideo): ObjectLocator {
  const videoProps = props || defaultProps
  return new ObjectLocator(videoProps)
}

export default makeObjectLocator