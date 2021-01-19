import IOffset from "./IOffset"
import IPredictedObject from "./IPredictedObject"

interface IUiRenderer {
  render(props: { imageData: ImageData, predictedObjects: IPredictedObject[], offsets: IOffset[] }): void
}

export default IUiRenderer
