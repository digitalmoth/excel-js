import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
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
