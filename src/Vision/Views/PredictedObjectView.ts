import IPredictedObject from "../Interfaces/IPredictedObject"

class PredictedObjectView {

  private xOrigin: number
  private yOrigin: number
  private width: number
  private height: number
  private class: string
  public element: HTMLElement

  constructor (props: IPredictedObject) {
    this.xOrigin = props.xOrigin
    this.yOrigin = props.yOrigin
    this.width = props.width
    this.height = props.height
    this.class = props.class
    this.element = this.createElement()
  }

  createElement (): HTMLElement {
    let predictedObjectElement: HTMLElement = document.createElement('div')
    predictedObjectElement.style.position = 'absolute'
    predictedObjectElement.style.left = `${this.xOrigin}px`
    predictedObjectElement.style.top = `${this.yOrigin}px`
    predictedObjectElement.style.width = `${this.width}px`
    predictedObjectElement.style.height = `${this.height}px`
    predictedObjectElement.setAttribute('class', `PredictedObject ${this.class}`)

    const predictedObjectLabel = this.createLabel()

    predictedObjectElement.appendChild(predictedObjectLabel)

    return predictedObjectElement
  }

  createLabel (): HTMLLabelElement {
    const labelElement = document.createElement('label')
    labelElement.setAttribute('class', 'predictedObjectLabel')
    labelElement.innerText = this.class
    return labelElement
  }
}

export default PredictedObjectView
