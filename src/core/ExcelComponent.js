import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }
  // component options before init
  prepare() {

  }

  // returns template of component
  toHTML() {
    return ''
  }
  // notificate listener about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // subscribe on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // changes from subscribed components
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // initialize component, adds dom listeners
  init() {
    this.initDOMListeners()
  }
  // remove component, clear listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
