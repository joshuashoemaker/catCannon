import IPredictedObject from "../Interfaces/IPredictedObject"

class PredictedObject {
  public xOrigin: number
  public yOrigin: number
  public width: number
  public height: number
  public class: string

  constructor (props: IPredictedObject) {
    this.xOrigin = props.xOrigin
    this.yOrigin = props.yOrigin
    this.width = props.width
    this.height = props.height
    this.class = props.class
  }
}

export default PredictedObject
