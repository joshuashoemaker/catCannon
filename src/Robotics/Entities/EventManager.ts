import { EventEmitter } from 'events'
import IEventManager from '../Interfaces/IEventManager'

let instance: EventManager | null = null

class EventManager implements IEventManager {
  eventEmitter: EventEmitter

  constructor () {
    if (!instance) instance = this

    this.eventEmitter = new EventEmitter()

    return instance
  }

  listen = (eventName: string, callback: any)  => {
    this.eventEmitter.addListener(eventName, callback)
  }

  emit = (eventName: string, detail: any) => {
    this.eventEmitter.emit(eventName, detail)
  }
}

export default EventManager
