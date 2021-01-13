import PredictedObject from "../Models/PredictedObject"
import PredictedObjectCollection from "../Models/PredictedObjectCollection"
import PredictedObjectView from "../Views/PredictedObjectView"

class PredictedObjectCollectionController {
  private model: PredictedObjectCollection

  constructor () {
    this.model = new PredictedObjectCollection()
    this.renderView()
  }

  set predictedObjects (objects: PredictedObject[]) {
    this.model.objects = objects
    this.renderView()
  }

  public renderView = () => {
    const existingPredictedObjectViews = document.querySelectorAll('.PredictedObject')
    existingPredictedObjectViews.forEach(v => {
      v.outerHTML = ''
    })

    const body = document.querySelector('body')!
    this.model.objects.forEach((object: PredictedObject) => {
      const predictedObjectView = new PredictedObjectView(object)
      body.appendChild(predictedObjectView.element)
    })
  }
}

export default PredictedObjectCollectionController
