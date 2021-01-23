interface IEventManager {
  listen(eventName: string, callback: any): void,
  emit(eventName: string, detail: any): void
}

export default IEventManager
